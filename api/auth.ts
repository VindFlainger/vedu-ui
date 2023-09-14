import { UseFetchOptions } from "nuxt/app";
import { Controls } from "~/composables/useFetchData";

export interface SigninData {
    refresh_token: string,
    access_token: string,
    live_time: number
}

export interface CheckEmailData {
    unic: boolean
}

export interface RegisterData {
    success: boolean
}

export interface RecoveryEmailData {
    success: boolean
}

export interface ChangePasswordData {
    success: boolean
}

export default {
    LOGIN_STUDENT: (options?: UseFetchOptions<SigninData>, controls?: Controls) => useFetchData('POST', '/signin', options, controls),
    CHECK_EMAIL: (options?: UseFetchOptions<CheckEmailData>, controls?: Controls) => useFetchData('POST', '/check-email', options, controls),
    REGISTER_STUDENT: (options?: UseFetchOptions<RegisterData>, controls?: Controls) => useFetchData('POST', '/register-student', options, controls),
    REGISTER_INSTRUCTOR: (options?: UseFetchOptions<RegisterData>, controls?: Controls) => useFetchData('POST', '/register-instructor', options, controls),
    RECOVERY_EMAIL: (options?: UseFetchOptions<RecoveryEmailData>, controls?: Controls) => useFetchData('POST', '/recovery-email', options, controls),
    CHANGE_PASSWORD: (options?: UseFetchOptions<ChangePasswordData>, controls?: Controls) => useFetchData('POST', '/change-password', options, controls),
}