<template>
    <div class="border p-4">
        <SizedAvatar v-if="course.image" :avatar="course.image" size="100%" />
        <nuxt-link :to="{ name: 'courses-course', params: { course: course.id } }">
            <p>{{ course.name }}</p>
        </nuxt-link>
        <p>
            {{ course.about }}
        </p>
        <div v-if="course.start">Start: {{ course.start }}</div>
        <div v-if="course.end">End: {{ course.end }}</div>
        <div></div>
    </div>
</template>

<script setup lang="ts">
import { FoundCourse } from '~/types/courses'

export interface Props {
    course: FoundCourse
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped></style>
