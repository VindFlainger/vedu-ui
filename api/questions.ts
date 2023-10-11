import { Controls } from "~/api/handler";
import _fetch from '~/api/handler'
import { NitroFetchOptions } from "nitropack";
import { SuccessData } from "~/api/data";
import { Question, QuestionModel, QuestionTag } from "~/models/QuestionModel";


export interface GetQuestionsPayload {
    query?: string,
    tags?: string[],
    page?: number,
    per_page?: number
}

export interface CreateQuestionsPayload extends QuestionModel {

}

export interface RemoveQuestionsPayload {
    id: string
}

export interface CreateTagPayload {
    label: string
}

export interface CreateTagData {
    label: string,
    value: string
}


export default {
    GET_QUESTIONS: (data: GetQuestionsPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<Question[]>('GET', `questions`, data, options, controls),
    CREATE_QUESTION: (data: CreateQuestionsPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<Question>('POST', `question`, data, options, controls),
    REMOVE_QUESTION: (data: RemoveQuestionsPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<Question>('DELETE', `question/${data.id}`, undefined, options, controls),
    GET_TAGS: (data?: null, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<QuestionTag[]>('GET', `question-tags`, data, options, controls),
    CREATE_TAG: (data: CreateTagPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<CreateTagData>('POST', `tags`, data, options, controls),
}