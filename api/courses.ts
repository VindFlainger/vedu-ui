import { NitroFetchOptions } from 'nitropack'
import _fetch, { Controls } from '~/api/handler'
import { AccessToken, CourseAccess, CourseBasePreview, CoursePreview, FoundCourse } from '~/types/courses'

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


export interface GetCoursesPayload {
    page: number
    per_page: number
}
export type GetCoursesData = {
    data: CourseBasePreview[],
    meta: {
        page: number
        per_page: number
        total: number
    }
}

export interface CreateCoursePayload {
    name: string
    type: string
    about: string
    image: string
    tags: string[]
    category: string
    price?: number
    start?: string
    end?: string
}
export interface CreateCourseData {

}

export interface DeleteCoursePayload {
    course_id: string
}
export interface DeleteCourseData {

}


export interface GenerateCourseTokenPayload {
    course_id: string
    type: string
    expires: string
}
export interface GenerateCourseTokenData {
    token: string
    type: string
}


export interface GetCourseAccessTokensPayload {
    course_id: string
}
export type GetCourseAccessTokensData = AccessToken[]

export default {

    CREATE_COURSE: (
        data: CreateCoursePayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<CreateCourseData>('POST', `/courses`, data, options, controls),

    DELETE_COURSE: (
        data: DeleteCoursePayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<DeleteCourseData>('DELETE', `/courses/${data.course_id}`, null, options, controls),

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

    GET_COURSES: (
        data: GetCoursesPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetCoursesData>('GET', `/courses`, null, options, controls),

    GENERATE_COURSE_ACCESS_TOKEN: (
        data: GenerateCourseTokenPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GenerateCourseTokenData>('POST', `/courses/${data.course_id}/generate-token`, data, options, controls),


    GET_COURSE_ACCESS_TOKENS: (
        data: GetCourseAccessTokensPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetCourseAccessTokensData>('GET', `/courses/${data.course_id}/tokens`, data, options, controls),
}
