import { Controls } from "~/api/handler";
import _fetch from '~/api/handler'
import { NitroFetchOptions } from "nitropack";


export default {
    GET_CATEGORIES: (data?: null, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<any>('GET', `/categories`, data, options, controls),
}