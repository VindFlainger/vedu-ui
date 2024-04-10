import { Controls } from "~/api/handler";
import _fetch from '~/api/handler'
import { NitroFetchOptions } from "nitropack";



export default {
    UPLOAD_IMAGES: (data: any, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<any>('POST', `/upload/images`, data, options, controls),
    UPLOAD_FILES: (data: any, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<any>('POST', `/upload/files`, data, options, controls),
}