import { UseFetchOptions } from "nuxt/app";
import { Controls } from "~/composables/useFetchData";

export interface LoginStudentData {
    
}

export default {
    LOGIN_STUDENT: (options?: UseFetchOptions<LoginStudentData>, controls?: Controls) => useFetchData('/login-student', options, controls)
}