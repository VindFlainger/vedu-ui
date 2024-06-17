<template>
    <div v-if="!loading && course" class="h-full">
        <CourseNoAccess
            v-if="!course.is_participant"
            :course="course"
            @joined="fetchCourse"
        />
        <CourseAccess
            class="flex flex-col h-full"
            v-else
            :course="course"
        />
    </div>
    <div v-else class="flex flex-col items-center justify-center h-full">
        <u-loading
            size="70"
        />
        <p class="text-primary-700 text-[15px] ml-0.5">
            Загрузка...
        </p>
    </div>
</template>

<script setup lang="ts">
import CourseNoAccess from "~/components/Course/NoAccess/CourseNoAccess.vue";
import { definePageMeta } from "#imports";

definePageMeta({
    layoutClass: 'h-full'
})

const { $api } = useNuxtApp()
const route = useRoute()

const courseStore = useCourseStore()

const { course } = storeToRefs(courseStore)

const { loading, addLoading, removeLoading } = useLoading()
const fetchCourse = async () => {
    try {
        addLoading()
        await courseStore.fetchCourse(route.params.course as string)
    } catch (err) {

    } finally {
        removeLoading()
    }
}

fetchCourse()

</script>

<style scoped>

</style>