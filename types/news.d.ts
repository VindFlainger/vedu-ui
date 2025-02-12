export interface NewsPost {
    id: string
    title: string
    subtitle: string
    content: string
    images: {
        url: string,
        main?: boolean
    }[]
    tags: string[]
    created_at: string
    updated_at: string
}