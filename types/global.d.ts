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

export interface BaseError {
    code: number
    fields?: Record<string, string[]>
    message: string
    data?: any
}

export type Breakpoints = 'base' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'