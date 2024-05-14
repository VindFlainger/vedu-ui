<template>
    <div v-if="course" class="h-full">
        <CourseNoAccess
            v-if="!course.is_participant"
            :course="course"
        />
        <CourseAccess
            class="flex flex-col h-full"
            v-else
            :course="course"
        />
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

const fetchCourse = async () => {
    try {
        await courseStore.fetchCourse(route.params.course as string)

    } catch (err) {

    } finally {

    }
}

fetchCourse()

</script>

<style scoped>

</style>