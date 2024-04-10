import { SizedImage } from "~/types/global";

export interface PersonalData {
    first_name: string
    last_name: string
    gender: string
    age: number
    country: string
    email: string
}


export interface UserPreview {
    id: string,
    avatar: SizedImage,
    personal_data: PersonalData
}