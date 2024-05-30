<template>
    <template v-if="course">
        <div v-if="showTabsLayout" class="h-full pt-12 py-6 flex flex-col">
            <div class="flex justify-start items-center">
                <div class="relative flex border-2 border-gray-200 border-b-0  bg-white rounded-t-3xl pt-3 pb-[3px] px-5
                    after:content-[''] after:absolute after:w-full after:h-1 after:left-0 after:top-[calc(100%-2px)] after:z-10 after:bg-white">
                    <nuxt-link
                        v-for="tab in tabs"
                        class="min-w-[130px] text-center text-primary-900 font-bold py-1 rounded-2xl !select-none"
                        draggable="false"
                        :key="tab.value"
                        exact-active-class="bg-primary-700 text-white"
                        :to="{ name: tab.value ? `courses-course-${tab.value}` : `courses-course`, params: { course : course.id} }"
                    >
                        {{ tab.label }}
                    </nuxt-link>
                </div>
                <div class="ml-auto mr-0 mb-2" id="lesson-menu">
                    <template v-if="route.name === 'courses-course-lessons'">
                        <u-button
                            v-if="isInstructor"
                            label="Добавить урок"
                            right-icon="Plus"
                            @click="$emitter.emit('open:add-lesson-modal')"
                        />
                    </template>
                </div>
            </div>
            <div class="bg-white p-6 rounded-3xl rounded-tl-none flex-grow border-2 border-gray-200">
                <nuxt-page />
            </div>
        </div>
        <div v-else class="h-full">
            <nuxt-page />
        </div>
    </template>
</template>

<script setup lang="ts">
import { CourseAccess } from "~/types/courses";

export interface Props {
    course: CourseAccess
}

const props = withDefaults(defineProps<Props>(), {})

const accountStore = useAccountStore()
const { user, isInstructor } = storeToRefs(accountStore)

const route = useRoute()

const studentsTabs = [
    {
        label: 'Активность',
        value: ''
    },
    {
        label: 'Уроки',
        value: 'lessons'
    },
    {
        label: 'Инструкторы',
        value: 'instructors'
    },
    {
        label: 'Отзывы',
        value: 'reviews'
    },
]

const instructorTabs = [
    {
        label: 'Активность',
        value: ''
    },
    {
        label: 'Уроки',
        value: 'lessons'
    },
    {
        label: 'Студенты',
        value: 'students'
    },
    {
        label: 'Доступ',
        value: 'access'
    },
    {
        label: 'Отзывы',
        value: 'reviews'
    },
]

const tabs = computed(() => {
    if (user.value.role === 'instructor') return instructorTabs
    else return studentsTabs
})


const showTabsLayout = computed(()=> {
    return ['courses-course', 'courses-course-lessons', 'courses-course-students', 'courses-course-instructors', 'courses-course-access', 'courses-course-reviews'].includes(route.name as string)
})

</script>

<style scoped>

</style>