import api from '~/api'
import { CourseAccess } from "~/types/courses";

export interface State {
    course: CourseAccess | null
}


export const useCourseStore = defineStore('Course', {
    state: (): State => ({
        course: null
    }),
    getters: {

    },
    actions: {
        async fetchCourse(id: string){
            const res = await api.courses.GET_COURSE({
                id
            })

            this.course = res as CourseAccess
        }
    },
})
