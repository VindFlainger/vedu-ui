import { NitroFetchOptions } from 'nitropack'
import _fetch, { Controls } from '~/api/handler'
import { CourseAccess, CoursePreview, FoundCourse } from '~/types/courses'
import {
    LessonAssignment,
    LessonAssignmentResponse,
    LessonMaterial,
    LessonPreview,
    LessonTest,
    LessonTestAttempt, LessonTestQuestionNoAnswers
} from "~/types/lesson";


export interface GetLessonPayload {
    course_id: string
    lesson_id: string
}
export type GetLessonData = LessonPreview


export interface GetLessonMaterialsPayload {
    course_id: string
    lesson_id: string
}
export type GetLessonMaterialsData = LessonMaterial[]


export interface GetLessonAssignmentsPayload {
    course_id: string
    lesson_id: string
}
export type GetLessonAssignmentsData = LessonAssignment[]


export interface DeleteLessonMaterialPayload {
    course_id: string
    lesson_id: string
    material_id: string
}
export type DeleteLessonMaterialData = boolean


export interface AddLessonMaterialPayload {
    course_id: string
    lesson_id: string
    file_id: string
    description: string
}
export type AddLessonMaterialData = LessonMaterial


export interface EditLessonMaterialPayload {
    course_id: string
    lesson_id: string
    material_id: string
    description: string
}
export type EditLessonMaterialData = LessonMaterial


export interface AddLessonAssignmentPayload {
    course_id: string
    lesson_id: string
    files: string[]
    description: string
}
export type AddLessonAssignmentData = LessonAssignment


export interface DeleteLessonAssignmentPayload {
    course_id: string
    lesson_id: string
    assignment_id: string
}
export type DeleteLessonAssignmentData = boolean


export interface EditLessonAssignmentPayload {
    course_id: string
    lesson_id: string
    assignment_id: string
    description: string
}
export type EditLessonAssignmentData = LessonAssignment


export interface GetLessonAssignmentResponsesPayload {
    course_id: string
    lesson_id: string
    assignment_id: string
}
export type GetLessonAssignmentResponsesData =  LessonAssignmentResponse[]

export interface ResolveLessonAssignmentResponsePayload {
    course_id: string
    lesson_id: string
    assignment_id: string
    response_id: string
    status: string
    points?: number
    message?: string
    extra_attempt?: boolean
}
export type ResolveLessonAssignmentResponseData = LessonAssignmentResponse

export interface AddLessonTestPayload{
    course_id: string
    lesson_id: string
    title: string
    questions: {
        score: number
        id: string
    }[],
    admission: string
    report: string
    score_mode: string
    max_attempts: number
    start?: string
    end?: string
    time_limit: number
}
export type AddLessonTestData = LessonTest


export interface GetLessonTestsPayload {
    course_id: string
    lesson_id: string
}
export type GetLessonTestsData = LessonTest[]


export interface StartTestAttemptPayload {
    course_id: string
    lesson_id: string
    test_id: string
}
export interface StartTestAttemptData {
    attempt: LessonTestAttempt
    questions: LessonTestQuestionNoAnswers
}

export interface GetTestAttemptPayload {
    course_id: string
    lesson_id: string
    test_id: string
    attempt_id: string
}
export interface GetTestAttemptData {
    attempt: LessonTestAttempt
    questions: LessonTestQuestionNoAnswers[]
}


export default {
    FIND_LESSON: (
        data: GetLessonPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetLessonData>('GET', `/course/${data.course_id}/lessons/${data.lesson_id}`, null, options, controls),




    /* MATERIALS */
    GET_LESSON_MATERIALS: (
        data: GetLessonMaterialsPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetLessonMaterialsData>('GET', `/course/${data.course_id}/lessons/${data.lesson_id}/materials`, null, options, controls),

    ADD_LESSON_MATERIAL: (
        data: AddLessonMaterialPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<AddLessonMaterialData>('POST', `/course/${data.course_id}/lessons/${data.lesson_id}/material`, data, options, controls),

    EDIT_LESSON_MATERIAL: (
        data: EditLessonMaterialPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<EditLessonMaterialData>('PATCH', `/courses/${data.course_id}/lessons/${data.lesson_id}/materials/${data.material_id}`, data, options, controls),

    DELETE_LESSON_MATERIAL: (
        data: DeleteLessonMaterialPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<DeleteLessonMaterialData>('DELETE', `/course/${data.course_id}/lessons/${data.lesson_id}/materials/${data.material_id}`, null, options, controls),



    /* ASSIGNMENTS */
    GET_LESSON_ASSIGNMENTS: (
        data: GetLessonAssignmentsPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetLessonAssignmentsData>('GET', `/course/${data.course_id}/lessons/${data.lesson_id}/assignments`, null, options, controls),

    DELETE_LESSON_ASSIGNMENT: (
        data: DeleteLessonAssignmentPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<DeleteLessonAssignmentData>('DELETE', `/courses/${data.course_id}/lessons/${data.lesson_id}/assignments/${data.assignment_id}`, null, options, controls),

    ADD_LESSON_ASSIGNMENT: (
        data: AddLessonAssignmentPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<AddLessonAssignmentData>('POST', `/courses/${data.course_id}/lessons/${data.lesson_id}/assignment`, data, options, controls),

    EDIT_LESSON_ASSIGNMENT: (
        data: EditLessonAssignmentPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<EditLessonAssignmentData>('PATCH', `/courses/${data.course_id}/lessons/${data.lesson_id}/assignments/${data.assignment_id}`, data, options, controls),

    GET_LESSON_ASSIGNMENT_RESPONSES: (
        data: GetLessonAssignmentResponsesPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetLessonAssignmentResponsesData>('GET', `/courses/${data.course_id}/lessons/${data.lesson_id}/assignments/${data.assignment_id}/responses`, data, options, controls),

    RESOLVE_LESSON_ASSIGNMENT_RESPONSE: (
        data: ResolveLessonAssignmentResponsePayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<ResolveLessonAssignmentResponseData>('PATCH', `/courses/${data.course_id}/lessons/${data.lesson_id}/assignments/${data.assignment_id}/responses/${data.response_id}/resolve`, data, options, controls),

    ADD_TEST: (
        data: AddLessonTestPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<AddLessonTestData>('POST', `/courses/${data.course_id}/lessons/${data.lesson_id}/test`, data, options, controls),

    GET_TESTS: (
        data: GetLessonTestsPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetLessonTestsData>('GET', `/courses/${data.course_id}/lessons/${data.lesson_id}/tests`, data, options, controls),

    START_TEST_ATTEMPT: (
        data: StartTestAttemptPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<StartTestAttemptData>('POST', `/courses/${data.course_id}/lessons/${data.lesson_id}/tests/${data.test_id}/start`, data, options, controls),

    GET_TEST_ATTEMPT: (
        data: GetTestAttemptPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetTestAttemptData>('GET', `/courses/${data.course_id}/lessons/${data.lesson_id}/tests/${data.test_id}/attempts/${data.attempt_id}`, data, options, controls),
}
