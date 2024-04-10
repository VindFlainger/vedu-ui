import { NitroFetchOptions } from 'nitropack'
import _fetch, { Controls } from '~/api/handler'
import { CourseAccess, CoursePreview, FoundCourse } from '~/types/courses'
import { LessonAssignment, LessonMaterial, LessonPreview } from "~/types/lesson";


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

}
