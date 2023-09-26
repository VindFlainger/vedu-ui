import { Question, QuestionAnswers } from "~/models/QuestionModel";

const questions = [
    {
        id: 'smasginraww',
        type: 'text',
        title: 'Queue Question',
        content: '<p>FIFO and LIFO principles.</p>',
        tags: ['Math', 'Programming', 'AIDI'],
        answers: ['Math', 'AI', 'Easy math question', 'Math', 'AI', 'Easy', 'Math', 'AI', 'Easy math question']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p>FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p>FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p><img src="https://cdn.pixabay.com/photo/2017/03/27/16/46/dolomites-2179602_1280.jpg">FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p><img src="https://cdn.pixabay.com/photo/2017/03/27/16/46/dolomites-2179602_1280.jpg">FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p><img src="https://cdn.pixabay.com/photo/2017/03/27/16/46/dolomites-2179602_1280.jpg">FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p><img src="https://cdn.pixabay.com/photo/2017/03/27/16/46/dolomites-2179602_1280.jpg">FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p><img src="https://cdn.pixabay.com/photo/2017/03/27/16/46/dolomites-2179602_1280.jpg">FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p>FIFO and LIFO principles. Real world examples and description. FIFO and LIFO principles. Real world examples and description. FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p>FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
]

import api from '~/api/index'

interface State {
    questions: Question[]
}

export const useQuestionsStore = defineStore('Questions', {
    state: (): State => ({
        questions: questions
    }),
    getters: {},
    actions: {
        async updateQuestionAnswers(id: string, answers: QuestionAnswers) {
            const res = await api.questions.UPDATE_ANSWERS({ id, answers })
            const question = this.questions.find(question => question.id === id)
            if (question) question.answers = res.data
        }
    }
})