import { UseFetchOptions } from "nuxt/app";
import { Controls } from "~/composables/useFetchData";

export interface SigninData {
    refresh_token: string,
    access_token: string,
    live_time: number
}

export default {
    LOGIN_STUDENT: (options?: UseFetchOptions<SigninData>, controls?: Controls) => useFetchData('POST', '/signin', options, controls)
}