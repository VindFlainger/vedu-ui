import { UserPreview } from "~/types/account";

export interface Notification {
    id: string
    sender?: UserPreview
    receiver?: UserPreview
    viewed: boolean
    type: string
    group?: string
    target: string
    data: any
    content?: string
}