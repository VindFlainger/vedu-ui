<template>
    <div class="border rounded-2xl p-5">
        <div v-if="event.type === 'lesson'" class="flex items-center gap-3">
            <div class="h-[104px] shrink-0">
                <img
                    class="h-full rounded-xl"
                    :src="event.image"
                />
            </div>
            <div>
                <p>
                    <span class="font-medium text-[17px] text-gray-900"> {{ event.name }} </span>
                    <span class="ml-3 text-[13px] text-gray-600"> {{ app.$luxon.fromISO(event.created_at).toFormat('LLL d, yyyy') }} </span>
                </p>
                <p class="mt-1 line-clamp-3">
                    {{event.content}}
                </p>
            </div>

        </div>
        <div
            v-else-if="event.type === 'comment'"
            class="flex items-start gap-3"
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
                    <span class="ml-3 text-[13px] text-gray-600"> {{ app.$luxon.fromISO(event.created_at).toFormat('LLL d, yyyy') }} </span>
                </p>
                <p class="mt-1">
                    {{ event.text }}
                </p>
            </div>
        </div>
        <div v-else-if="event.type === 'material'">
            <p>
                <span class="font-medium text-[17px] text-gray-900"> New material added </span>
                <span class="ml-3 text-[13px] text-gray-600"> {{ app.$luxon.fromISO(event.created_at).toFormat('LLL d, yyyy') }} </span>
            </p>
            <div class="mt-3 flex items-center gap-2">
                <img class="w-12" :src="event.lesson.image" alt="">
                <p>{{ event.lesson.name }}</p>
            </div>
        </div>
        <div v-else-if="event.type === 'assignment'">
            <p>
                <span class="font-medium text-[17px] text-gray-900"> New assignment added </span>
                <span class="ml-3 text-[13px] text-gray-600"> {{ app.$luxon.fromISO(event.created_at).toFormat('LLL d, yyyy') }} </span>
            </p>
            <div class="mt-3 flex items-center gap-2">
                <img class="w-12" :src="event.lesson.image" alt="">
                <p>{{ event.lesson.name }}</p>
            </div>
        </div>
        <div v-else-if="event.type === 'test'">
            <p>
                <span class="font-medium text-[17px] text-gray-900"> New test added </span>
                <span class="ml-3 text-[13px] text-gray-600"> {{ app.$luxon.fromISO(event.created_at).toFormat('LLL d, yyyy') }} </span>
            </p>
            <div class="mt-3 flex items-center gap-2">
                <img class="w-12" :src="event.lesson.image" alt="">
                <p>{{ event.lesson.name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CourseEvents } from "~/types/courses";
const app = useNuxtApp()

export interface Props {
    event: CourseEvents
}

const props = withDefaults(defineProps<Props>(), {})
</script>


<style scoped>

</style>