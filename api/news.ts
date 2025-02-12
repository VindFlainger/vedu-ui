import { Controls } from "~/api/handler";
import _fetch from '~/api/handler'
import { NitroFetchOptions } from "nitropack";
import { NewsPost } from "~/types/news";


export interface GetNewsPayload {
    page: number
    per_page: number
}

export interface GetNewsData {
    data: NewsPost[]
    meta: {
        total: number
        per_page: number
        page: number
    }
}



export default {
    GET_NEWS: (
        data: GetNewsPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetNewsData>('GET', `/news`, data, options, controls),
}