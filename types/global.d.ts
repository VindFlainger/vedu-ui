export interface SizedImage {
    original: string
    frames: {
        width: number
        height: number
        url: string
        id: string
    }[]
}

export interface AnyFile {
    id: string
    name: string
    [key: string]: any
}