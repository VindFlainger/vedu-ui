import { Optional } from "utility-types";

export type QuestionTextAnswer = {
    value: string,
    label: string,
}

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

export type QuestionAnswers = QuestionTextAnswer[] | QuestionMultipleAnswer[] | QuestionOrderAnswer[]

export interface QuestionTag {
    label: string,
    value: string
}

export interface Question {
    id: string,
    type: 'text' | 'multiple' | 'single' | 'order',
    title: string,
    content: string,
    tags: QuestionTag[],
    answers: QuestionAnswers
    updated_at: string,
    created_at: string
}

export interface QuestionModel {
    type: 'text' | 'multiple' | 'single' | 'order',
    title: string,
    content: string,
    tags: Optional<QuestionTag, 'value'>[],
    answers: Optional<QuestionTextAnswer, 'value'>[] | Optional<QuestionMultipleAnswer, 'value'>[] | Optional<QuestionOrderAnswer, 'value'>[]
}