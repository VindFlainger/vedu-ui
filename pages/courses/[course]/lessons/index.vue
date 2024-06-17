<template>
    <div class="h-full">
        <div v-if="!loading && course.lessons.length" class="flex flex-col gap-3">
            <LessonItem
                v-for="lesson in course.lessons"
                :key="lesson.id"
                :lesson="lesson"
                :course-id="course.id"
                @delete="handleDelete(lesson.id)"
                @edit="handleEdit(lesson)"
            />
        </div>
        <div v-else-if="loading" class="flex flex-col gap-3">
            <LessonItemSkeleton v-for="(_, i) in 8" :key="i"/>
        </div>
        <div v-else class="h-full flex flex-col items-center justify-center">
            <u-icon value="PuzzlePiece" solid size="80" color="primary-900"/>
            <p class="text-primary-900 font-medium text-lg">
                Уроки пока не добавлены
            </p>
            <u-button
                v-if="isInstructor"
                class="mt-3"
                label="Добавить"
                right-icon="Plus"
                icon="Plus"
                @click="showAddLessonModal = true"
            />
        </div>
        <nuxt-page/>
    </div>

    <AddLessonModal
        v-if="showAddLessonModal"
        :course-id="course.id"
        :lesson="selectedLesson"
        @close="showAddLessonModal = false; selectedLesson = null"
        @added="refetchLessons"
        @edited="refetchLessons"
    />
</template>

<script setup lang="ts">
import { CourseAccess } from "~/types/courses";
import { Ref } from "vue";
import { LessonPreview } from "~/types/lesson";
const { $emitter } = useNuxtApp()

const accountStore = useAccountStore()
const courseStore = useCourseStore()
const { $api } = useNuxtApp()

const { isInstructor } = storeToRefs(accountStore)
const { course } = storeToRefs(courseStore) as { course: Ref<CourseAccess> }

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


const selectedLesson = ref()
const handleEdit = async (lesson: LessonPreview) => {
    selectedLesson.value = lesson
    showAddLessonModal.value = true
}

</script>