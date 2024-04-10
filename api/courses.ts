import { NitroFetchOptions } from 'nitropack'
import _fetch, { Controls } from '~/api/handler'
import { CourseAccess, CoursePreview, FoundCourse } from '~/types/courses'

export interface FindCoursesPayload {
    categories?: string[]
    search?: string
    per_page: number
    page: number
}

export interface FindCoursesData {
    data: FoundCourse[]
    meta: {
        page: number
        per_page: number
        total: number
    }
}

export interface GetCoursePayload {
    id: string
}

export type GetCourseData = CoursePreview | CourseAccess


export default {
    FIND_COURSES: (
        data: FindCoursesPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<FindCoursesData>('GET', `/find-courses`, data, options, controls),

    GET_COURSE: (
        data: GetCoursePayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetCourseData>('GET', `/courses/${data.id}`, null, options, controls),
}
