// Tipagem para pegar os dados dos vídeos no BD.
export interface VideoDB {
    id: string,
    title: string,
    time_segunds: number,
    upload_date: string
}