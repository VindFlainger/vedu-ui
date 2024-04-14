<template>
    <div v-if="course">
        <div v-if="showTabsLayout">
            <div class="flex justify-start">
                <div class="flex gap-3 ">
                    <nuxt-link
                        v-for="tab in tabs"
                        class="py-2 px-6 bg-white rounded-t-2xl min-w-[130px] text-center"
                        :key="tab.value"
                        :to="{ name: tab.value ? `courses-course-${tab.value}` : `courses-course`, params: { course : course.id} }"
                    >
                        {{ tab.label }}
                    </nuxt-link>
                </div>
            </div>
            <div class="bg-white p-4 rounded-3xl rounded-tl-none flex-grow">
                <nuxt-page />
            </div>
        </div>
        <div v-else>
            <nuxt-page />
        </div>
    </div>

</template>

<script setup lang="ts">
import { CourseAccess } from "~/types/courses";

export interface Props {
    course: CourseAccess
}

const props = withDefaults(defineProps<Props>(), {})

const accountStore = useAccountStore()
const { user } = storeToRefs(accountStore)

const route = useRoute()

const studentsTabs = [
    {
        label: 'Activity',
        value: ''
    },
    {
        label: 'Lessons',
        value: 'lessons'
    },
    {
        label: 'Instructors',
        value: 'instructors'
    },
    {
        label: 'Reviews',
        value: 'reviews'
    },
]

const instructorTabs = [
    {
        label: 'Activity',
        value: ''
    },
    {
        label: 'Lessons',
        value: 'lessons'
    },
    {
        label: 'Students',
        value: 'students'
    },
    {
        label: 'Access',
        value: 'access'
    },
    {
        label: 'Reviews',
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