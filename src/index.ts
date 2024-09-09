import express, { Request, Response } from "express"
import cors from 'cors'
import { VideoDB } from "./types"
import { Video } from "./models/Videos"
import { VideoDatabase } from "./database/VideoDatabase"
import { stringify } from "querystring"

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

const VIDEOS_DB = new VideoDatabase

app.get("/videos", async (req: Request, res: Response) => {
    try {

        const videosDB: VideoDB[] = await VIDEOS_DB.findVideos()

        const videos: Video[] = videosDB.map((video) => new Video(
            video.id,
            video.title,
            video.time_segunds,
            video.upload_date
        ))

        res.status(200).send(videos)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/videos", async (req: Request, res: Response) => {
    try {

        const { id, title, time_segunds } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'Id' deve ser uma string!")
        }

        if (typeof title !== "string") {
            res.status(400)
            throw new Error("'Title' deve ser uma string!")
        }

        if (typeof time_segunds !== "number") {
            res.status(400)
            throw new Error("'time_segunds' deve ser uma string!")
        }

        const [videoDBExist]: VideoDB[] | undefined[] = await VIDEOS_DB.findVideoById(id)

        if (videoDBExist) {
            res.status(400)
            throw new Error("'Id' já existe!")
        }

        const newVideo = new Video(
            id,
            title,
            time_segunds,
            new Date().toISOString()
        )

        const newVideoDB = {
            id: newVideo.getId(),
            title: newVideo.getTiTle(),
            time_segunds: newVideo.getTimeSegunds(),
            upload_date: newVideo.getUploadDate()
        }

        await VIDEOS_DB.insertVideo(newVideoDB)

        res.status(201).send("Vídeo cadastrado com sucesso!")

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.put("/videos/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string || undefined
        const newTitle = req.body.title as string || undefined
        const newTimeSegunds = req.body.time_segunds as number || undefined

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'Id' deve ser uma string")
        }

        /* if (typeof newTitle !== "string") {
            res.status(400)
            throw new Error("'newTitle' deve ser uma string")
        }
        
        if (typeof newTimeSegunds !== "number") {
            res.status(400)
            throw new Error("'newTimeSegunds' deve ser um number")
        } */

        const [videoDB]: VideoDB[] | undefined[] = await VIDEOS_DB.findVideoById(id)

        if (!videoDB) {
            res.status(400)
            throw new Error("Id não encontrado.")
        }

        const uploadVideo = new Video(
            videoDB.id,
            videoDB.title,
            videoDB.time_segunds,
            videoDB.upload_date
        )

        const uploadVideoDB = {
            id: uploadVideo.getId(),
            title: newTitle || uploadVideo.getTiTle(),
            time_segunds: newTimeSegunds || uploadVideo.getTimeSegunds(),
            upload_date: uploadVideo.getUploadDate()
        }

        await VIDEOS_DB.updateVideo(id, uploadVideoDB)

        res.status(201).send("Vídeo atualizado com sucesso!")

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.delete("/videos/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [video]: VideoDB[] | undefined[] = await VIDEOS_DB.findVideoById(id)

        if (!video) {
            res.status(400)
            throw new Error("Video não encontrado!")
        }

        await VIDEOS_DB.deleteVideo(id)


        res.status(200).send("Vídeo deletado com sucesso!")

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})