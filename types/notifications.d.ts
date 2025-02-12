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

export interface InviteNotification extends Notification {
    type: "invite"
    data: {
        course_name: string
        course_id: string
        image: string
    }
}

export interface MessageNotification extends Notification {
    type: "message"
    data: {
        title: string
        text: string
    }
}