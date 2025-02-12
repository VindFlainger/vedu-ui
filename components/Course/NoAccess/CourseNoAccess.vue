<template>
    <template v-if="course">
        <div class="h-full pt-12 py-6 flex flex-col">
            <div class="flex justify-start items-center">
                <div class="relative flex gap-1 border-2 border-gray-200 border-b-0  bg-white rounded-t-3xl pt-3 pb-[3px] px-5
                    after:content-[''] after:absolute after:w-full after:h-1 after:left-0 after:top-[calc(100%-2px)] after:z-10 after:bg-white">
                    <button
                        v-for="tab in tabs"
                        class="relative min-w-[130px] text-center text-primary-900 font-bold py-1 rounded-2xl !select-none"
                        :class="{
                            'bg-primary-700 text-white': tab.value === selectedTab
                        }"
                        draggable="false"
                        :key="tab.value"
                        @click="selectedTab = tab.value"
                    >
                        {{ tab.label }}
                    </button>
                </div>
            </div>
            <div class="bg-white p-6 rounded-3xl rounded-tl-none flex-grow border-2 border-gray-200">
                <div class="flex gap-5">
                    <div>
                        <SizedImage
                            :image="course.image?.original"
                            :empty-image="noCourse"
                            class="w-[350px] h-[250px]"
                        />
                        <p class="mt-3 font-bold text-primary-900 text-lg">
                            {{ course.name }}
                        </p>
                        <div class="mt-3 flex flex-col gap-1 text-[15px]">
                            <div v-if="course.start" class="flex">
                                <u-icon value="Calendar" size="20"/>
                                <span class="ml-1">Начало курса:</span>
                                <span class="ml-1">{{ $luxon.fromISO(course.start).toFormat('LLL d, yyyy') }}</span>
                            </div>
                            <div v-if="course.end" class="flex">
                                <u-icon value="CalendarDays" size="20"/>
                                <span class="ml-1">Окончания курса:</span>
                                <span class="ml-1">{{ $luxon.fromISO(course.end).toFormat('LLL d, yyyy') }}</span>
                            </div>
                            <div v-if="course.end" class="flex">
                                <u-icon value="Window" size="20"/>
                                <span class="ml-1">Тип курса:</span>
                                <span class="ml-1 lowercase">{{ computedCourseType }}</span>
                            </div>
                        </div>
                        <u-button
                            v-if="course.type === 'public'"
                            class="mt-5"
                            :loading="loading"
                            label="Присоединится"
                            @click="joinCourse"
                        />
                    </div>

                    <div>
                        <p class="text-lg font-bold text-primary-900">
                            Описание курса:
                        </p>
                        <p class="mt-2 text-[15px]" v-html="course.about"/>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
import { CoursePreview } from "~/types/courses";
import noCourse from '~/assets/images/no-image/no-lesson.png'
import { CourseTypeOptions } from '~/config/course'

const { $luxon, $api, $notifications } = useNuxtApp()
const route = useRoute()
const intercomStore = useIntercomStore()

export interface Props {
    course: CoursePreview
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'joined': []
}>()

const tabs = computed(() => [
    {
        label: 'Описание',
        value: 'main',
    },
    {
        label: 'Отзывы',
        value: 'lessons',
    },
])

const computedCourseType = computed(() => {
    return CourseTypeOptions.find(type => type.value === props.course.type)?.label
})

const selectedTab = ref('main')

const { loading, removeLoading, addLoading } = useLoading()
const joinCourse = async () => {
    try {
        addLoading()
        await $api.courses.JOIN_COURSE({
            course_id: route.params.course as string,
        })

        intercomStore.addNotification({
            type: 'success',
            title: $notifications.JOINED_COURSE.title,
            text: $notifications.JOINED_COURSE.message
        })
        emit('joined')

    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}
</script>