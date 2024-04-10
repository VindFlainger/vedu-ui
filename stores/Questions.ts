import { Question, QuestionAnswers, QuestionTag } from "~/models/QuestionModel";

import api from '~/api/index'
import { GetQuestionsPayload } from "~/api/questions";

interface State {
    questions: Question[],
    tags: QuestionTag[],
    questionsCount: null | number
}

export const useQuestionsStore = defineStore('Questions', {
    state: (): State => ({
        questions: [],
        questionsCount: null,
        tags: []
    }),
    getters: {},
    actions: {
        setEmpty(){
            this.questions = []
            this.tags = []
        },
        async fetchAvailableTags(){
            const res = await api.questions.GET_TAGS()
            this.tags = res
            return this.tags
        },
        async fetchQuestions(filters: GetQuestionsPayload){
            const res = await api.questions.GET_QUESTIONS(filters, undefined, {cancelPrevious: true})
            this.questions = res.data
            this.questionsCount = res.meta.count

            return this.questions
        }
    }
})