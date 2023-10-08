import { Controls } from "~/api/handler";
import _fetch from '~/api/handler'
import { NitroFetchOptions } from "nitropack";
import { SuccessData } from "~/api/data";
import { Question, QuestionAnswers, QuestionModel, QuestionTag } from "~/models/QuestionModel";

export interface AddTagPayload {
    op: 'add',
    id: string,
    value: string
}

export interface DeleteTagPayload {
    op: 'delete',
    id: string,
    value: string
}

export interface UpdateAnswersPayload {
    id: string,
    answers: QuestionAnswers
}

export interface UpdateAnswersData {
    data: QuestionAnswers
}

export interface GetQuestionsPayload {
    query?: string,
    tags?: string[],
    page?: string,
    per_page?: string
}

export interface CreateQuestionsPayload extends QuestionModel {

}



export default {
    GET_QUESTIONS: (data: GetQuestionsPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<Question[]>('GET', `questions`, data, options, controls),
    CREATE_QUESTION: (data: CreateQuestionsPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<Question>('POST', `question`, data, options, controls),
    GET_TAGS: (data?: null, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<QuestionTag[]>('GET', `question-tags`, data, options, controls),
    ADD_TAG: (data: AddTagPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<SuccessData>('PUT', `questions/${data.id}/tag/add`, data, options, controls),
    DELETE_TAG: (data: DeleteTagPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<SuccessData>('PUT', `questions/${data.id}/tag/delete`, data, options, controls),
    UPDATE_ANSWERS: (data: UpdateAnswersPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<UpdateAnswersData>('PUT', `questions/${data.id}/answer/update`, data, options, controls),
}