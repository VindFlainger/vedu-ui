import {Controls} from "~/api/handler";
import _fetch from '~/api/handler'
import { NitroFetchOptions } from "nitropack";
import { SuccessData } from "~/api/data";
import { QuestionAnswers } from "~/models/QuestionModel";

export interface AddTagPayload{
    op: 'add',
    id: string,
    value: string
}

export interface DeleteTagPayload{
    op: 'delete',
    id: string,
    value: string
}

export interface UpdateAnswersPayload{
    id: string,
    answers: QuestionAnswers
}

export interface UpdateAnswersData{
    data: QuestionAnswers
}

export default {
    ADD_TAG: (data: AddTagPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<SuccessData>('PUT', `questions/${data.id}/tag/add`,  data, options, controls),
    DELETE_TAG: (data: DeleteTagPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<SuccessData>('PUT', `questions/${data.id}/tag/delete`,  data, options, controls),
    UPDATE_ANSWERS: (data: UpdateAnswersPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<UpdateAnswersData>('PUT', `questions/${data.id}/answer/update`,  data, options, controls),
}