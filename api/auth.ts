import { UseFetchOptions } from "nuxt/app";
import { Controls } from "~/api/handler";
import _fetch from '~/api/handler'
import { NitroFetchOptions } from "nitropack";

export interface CheckEmailPayload {
    email: string
}

type CheckEmailData = boolean

export interface SignUpPayload {
    "email": string,
    "password": string,
    "role": string,
    "age": number | string,
    "first_name": string,
    "last_name": string,
    "gender": string,
    "country": string,
    "invite_code"?: string
}

export interface SignUpData {
    "user_id": string
}

export interface SignInPayload {
    email: string,
    password: string,
    remember: boolean
    fingerprint: string
}

export interface SignInData {
    refresh_token: string,
    access_token: string,
    live_time: number
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
    CHECK_EMAIL: (data: CheckEmailPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<CheckEmailData>('GET', `/check-email`, data, options, { ...controls, noAuth: true }),
    SIGN_UP: (data: SignUpPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<SignUpData>('POST', `/signup`, data, options,{ ...controls, noAuth: true }),
    SIGN_IN: (data: SignInPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<SignInData>('POST', `/signin`, data, options, { ...controls, noAuth: true }),


    TEST: (data: SignInPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<SignInData>('GET', `/test`, data, options, { ...controls, cancelPrevious: true }),
    TEST1: (data: SignInPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<SignInData>('GET', `/test1`, data, options, { ...controls }),



    RECOVERY_EMAIL: (options?: UseFetchOptions<RecoveryEmailData>, controls?: Controls) => useFetchData('POST', '/recovery-email', options),
    CHANGE_PASSWORD: (options?: UseFetchOptions<ChangePasswordData>, controls?: Controls) => useFetchData('POST', '/change-password', options),
}