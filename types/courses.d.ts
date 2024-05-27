import { SizedImage } from '~/types/global'
import { PersonalData } from '~/types/accout'
import { UserPreview } from "~/types/account";
import { LessonPreview } from "~/types/lesson";

export interface CoursesCourse {
    name: string
    img?: string
    type: string
    category: CoursesCategory
    tags?: CoursesTag[]
    start?: string
    end?: string
    instructors: CoursesInstructor[]
    students_preview: CoursesStudent[]
    total_students: number
    id: string
}

export interface CoursesInstructor {
    id: string
    name: string
    first_name: string
    last_name: string
    img?: string
}

export interface CoursesCategory {
    name: string
    id: string
}

export interface CoursesStudent {
    id: string
    name: string
    first_name: string
    last_name: string
    img?: string
}

export interface CoursesTag {
    name: string
    id: string
}

export interface FoundCourse {
    id: string
    owner: string
    name: string
    type: string
    about: string
    pricing: {
        price: number
        discount: number | null
        discount_start: string | null
        discount_end: string | null
    }
    start?: string
    end?: string
    tags: string[]
    image?: SizedImage
    category?: {
        name: string
        category: string
        id: string
    }
    lessons_count: number
    reviews_stats: {
        avg: number | null
        count: number
    }
    students_stats: {
        total_count: number
        preview: UserPreview[]
    }
    instructors_stats: {
        total_count: number
        preview: UserPreview[]
    }
    is_participant: boolean
}

export interface CoursePreview {
    id: string
    owner: {
        id: string
        personal_data: PersonalData,
        avatar?: SizedImage
    }
    name: string
    type: string
    about: string
    pricing: {
        price: number
        discount: number | null
        discount_start: string | null
        discount_end: string | null
    }
    start?: string
    end?: string
    tags: string[]
    image?: SizedImage
    category?: {
        name: string
        category: string
        id: string
    }
    stats: {
        reviews: {
            avg: number | null
            total: number
        },
        materials_count: number,
        test_count: number,
        assignments_count: number
    },
    lessons: {
        name: string
    }[]
    students: {
        total: number
        preview: UserPreview[]
    }
    instructors: {
        total: number
        preview: UserPreview[]
    }
    is_participant: boolean
}

export interface CourseEventTest {
    type: 'test',
    lesson: {
        id: string,
        name: string,
        content: string,
        image: string,
        created_at: string
    },
    id: string,
    created_at: string
}

export interface CourseEventAssignment {
    type: 'assignment',
    lesson: {
        id: string,
        name: string,
        content: string,
        image: string,
        created_at: string
    },
    description: string,
    id: string,
    created_at: string
}

export interface CourseEventMaterial {
    type: 'material',
    lesson: {
        id: string,
        name: string,
        content: string,
        image: string,
        created_at: string
    },
    description: string,
    id: string,
    created_at: string
}

export interface CourseEventComment {
    type: 'comment',
    text: string,
    id: string,
    sender: UserPreview,
    created_at: string
}

export interface CourseEventLesson {
    type: 'lesson',
    name: string,
    id: string,
    content: string
    image: string
    created_at: string
}

export type CourseEvents = CourseEventTest | CourseEventAssignment | CourseEventMaterial | CourseEventComment | CourseEventLesson


export interface CourseLessonPreview {
    id: string,
    name: string,
    image?: string,
    content: string
}

export interface CourseAccess {
    id: string
    owner: {
        id: string
        personal_data: PersonalData,
        avatar?: SizedImage
    }
    name: string
    type: string
    about: string
    pricing: {
        price: number
        discount: number | null
        discount_start: string | null
        discount_end: string | null
    }
    start?: string
    end?: string
    tags: string[]
    image?: SizedImage
    category?: {
        name: string
        category: string
        id: string
    }
    stats: {
        reviews: {
            avg: number | null
            total: number
        },
        materials_count: number,
        test_count: number,
        assignments_count: number
    },
    lessons: LessonPreview[]
    students: {
        total: number
        preview: UserPreview[]
    }
    instructors: {
        total: number
        preview: UserPreview[]
    }
    is_participant: boolean,
    events: CourseEvents[]
}

