import { NitroFetchOptions } from 'nitropack'
import _fetch, { Controls } from '~/api/handler'
import {
    CourseAccess,
    CourseAccessToken,
    CourseBasePreview,
    CoursePreview, CourseReview,
    CourseStudent,
    FoundCourse
} from '~/types/courses'

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
    search?: string
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
export type GetCourseAccessTokensData = CourseAccessToken[]


export interface GetCourseStudentsPayload {
    course_id: string
    page?: number
    per_page?: number
    search?: string
}
export type GetCourseStudentsData = {
    data: CourseStudent[],
    meta: {
        total: number
        per_page: number
        page: number
    }
}


export interface GetCourseReviewsPayload {
    course_id: string
    page?: number
    per_page?: number
}
export type GetCourseReviewsData = {
    data: CourseReview[],
    meta: {
        total: number
        per_page: number
        page: number
    }
}


export interface AddCourseReviewPayload {
    course_id: string
    amount: number
    text: string
}
export type AddCourseReviewsData = CourseReview


export interface EditCourseReviewPayload {
    course_id: string
    amount?: number
    text?: string
}
export type EditCourseReviewsData = CourseReview

export interface JoinCoursePayload {
    course_id: string
    token?: string
}
export type JoinCourseData = boolean

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

    GET_COURSE_STUDENTS: (
        data: GetCourseStudentsPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetCourseStudentsData>('GET', `/courses/${data.course_id}/students`, data, options, controls),

    GET_COURSE_REVIEWS: (
        data: GetCourseReviewsPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetCourseReviewsData>('GET', `/courses/${data.course_id}/reviews`, data, options, controls),

    ADD_COURSE_REVIEW: (
        data: AddCourseReviewPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<AddCourseReviewsData>('POST', `/courses/${data.course_id}/review`, data, options, controls),

    EDIT_COURSE_REVIEW: (
        data: EditCourseReviewPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<EditCourseReviewsData>('PATCH', `/courses/${data.course_id}/review`, data, options, controls),

    JOIN_COURSE: (
        data: JoinCoursePayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<JoinCourseData>('POST', `/courses/${data.course_id}/join`, data, options, controls),

    GET_COURSES: (
        data: GetCoursesPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetCoursesData>('GET', `/courses`, data, options, controls),

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
