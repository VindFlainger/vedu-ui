<template>
    <div v-if="course.events.length" class="flex flex-col gap-4">
        <ActivityItem
            v-for="event in course.events"
            :event="event"
        />
    </div>
    <div v-else class="h-full flex flex-col items-center justify-center">
        <u-icon value="PuzzlePiece" solid size="80" color="primary-900"/>
        <p class="text-primary-900 font-medium text-lg">
            Пока нету активностей
        </p>
    </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { CourseAccess } from "~/types/courses";

const courseStore = useCourseStore()

const { course } = storeToRefs(courseStore) as { course: Ref<CourseAccess> }

</script>