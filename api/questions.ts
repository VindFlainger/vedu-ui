import { Controls } from "~/api/handler";
import _fetch from '~/api/handler'
import { NitroFetchOptions } from "nitropack";
import { Question, QuestionAnswers, QuestionTag } from "~/models/QuestionModel";


export interface GetQuestionsPayload {
    query?: string,
    tags?: string[],
    page?: number,
    per_page?: number
}

export interface GetQuestionsData {
    data: Question[],
    meta: {
        page: number,
        per_page: number,
        count: number
    }
}


export interface CreateQuestionsPayload {
    title: string,
    content: string,
    tags: string[],
    type: string,
    options: string[] | { label: string, correct?: boolean }[] | { label: string, order: number }[]
}

export interface RemoveQuestionsPayload {
    id: string
}

export interface CreateTagPayload {
    name: string
}

export interface CreateTagData {
    id: string,
    name: string
}

export interface UpdateQuestionPayload {
    id: string,
    tags: string[],
    options: QuestionAnswers,
    content: string
}

export default {
    GET_QUESTIONS: (data: GetQuestionsPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<GetQuestionsData>('GET', `/questions`, data, options, controls),
    CREATE_QUESTION: (data: CreateQuestionsPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<Question>('POST', `/questions/question`, data, options, controls),
    REMOVE_QUESTION: (data: RemoveQuestionsPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<Question>('DELETE', `/questions/${data.id}`, undefined, options, controls),
    UPDATE_QUESTION: (data: UpdateQuestionPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<Question>('PUT', `/questions/${data.id}`, data, options, controls),
    GET_TAGS: (data?: null, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<QuestionTag[]>('GET', `/questions/tags`, data, options, controls),
    CREATE_TAG: (data: CreateTagPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<CreateTagData>('POST', `/questions/tag`, data, options, controls),
}