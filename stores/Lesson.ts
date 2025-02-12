import api from '~/api'
import { LessonPreview } from "~/types/lesson";

export interface State {
    lesson: LessonPreview | null
}

export const useLessonStore = defineStore('Lesson', {
    state: (): State => ({
        lesson: null
    }),
    getters: {},
    actions: {
        async fetchLesson(courseId: string, lessonId: string) {
            const res = await api.lesson.FIND_LESSON({
                course_id: courseId,
                lesson_id: lessonId,
            })

            this.lesson = res
        },
    },
})
