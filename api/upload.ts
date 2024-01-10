import { Controls } from "~/api/handler";
import _fetch from '~/api/handler'
import { NitroFetchOptions } from "nitropack";
import { Question } from "~/models/QuestionModel";



export default {
    UPLOAD_IMAGES: (data: any, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<Question[]>('POST', `/upload/images`, data, options, controls),
}