<template>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <template v-if="!loading">
            <CoursesOverviewListItem
                v-for="course in courses"
                :key="course.id"
                :course="course"
                @manage="emit('manage', course.id as any)"
                @delete="emit('delete', { name: course.name, id: course.id } as any)"
            />
        </template>
        <template v-else>
            <CoursesOverviewItemSkeleton
                v-for="i in 15"
                :key="i"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import { CoursesCourse } from "~/types/courses";

export interface Props {
    courses: CoursesCourse[]
    loading: boolean
}

const props = withDefaults(defineProps<Props>(), {
    courses: () => []
})

const emit = defineEmits<{
    'manage': [id: string]
    'delete': [v: { name: string, id: string }]
}>()


</script>
