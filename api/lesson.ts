import { NitroFetchOptions } from 'nitropack'
import _fetch, { Controls } from '~/api/handler'
import { CourseAccess, CoursePreview, FoundCourse } from '~/types/courses'
import {
    LessonAssignment,
    LessonAssignmentResponse,
    LessonMaterial,
    LessonPreview,
    LessonTest,
    LessonTestAttempt, LessonTestAttemptFullData, LessonTestQuestionNoAnswers
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

export type GetLessonAssignmentsData = (LessonAssignment & { response: null | LessonAssignmentResponse })[]


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

export type GetLessonAssignmentResponsesData = LessonAssignmentResponse[]

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

export interface AddLessonTestPayload {
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

export interface GetTestAttemptStudentData {
    attempt: LessonTestAttempt
    questions: LessonTestQuestionNoAnswers[],
    test: Omit<LessonTest, "questions" | "attempts">
}

export interface GetTestAttemptInstructorData {
    attempt: LessonTestAttempt
    test: Omit<LessonTest, "attempts">
}


export interface GetTestAttemptsPayload {
    course_id: string
    lesson_id: string
    test_id: string
}

export interface GetTestAttemptsData {
    attempts: Omit<LessonTestAttempt, 'answers'>[],
    test: Omit<LessonTest, "questions" | "attempts">
}

export interface GetTestStudentsAttemptsPayload {
    course_id: string
    lesson_id: string
    test_id: string
    page: string | number
    per_page: string | number
    students?: string[],
    sort?: Record<string, any>
}

export interface GetTestStudentsAttemptsData {
    attempts: Omit<LessonTestAttemptFullData, 'answers'>[]
    test: Omit<LessonTest, "attempts">
    meta: {
        page: number
        per_page: number
        total: number
    }
}


export interface SaveTestAttemptPayload {
    course_id: string
    lesson_id: string
    test_id: string
    attempt_id: string
    answers: {
        question_id: string
        value: string | string[]
    }[]
    finish?: boolean
}


export interface SaveTestAttemptData {

}


export interface AddAssignmentResponsePayload {
    course_id: string
    lesson_id: string
    assignment_id: string
    files: string[]
    text?: string
}

export type AddAssignmentResponseData = LessonAssignmentResponse

export interface CreateLessonPayload {
    course_id: string
    name: string
    content: string
    image: string
    order?: number
}

export interface CreateLessonData {

}


export interface EditLessonPayload {
    course_id: string
    lesson_id: string
    name?: string
    content?: string
    image?: string
    order?: number
}

export interface EditLessonData {

}

export interface GetLessonsPayload {
    course_id: string
}

export type GetLessonsData = LessonPreview[]

export interface DeleteLessonPayload {
    course_id: string
    lesson_id: string
}

export interface DeleteLessonData {

}

export interface ForceFinishTestAttemptPayload {
    force_zero?: boolean
    reason: string
    course_id: string
    lesson_id: string
    test_id: string
    attempt_id: string
}

export type  ForceFinishTestAttemptData = LessonTestAttempt



export interface ChangeCheckResultsAttemptPayload {
    course_id: string
    lesson_id: string
    test_id: string
    attempt_id: string
    answers?: {
        question_id: string
        passed_score: number
    }[]
    total_score?: number
}

export type ChangeCheckResultsAttemptData = LessonTestAttempt


export default {
    CREATE_LESSON: (
        data: CreateLessonPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<CreateLessonData>('POST', `/courses/${data.course_id}/lesson`, data, options, controls),

    EDIT_LESSON: (
        data: EditLessonPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<EditLessonData>('PATCH', `/courses/${data.course_id}/lessons/${data.lesson_id}`, data, options, controls),

    DELETE_LESSON: (
        data: DeleteLessonPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<DeleteLessonData>('DELETE', `/courses/${data.course_id}/lessons/${data.lesson_id}`, data, options, controls),

    GET_LESSONS: (
        data: GetLessonsPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetLessonsData>('GET', `/courses/${data.course_id}/lessons`, null, options, controls),

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

    ADD_ASSIGNMENT_RESPONSE: (
        data: AddAssignmentResponsePayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<AddAssignmentResponseData>('POST', `/courses/${data.course_id}/lessons/${data.lesson_id}/assignments/${data.assignment_id}/response`, data, options, controls),

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
    ) => _fetch<GetTestAttemptStudentData | GetTestAttemptInstructorData>('GET', `/courses/${data.course_id}/lessons/${data.lesson_id}/tests/${data.test_id}/attempts/${data.attempt_id}`, data, options, controls),

    GET_TEST_ATTEMPTS: (
        data: GetTestAttemptsPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetTestAttemptsData>('GET', `/courses/${data.course_id}/lessons/${data.lesson_id}/tests/${data.test_id}/attempts`, data, options, controls),

    GET_TEST_STUDENTS_ATTEMPTS: (
        data: GetTestStudentsAttemptsPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetTestStudentsAttemptsData>('GET', `/courses/${data.course_id}/lessons/${data.lesson_id}/tests/${data.test_id}/students-attempts`, data, options, controls),

    SAVE_TEST_ATTEMPT: (
        data: SaveTestAttemptPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<SaveTestAttemptPayload>('POST', `/courses/${data.course_id}/lessons/${data.lesson_id}/tests/${data.test_id}/attempts/${data.attempt_id}/save`, data, options, controls),

    FORCE_FINISH_TEST_ATTEMPT: (
        data: ForceFinishTestAttemptPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<ForceFinishTestAttemptData>('POST', `/courses/${data.course_id}/lessons/${data.lesson_id}/tests/${data.test_id}/attempts/${data.attempt_id}/force-finish`, data, options, controls),

    CHANGE_CHECK_RESULTS_ATTEMPT: (
        data: ChangeCheckResultsAttemptPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<ChangeCheckResultsAttemptData>('POST', `/courses/${data.course_id}/lessons/${data.lesson_id}/tests/${data.test_id}/attempts/${data.attempt_id}/recheck`, data, options, controls),
}
