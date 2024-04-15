<template>
    <template v-if="showTabsLayout">
        <div  class="flex justify-start">
            <div class="flex gap-3">
                <nuxt-link
                    v-for="tab in tabs"
                    class="py-2 px-6 bg-white rounded-t-2xl min-w-[130px] text-center"
                    :key="tab.value"
                    :to="{ name: tab.value ? `courses-course-lessons-lesson-${tab.value}` : `courses-course-lessons-lesson` }"
                >
                    {{ tab.label }}
                </nuxt-link>
            </div>
        </div>
        <div class="bg-white p-8 h-full rounded-3xl rounded-tl-none">
            <nuxt-page/>
        </div>
    </template>
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
        label: 'Progress'
    },
    {
        value: 'materials',
        label: 'Materials'
    },
    {
        value: 'assignments',
        label: 'Assignments'
    },
    {
        value: 'tests',
        label: 'Tests'
    },
]

const showTabsLayout = computed(()=> {
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