import { VideoDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class VideoDatabase extends BaseDatabase {

    public static TABLE_VIDEOS = "videos"

    public async findVideos() {

        const videosDB: VideoDB[] = await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)

        return videosDB

    }

    public async findVideoById(id: string) {

        const videoDB: VideoDB[] | undefined = await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)
            .where({ id })

        return videoDB

    }

    public async insertVideo(newVideoDB: VideoDB): Promise<void> {

        await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)
            .insert(newVideoDB)

    }

    public async updateVideo(id: string, uploadVideoDB: VideoDB): Promise<void> {

        await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)
            .update(uploadVideoDB)
            .where({ id })

    }

    public async deleteVideo(id: string): Promise<void> {

        await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)
            .delete()
            .where({ id })

    }

}