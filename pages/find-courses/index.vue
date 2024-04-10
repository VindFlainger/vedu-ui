<template>
    <div>
        <div>Find Courses</div>
        <div v-if="loading"></div>
        <div v-else class="grid grid-cols-4 gap-2">
            <FoundCourseItem
                v-for="course in courses"
                :key="course.id"
                :course="course"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { FoundCourse } from '~/types/courses'
import FoundCourseItem from '~/components/Courses/FindCourses/FoundCourseItem.vue'

const { $api } = useNuxtApp()

const courses = ref<FoundCourse[]>([])
const total = ref(0)
const { loading, addLoading, removeLoading } = useLoading()
const fetchCourses = async () => {
    try {
        addLoading()
        const res = await $api.courses.FIND_COURSES({ page: 1, per_page: 15 })
        courses.value = res.data
    } catch (err) {
    } finally {
        removeLoading()
    }
}

fetchCourses()
</script>

<style scoped></style>
