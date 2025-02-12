<template>
    <div class="border border-gray-200 shadow-[0_0_3px_#e5e7eb] rounded-2xl p-5">
        <nuxt-link
            v-if="event.type === 'lesson'"
            class="relative flex items-center gap-3 cursor-pointer"
            :to="{
                name: 'courses-course-lessons-lesson',
                params: {
                    course: route.params.course,
                    lesson: event.id
                }
            }"
        >
            <img
                class="h-[104px] rounded-xl shrink-0 aspect-[14/9]"
                :src="event.image"
            />
            <div>
                <p>
                    <span class="font-medium text-[17px] text-gray-900"> {{ event.name }} </span>
                </p>
                <p class="mt-1 line-clamp-3" v-html="event.content"/>
            </div>
            <p class="-bottom-4 font-medium right-0 absolute ml-3 text-[12px] text-gray-600 capitalize inline-block"> {{ app.$luxon.fromISO(event.created_at).toFormat('LLL d, yyyy') }} </p>
        </nuxt-link>


        <div
            v-else-if="event.type === 'comment'"
            class="relative flex items-start gap-3"
        >
            <SizedAvatar
                class="border border-1 border-gray-400 shadow-[0_0_2px_gray] rounded-full"
                :avatar="event.sender.avatar"
                size="35px"
                rounded
            />
            <div>
                <p>
                    <span class="font-medium text-[17px] text-gray-900"> {{ [event.sender.personal_data.first_name, event.sender.personal_data.last_name].filter(x => x).join(' ') }} </span>
                </p>
                <p class="mt-1">
                    {{ event.text }}
                </p>
            </div>
            <p class="-bottom-4 font-medium right-0 absolute ml-3 text-[12px] text-gray-600 capitalize inline-block"> {{ app.$luxon.fromISO(event.created_at).toFormat('LLL d, yyyy') }} </p>
        </div>


        <nuxt-link
            v-else-if="event.type === 'material'"
            class="relative"
            :to="{
                name: 'courses-course-lessons-lesson-materials',
                params: {
                    course: route.params.course,
                    lesson: event.lesson.id
                }
            }"
        >
            <p>
                <span class="font-medium text-[17px] text-gray-900"> Новый материал добавлен </span>
            </p>
            <div class="mt-3 flex items-center gap-2">
                <img class="w-16 rounded-xl" :src="event.lesson.image" alt="">
                <p class="text-[15px]">{{ event.lesson.name }}</p>
            </div>
            <p class="-bottom-4 font-medium right-0 absolute ml-3 text-[12px] text-gray-600 capitalize inline-block"> {{ app.$luxon.fromISO(event.created_at).toFormat('LLL d, yyyy') }} </p>
        </nuxt-link>

        <nuxt-link
            v-else-if="event.type === 'assignment'"
            class="relative"
            :to="{
                name: 'courses-course-lessons-lesson-assignments',
                params: {
                    course: route.params.course,
                    lesson: event.lesson.id
                }
            }"
        >
            <p>
                <span class="font-medium text-[17px] text-gray-900"> Новое задание добавлено </span>
            </p>
            <div class="mt-3 flex items-center gap-2">
                <img class="w-16 rounded-xl" :src="event.lesson.image" alt="">
                <p class="text-[15px]">{{ event.lesson.name }}</p>
            </div>
            <p class="-bottom-4 font-medium right-0 absolute ml-3 text-[12px] text-gray-600 capitalize inline-block"> {{ app.$luxon.fromISO(event.created_at).toFormat('LLL d, yyyy') }} </p>
        </nuxt-link>

        <nuxt-link
            v-else-if="event.type === 'test'"
            class="relative"
            :to="{
                name: 'courses-course-lessons-lesson-tests',
                params: {
                    course: route.params.course,
                    lesson: event.lesson.id
                }
            }"
        >
            <p>
                <span class="font-medium text-[17px] text-gray-900"> Новый тест добавлен </span>
            </p>
            <div class="mt-3 flex items-center gap-2">
                <img class="w-16 rounded-xl" :src="event.lesson.image" alt="">
                <p class="text-[15px]">{{ event.lesson.name }}</p>
            </div>
            <p class="-bottom-4 font-medium right-0 absolute ml-3 text-[12px] text-gray-600 capitalize inline-block"> {{ app.$luxon.fromISO(event.created_at).toFormat('LLL d, yyyy') }} </p>
        </nuxt-link>
    </div>
</template>

<script setup lang="ts">
import { CourseEvents } from "~/types/courses";
const app = useNuxtApp()
const route = useRoute()

export interface Props {
    event: CourseEvents
}

const props = withDefaults(defineProps<Props>(), {})
</script>


<style scoped>

</style>