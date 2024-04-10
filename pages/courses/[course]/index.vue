<template>
    <div v-if="course">
        <div class="flex flex-col gap-3">
            <ActivityItem
                v-for="event in course.events"
                :event="event"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const courseStore = useCourseStore()

const { course } = storeToRefs(courseStore)

</script>

<style scoped>

</style>