export class Video {
    constructor(
        private id: string,
        private title: string,
        private time_segunds: number,
        private upload_date: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getTiTle(): string {
        return this.title
    }

    public setTitle(value: string): void {
        this.title = value
    }

    public getTimeSegunds(): number {
        return this.time_segunds
    }

    public setTimeSegunds(value: number): void {
        this.time_segunds = value
    }

    public getUploadDate(): string {
        return this.upload_date
    }

    public setUploadDate(value: string): void {
        this.upload_date = value
    }
}