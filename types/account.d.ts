import { SizedImage } from '~/types/global';

export interface UserProfile {
    id: string;
    personal_data: PersonalData;
    role: string;
    avatar: SizedImage;
}

export interface UserAddress {
    region: string;
    settlement: string;
    street: string;
    house: string;
    unit: string | null;
    room: string | null;
    postal_code: string | null
}

export interface PersonalData {
    first_name: string;
    last_name: string;
    gender: string;
    birth_date: string;
    country: string;
    email: string;
    phone_number: string | null;
    address: UserAddress;
}

export interface UserPreview {
    id: string;
    avatar?: SizedImage;
    personal_data: PersonalData;
}
