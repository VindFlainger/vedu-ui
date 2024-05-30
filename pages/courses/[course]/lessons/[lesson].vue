<template>
    <div v-if="showTabsLayout" class="relative h-full pt-12 py-6 flex flex-col">
        <nuxt-link
            class="flex gap-0.5 items-center absolute top-4 -left-6 group"
            :to="{ name: 'courses-course-lessons', params: { course: route.params.course } }"
        >
            <u-icon
                class="relative bottom-px [&_svg]:group-hover:!text-primary-700"
                value="ArrowLeftCircle"
                solid
                size="18"
                stroke-width="3"
                color="primary-900"
            />
            <span class="font-medium text-sm text-primary-900 group-hover:text-primary-700">Назад к курсу</span>
        </nuxt-link>
        <div class="flex justify-start items-center">
            <div class="relative flex border-2 border-gray-200 border-b-0  bg-white rounded-t-3xl pt-3 pb-[3px] px-5
                    after:content-[''] after:absolute after:w-full after:h-1 after:left-0 after:top-[calc(100%-2px)] after:z-10 after:bg-white">
                <nuxt-link
                    v-for="tab in tabs"
                    class="min-w-[130px] text-center text-primary-900 font-bold py-1 rounded-2xl !select-none"
                    draggable="false"
                    :key="tab.value"
                    exact-active-class="bg-primary-700 text-white"
                    :to="{ name: tab.value ? `courses-course-lessons-lesson-${tab.value}` : `courses-course-lessons-lesson` }"
                >
                    {{ tab.label }}
                </nuxt-link>
            </div>
            <div class="ml-auto mr-0 mb-2" id="lesson-menu">
            </div>
        </div>
        <div class="bg-white p-6 rounded-3xl rounded-tl-none flex-grow border-2 border-gray-200">
            <nuxt-page/>
        </div>
    </div>
    <template v-else>
        <nuxt-page/>
    </template>
</template>

<script setup lang="ts">

const lessonStore = useLessonStore()
const route = useRoute()

const tabs = [
    {
        value: '',
        label: 'Прогресс'
    },
    {
        value: 'materials',
        label: 'Материалы'
    },
    {
        value: 'assignments',
        label: 'Задания'
    },
    {
        value: 'tests',
        label: 'Тесты'
    },
]

const showTabsLayout = computed(() => {
    return ['courses-course-lessons-lesson', 'courses-course-lessons-lesson-tests', 'courses-course-lessons-lesson-assignments', 'courses-course-lessons-lesson-materials'].includes(route.name as string)
})


const { loading, addLoading, removeLoading } = useLoading()
const fetch = async () => {
    try {
        addLoading()
        await lessonStore.fetchLesson(route.params.course as string, route.params.lesson as string)
    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}


fetch()

</script>


<style scoped>

</style>