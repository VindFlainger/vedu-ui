import { Controls } from "~/api/handler";
import _fetch from '~/api/handler'
import { NitroFetchOptions } from "nitropack";
import { Question } from "~/models/QuestionModel";


export interface GetUserData {
    label: string,
    value: string
}


export default {
    GET_USER: (data?: null, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<Question[]>('GET', `/user/info`, data, options, controls),
}