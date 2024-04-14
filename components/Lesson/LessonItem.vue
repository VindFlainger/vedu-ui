<template>
    <div class="flex gap-5 p-5 border border-gray-200 rounded-2xl">
        <nuxt-link
            :to="{
                name: 'courses-course-lessons-lesson',
                params: {
                    course: courseId,
                    lesson: lesson.id
                }
            }"
        >
            <SizedImage
                :width="200"
                :height="120"
                :image="lesson.image"
                :empty-image="noLesson"
            />
        </nuxt-link>

        <div>
            <nuxt-link
                :to="{
                name: 'courses-course-lessons-lesson',
                params: {
                    course: courseId,
                    lesson: lesson.id
                }
            }">
                <p class="font-bold text-gray-900">
                    {{lesson.name}}
                </p>
            </nuxt-link>
            <p class="mt-0.5 text-[15px] line-clamp-4">
                {{lesson.content}}
            </p>
        </div>

    </div>
</template>

<script setup lang="ts">
import { CourseLessonPreview } from "~/types/courses";
import SizedImage from "~/components/Globals/Elements/SizedImage.vue";
import noLesson from "~/assets/images/no-image/no-lesson.png"

export interface Props {
    lesson: CourseLessonPreview,
    courseId: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>


<style scoped>

</style>