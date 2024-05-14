<template>
    <div class="h-full">
        <div v-if="!loading" class="flex flex-col gap-3">
            <LessonItem
                v-for="lesson in course.lessons"
                :key="lesson.id"
                :lesson="lesson"
                :course-id="course.id"
                @delete="handleDelete(lesson.id)"
                @edit=""
            />
        </div>
        <div v-else class="flex flex-col gap-3">
            <LessonItemSkeleton v-for="(_, i) in 5" :key="i"/>
        </div>
        <AddLessonModal
            v-if="showAddLessonModal"
            :course-id="course.id"
            @close="showAddLessonModal = false"
            @action="refetchLessons"
        />
        <nuxt-page/>
    </div>
</template>

<script setup lang="ts">
import { CourseAccess } from "~/types/courses";
import { Ref } from "vue";
import { LessonPreview } from "~/types/lesson";

const { $emitter } = useNuxtApp()

const courseStore = useCourseStore()
const { course } = storeToRefs(courseStore) as { course: Ref<CourseAccess> }
const { $api } = useNuxtApp()

const showAddLessonModal = ref(false)

$emitter.on('open:add-lesson-modal', () => {
    showAddLessonModal.value = true
})

const { loading, removeLoading, addLoading } = useLoading()
const refetchLessons = async () => {
    try {
        addLoading()
        await courseStore.refetchLessons()
    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}

const handleDelete = async (lessonId: string) => {
    try {
        await $api.lesson.DELETE_LESSON({
            course_id: course.value.id,
            lesson_id: lessonId
        })
        courseStore.softRemoveLesson(lessonId)
    } catch (err) {
        console.log(err)
    } finally {

    }
}

const selectedLesson = mdiCreditCardRefresh
const handleEdit = async (lesson: LessonPreview) => {

}

</script>

<style scoped>

</style>