export interface CoursesCourse {
    name: string,
    img?: string,
    type: string,
    category: CoursesCategory,
    tags?: CoursesTag[],
    start?: string,
    end?: string,
    instructors: CoursesInstructor[],
    students_preview: CoursesStudent[],
    total_students: number,
    id: string
}

export interface CoursesInstructor {
    id: string,
    name: string,
    first_name: string,
    last_name: string,
    img?: string
}

export interface CoursesCategory {
    name: string,
    id: string
}

export interface CoursesStudent {
    id: string,
    name: string,
    first_name: string,
    last_name: string,
    img?: string
}

export interface CoursesTag {
    name: string,
    id: string
}