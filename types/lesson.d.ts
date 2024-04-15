import { SizedImage } from "~/types/global";
import { PersonalData } from "~/types/account";
import { QuestionFindResult, QuestionType, TextQuestionOption } from "~/types/questions";

export interface LessonPreview {
    id: string
    name: string
    content: string
    image: string
    completion_conditions: {
        tests: {
            completed: boolean
            avg_score: number
            min_score: number
        }
        assignments: {
            attached: boolean
            resolved: boolean
        }
    }
    views_count: number
    tests_count: number
    assignments_count: number
    materials_count: number
    viewed: boolean
    created_at: string
}

export interface LessonMaterial {
    id: string
    description: string
    file: {
        path: string
        name: string
        url: string
        id: string
    }
    created_at: string
}

export interface LessonAssignment {
    id: string
    description: string
    files: {
        path: string
        name: string
        url: string
    }[]
    created_at: string
}

export interface LessonAssignmentResponse {
    resolve: {
        points: number
        status: string
        message: string
        extra_attempt: boolean
    }
    text?: string
    id: string
    created_at: string
    updated_at: string
    deleted_at: string | null
    files: string[]
    student: {
        id: string
        personal_data: PersonalData,
        avatar?: SizedImage
    }
}

export interface LessonTest {
    title: string
    admission: string
    report: string
    max_attempts: number
    score_mode: string
    full_score: number
    id: string
    attempts: string[]
    start: string
    questions: QuestionFindResult[]
    end: string
}

export interface LessonTestAttempt {
    id: string
    test: string,
    student: string,
    secret_key: string,
    started_at: string,
    submitted_at: string | null,
    checked: {
        total_score: string | null,
        checked_at: string | null
    },
    answers: [],
    created_at: string,
    updated_at: string,
}

export interface SingleQuestionNoAnswersOption {
    label: string
    value: string
    correct?: boolean
}
export interface MultipleQuestionNoAnswersOption {
    label: string
    value: string
    correct?: boolean
}
export interface OrderQuestionNoAnswersOption {
    label: string
    value: string
    order: number
}

export type QuestionNoAnswersOptions<T extends QuestionType> =
    T extends 'text' ? TextQuestionOption[] :
        T extends 'single' ? SingleQuestionOption[] :
            T extends 'multiple' ? MultipleQuestionOption[] :
                T extends 'order' ? OrderQuestionOption[] :
                    never;


export interface LessonTestQuestionNoAnswers<T extends QuestionType = any> {
    id: string
    source: string
    type: T
    score: number
    options: QuestionNoAnswersOptions<T>
    content: string
}