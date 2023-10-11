import { Question, QuestionAnswers, QuestionTag } from "~/models/QuestionModel";



import api from '~/api/index'
import { GetQuestionsPayload } from "~/api/questions";

interface State {
    questions: Question[],
    tags: QuestionTag[]
}

export const useQuestionsStore = defineStore('Questions', {
    state: (): State => ({
        questions: [],
        tags: []
    }),
    getters: {},
    actions: {
        async fetchAvailableTags(){
            const res = await api.questions.GET_TAGS()
            this.tags = res
            return this.tags
        },
        async fetchQuestions(filters: GetQuestionsPayload){
            const res = await api.questions.GET_QUESTIONS(filters, undefined, {cancelPrevious: true})
            this.questions = res
            return this.questions
        }
    }
})