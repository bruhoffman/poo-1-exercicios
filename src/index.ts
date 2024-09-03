import express, { Request, Response } from "express"
import cors from 'cors'
import { TVideosDB } from "./types"
import { db } from "./database/knex"
import { Video } from "./models/Videos"

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

app.get("/videos", async (req: Request, res: Response) => {
    try {
        const videosDB: TVideosDB[] = await db('videos')

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

        const [videoDBExist]: TVideosDB[] | undefined[] = await db('videos').where({ id })

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

        console.log(newVideoDB)

        await db('videos').insert(newVideoDB)

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
        const valueTitle = req.body.title as string || undefined
        const valueTimeSegunds = req.body.time_segunds as number || undefined

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'Id' deve ser uma string")
        }

        const [videoDB]: TVideosDB[] | undefined[] = await db('videos').where({ id })

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