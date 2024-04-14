<template>
    <div v-if="course">
        <div class="flex flex-col gap-3">
            <LessonItem
                v-for="lesson in course.lessons"
                :key="lesson.id"
                :lesson="lesson"
                :course-id="course.id"
            />
            {{  }}
        </div>
        <nuxt-page></nuxt-page>
    </div>
</template>

<script setup lang="ts">
const courseStore = useCourseStore()
const { course } = storeToRefs(courseStore)
</script>

<style scoped>

</style>