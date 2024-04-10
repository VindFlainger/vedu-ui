<template>
    <ActionBar> </ActionBar>
    <CoursesOverviewList :courses="courses" @manage="handleOpenEditDialog($event)" />
    <CourseEditDialog
        v-if="showEditDialog"
        :course="selectedCourseComputed"
        @close="handleCloseEditDialog"
    />
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";

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
</script>

<style scoped></style>
