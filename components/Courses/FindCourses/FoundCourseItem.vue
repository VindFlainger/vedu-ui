<template>
    <nuxt-link
        :to="{ name: 'courses-course', params: { course: course.id } }"
        class="border border-gray-200 rounded-2xl bg-white p-5 pb-3 shadow-[0_0_3px_#e5e7eb]"
    >
        <SizedImage
            class="w-full aspect-[14/9] object-cover"
            :image="course.image?.original"
            :empty-image="noCourse"
            size="100%"
        />
        <div class="mt-2 font-medium text-lg leading-[22px] block">
            <p class="line-clamp-2">{{ course.name }}</p>
        </div>
        <div v-html="course.about.replace(/<[^>]*>/g, '')" class="mt-1 line-clamp-3 text-sm"/>
    </nuxt-link>
</template>

<script setup lang="ts">
import { FoundCourse } from '~/types/courses'
import noCourse from '~/assets/images/no-image/no-lesson.png'

export interface Props {
    course: FoundCourse
}

const props = withDefaults(defineProps<Props>(), {})
</script>