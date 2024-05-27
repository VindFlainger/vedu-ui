export type TextQuestionOption = string
export interface SingleQuestionOption {
    label: string
    value: string
    correct?: boolean
}
export interface MultipleQuestionOption {
    label: string
    value: string
    correct?: boolean
}
export interface OrderQuestionOption {
    label: string
    value: string
    order: number
}
export type QuestionType = 'text' | 'single' | 'multiple' | 'order'

export type QuestionOptions<T extends QuestionType> =
    T extends 'text' ? TextQuestionOption[] :
        T extends 'single' ? SingleQuestionOption[] :
            T extends 'multiple' ? MultipleQuestionOption[] :
                T extends 'order' ? OrderQuestionOption[] :
                    any;


export interface QuestionFindResult<T extends QuestionType = any> {
    id: string
    options: QuestionOptions<T>
    title: string
    owner: string
    type: T
    content: string
    tags: {
        id: string
        name: string
        owner: string
    }
    created_at: string
    updated_at: string
    score: number
}