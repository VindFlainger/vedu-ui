<template>
    <template v-if="course">
        <div v-if="showTabsLayout" class="h-full pt-12 py-6 flex flex-col">
            <div class="flex justify-start items-center">
                <div class="relative flex gap-1 border-2 border-gray-200 border-b-0  bg-white rounded-t-3xl pt-3 pb-[3px] px-5
                    after:content-[''] after:absolute after:w-full after:h-1 after:left-0 after:top-[calc(100%-2px)] after:z-10 after:bg-white">
                    <nuxt-link
                        v-for="tab in tabs"
                        class="relative min-w-[130px] text-center text-primary-900 font-bold py-1 rounded-2xl !select-none"
                        draggable="false"
                        :key="tab.value"
                        exact-active-class="bg-primary-700 text-white"
                        :to="{ name: tab.value ? `courses-course-${tab.value}` : `courses-course`, params: { course : course.id} }"
                    >
                        {{ tab.label }}
                        <div v-if="tab.count" class="absolute -top-1 -right-1 bg-pink-500 rounded-full w-[21px] h-[21px]
                            text-[11px] font-bold flex items-center justify-center border-2 border-white text-white">
                            {{tab.count > 99 ? '99+' : tab.count}}
                        </div>
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
                    <template v-if="route.name === 'courses-course-access'">
                        <u-button
                            v-if="isInstructor"
                            label="Пригласить"
                            right-icon="Plus"
                            @click="$emitter.emit('open:add-access-modal')"
                        />
                    </template>
                    <template v-if="route.name === 'courses-course-reviews'">
                        <u-button
                            v-if="isStudent"
                            label="Добавить"
                            right-icon="Plus"
                            @click="$emitter.emit('open:add-access-modal')"
                        />
                    </template>
                </div>
            </div>
            <div class="bg-white p-6 rounded-3xl rounded-tl-none flex-grow border-2 border-gray-200">
                <nuxt-page/>
            </div>
        </div>
        <div v-else class="h-full">
            <nuxt-page/>
        </div>
    </template>
</template>

<script setup lang="ts">
import { CourseAccess } from "~/types/courses";
import { Ref } from "vue";

export interface Props {
    course: CourseAccess
}

const props = withDefaults(defineProps<Props>(), {})

const accountStore = useAccountStore()
const courseStore = useCourseStore()
const { course } = storeToRefs(courseStore) as { course: Ref<CourseAccess> }
const { user, isInstructor, isStudent } = storeToRefs(accountStore)

const route = useRoute()

const studentsTabs = computed(() => [
    {
        label: 'Активность',
        value: '',
        count: course.value.events.length
    },
    {
        label: 'Уроки',
        value: 'lessons',
        count: course.value.lessons.length
    },
    {
        label: 'Инструкторы',
        value: 'instructors',
        count: course.value.instructors.total
    },
    {
        label: 'Отзывы',
        value: 'reviews',
        count: course.value.reviews.total
    },
])

const instructorTabs = computed(() => [
    {
        label: 'Активность',
        value: '',
        count: course.value.events.length
    },
    {
        label: 'Уроки',
        value: 'lessons',
        count: course.value.lessons.length
    },
    {
        label: 'Студенты',
        value: 'students',
        count: course.value.students.total
    },
    ...props.course.type === 'private' ?
        [
            {
                label: 'Доступ',
                value: 'access'
            }
        ] : [],
    {
        label: 'Отзывы',
        value: 'reviews',
        count: course.value.reviews.total
    },
])

const tabs = computed<any>(() => {
    if (user.value.role === 'instructor') return instructorTabs.value
    else return studentsTabs.value
})


const showTabsLayout = computed(() => {
    return ['courses-course', 'courses-course-lessons', 'courses-course-students', 'courses-course-instructors', 'courses-course-access', 'courses-course-reviews'].includes(route.name as string)
})

</script>

<style scoped>

</style>