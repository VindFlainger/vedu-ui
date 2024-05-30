import { Optional } from "utility-types";

export interface QuestionMultipleAnswer {
    value: string,
    label: string,
    correct?: boolean
}

export interface QuestionOrderAnswer {
    value: string,
    label: string,
    order: number
}

export type QuestionAnswers = string[] | QuestionMultipleAnswer[] | QuestionOrderAnswer[]

export interface QuestionTag {
    name: string,
    id: string
}

export interface Question {
    id: string,
    type: 'text' | 'multiple' | 'single' | 'order',
    title: string,
    content: string,
    tags: QuestionTag[],
    options: QuestionAnswers
    updated_at: string,
    created_at: string
}