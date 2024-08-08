import { Question, QuestionAnswers, QuestionTag } from "~/models/QuestionModel";

import api from '~/api/index'
import { GetQuestionsPayload } from "~/api/questions";

interface State {
    tags: QuestionTag[],
    questionsCount: null | number
}

export const useQuestionsStore = defineStore('Questions', {
    state: (): State => ({
        questionsCount: null,
        tags: []
    }),
    getters: {},
    actions: {
        setEmpty(){
            this.tags = []
        },
        async fetchAvailableTags(){
            const res = await api.questions.GET_TAGS()
            this.tags = res
            return this.tags
        }
    }
})