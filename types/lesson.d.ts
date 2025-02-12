import { SizedImage } from "~/types/global";
import { PersonalData } from "~/types/account";
import { QuestionFindResult, QuestionOptions, QuestionType, TextQuestionOption } from "~/types/questions";

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
    time_limit: number
    start: string
    questions: QuestionFindResult[]
    end: string
}

export interface LessonTestAttemptAnswer {
    question_id: string,
    passed_score: number | null
    value: null | string | string[]
}

export interface LessonTestAttempt {
    id: string
    test: string,
    student: string,
    secret_key: string,
    started_at: string,
    submitted_at: string | null,
    checked: {
        total_score: number | null,
        checked_at: string | null
    },
    answers: LessonTestAttemptAnswer[],
    created_at: string,
    updated_at: string,
}

export interface LessonTestAttemptFullData extends LessonTestAttempt{
    student: {
        personal_data: PersonalData,
        avatar: SizedImage
    }
}

export interface SingleQuestionNoAnswersOption {
    label: string
    value: string
}
export interface MultipleQuestionNoAnswersOption {
    label: string
    value: string
}
export interface OrderQuestionNoAnswersOption {
    label: string
    value: string
}

export type QuestionNoAnswersOptions<T extends QuestionType> =
    T extends 'text' ? undefined :
        T extends 'single' ? SingleQuestionNoAnswersOption[] :
            T extends 'multiple' ? MultipleQuestionNoAnswersOption[] :
                T extends 'order' ? OrderQuestionNoAnswersOption[] :
                    any;


export interface LessonTestQuestionNoAnswers<T extends QuestionType = any> {
    id: string
    type: T
    score: number
    options: QuestionNoAnswersOptions<T>
    content: string
}