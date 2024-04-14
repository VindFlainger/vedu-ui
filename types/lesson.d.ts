import { SizedImage } from "~/types/global";
import { PersonalData } from "~/types/account";
import { QuestionFindResult } from "~/types/questions";

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
    hidden: boolean
    id: string
    attempts: string[]
    start: string
    questions: QuestionFindResult[]
    end: string
}