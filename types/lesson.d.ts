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