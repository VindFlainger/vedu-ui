<template>
    <ActionBar>
        <CoursesActionBar
            @create="showEditDialog = true"
        />
    </ActionBar>
    <div class="py-8">
        <CoursesOverviewList
            :courses="courses"
            :loading="fetchLoading"
            @manage="handleOpenEditDialog($event)"
            @delete="$emitter.emit('open:confirm-delete', {
                title: $notifications.DELETE_COURSE_REQUEST.title($event.name),
                text: $notifications.DELETE_COURSE_REQUEST.message,
                cb: () => deleteCourse($event.id)
            })"
        />
    </div>

    <CourseAddDialog
        v-if="showEditDialog"
        :course="selectedCourseComputed"
        @close="handleCloseEditDialog"
        @added="fetch"
    />
</template>

<script setup lang="ts">
import { CourseBasePreview } from "~/types/courses";
import { useRouteQuery } from "@vueuse/router";
import CoursesActionBar from "~/components/Courses/CoursesActionBar.vue";

const { $api } = useNuxtApp()

definePageMeta({
    roles: ['student', 'instructor'],
})

useSeoMeta({
    title: () => 'My Courses'
})

const selectedCourse = ref<string | null>(null)
const selectedCourseComputed = computed(() =>
    courses.value.find((course) => course.id === selectedCourse.value)
)


const showEditDialog = ref(false)
const handleOpenEditDialog = (courseId?: string) => {
    showEditDialog.value = true
    if (courseId) selectedCourse.value = courseId
}
const handleCloseEditDialog = () => {
    showEditDialog.value = false
    selectedCourse.value = null
}

const page = useRouteQuery('page', 1, { transform: v => Number(v) })
const perPage = useRouteQuery('per_page', 30, { transform: v => Number(v) })
const { loading: fetchLoading, addLoading: addFetchLoading, removeLoading: removeFetchLoading } = useLoading()
const total = ref(0)
const courses = ref<CourseBasePreview[] | null>(null)
const fetch = async () => {
    try {
        addFetchLoading()
        const res = await $api.courses.GET_COURSES({
            page: page.value,
            per_page: perPage.value
        })

        courses.value = res.data

        total.value = res.meta.total
    } catch (err) {
        console.log(err)
    } finally {
        removeFetchLoading()
    }
}

const { loading: deleteLoading, addLoading: addDeleteLoading, removeLoading: removeDeleteLoading } = useLoading()
const deleteCourse = async (id: string) => {
    try {
        addDeleteLoading()

        const res = await  $api.courses.DELETE_COURSE({
            course_id: id
        })

        fetch()
    } catch (err) {
        console.log(err)
    } finally {
        removeDeleteLoading()
    }
}

fetch()

</script>

