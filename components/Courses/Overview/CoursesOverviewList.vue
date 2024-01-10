<template>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <CoursesOverviewListItem
            v-for="course in courses"
            :key="course.id"
            :name="course.name"
            :type="course.type"
            :category="course.category"
            :end="course.end"
            :start="course.start"
            :img="course.img"
            :instructors="course.instructors"
            :students-preview="course.students_preview"
            :total-students="course.total_students"
            :tags="course.tags"
            @manage="emit('manage', course.id)"
        />
    </div>
</template>

<script setup lang="ts">
import { CoursesCourse } from "~/types/courses";
import Popper from '@popperjs/core/dist/esm'

export interface Props {
    courses?: CoursesCourse[]
}

const props = withDefaults(defineProps<Props>(), {
    courses: () => []
})

const emit = defineEmits<{
    'manage': [id: string]
}>()


</script>


<style scoped>

</style>