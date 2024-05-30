export interface NewsPost {
    id: string
    title: string
    subtitle: string
    content: string
    images: {
        url: string,
        main?: boolean
    }[]
    created_at: string
    updated_at: string
}