import api from '~/api'
import { CourseAccess } from "~/types/courses";

export interface State {
    course: CourseAccess | null
}


export const useCourseStore = defineStore('Course', {
    state: (): State => ({
        course: null
    }),
    getters: {},
    actions: {
        async fetchCourse(id: string) {
            const res = await api.courses.GET_COURSE({
                id
            })

            this.course = res as CourseAccess
        },
        async refetchLessons() {
            if (this.course) {
                this.course.lessons = await api.lesson.GET_LESSONS({ course_id: this.course.id })
            }
        },
        softRemoveLesson(lessonId: string) {
            if (this.course) this.course.lessons = this.course.lessons.filter(lesson => lesson.id !== lessonId)
        }
    },
})
