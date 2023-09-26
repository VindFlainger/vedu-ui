type QuestionTextAnswer = string[]

export type QuestionAnswers  = QuestionTextAnswer

export interface Question{
    id: string,
    type: 'text' | 'multiple' | '',
    title: string,
    content: string,
    tags: string[],
    answers: QuestionAnswers
}