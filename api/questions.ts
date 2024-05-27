import { Controls } from "~/api/handler";
import _fetch from '~/api/handler'
import { NitroFetchOptions } from "nitropack";
import { Question, QuestionAnswers, QuestionTag } from "~/models/QuestionModel";
import { QuestionFindResult } from "~/types/questions";


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


export interface SearchQuestionsPayload {
    page: number
    per_page: number
    search: string
}

export interface SearchQuestionsData {
    data: QuestionFindResult[]
    meta: {
        page: number
        per_page: number
        total: number
    }
}

export default {
    GET_QUESTIONS: (data: GetQuestionsPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<GetQuestionsData>('GET', `/questions`, data, options, controls),
    CREATE_QUESTION: (
        data: CreateQuestionsPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<Question>('POST', `/questions`, data, options, controls),

    REMOVE_QUESTION: (data: RemoveQuestionsPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<Question>('DELETE', `/questions/${data.id}`, undefined, options, controls),
    UPDATE_QUESTION: (data: UpdateQuestionPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<Question>('PUT', `/questions/${data.id}`, data, options, controls),
    GET_TAGS: (data?: null, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<QuestionTag[]>('GET', `/questions/tags`, data, options, controls),
    CREATE_TAG: (data: CreateTagPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<CreateTagData>('POST', `/questions/tags`, data, options, controls),

    SEARCH_QUESTIONS: (
        data: SearchQuestionsPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<SearchQuestionsData>('GET', `/search-questions`, data, options, controls),
}