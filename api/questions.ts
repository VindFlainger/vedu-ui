import {Controls} from "~/api/index";
import _fetch from '~/api/index'
import { NitroFetchOptions } from "nitropack";

export interface AddTagData{
    tag: string
}


export default {
    ADD_TAG: (options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<AddTagData>('POST', 'questions/add-tag', options, controls),
}