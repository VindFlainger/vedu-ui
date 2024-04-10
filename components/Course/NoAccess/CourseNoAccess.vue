<template>
    <div>
        {{course.name}}
        <div v-html="course.about"/>
        <div>
            <p>{{course.start }}</p>
            <p>{{ course.end }}</p>
        </div>
        <div>

        </div>
        <u-button/>
    </div>
</template>

<script setup lang="ts">
import { CoursePreview } from "~/types/courses";

export interface Props {
    course: CoursePreview
}

const props = withDefaults(defineProps<Props>(), {

})
</script>

<style scoped>

</style>