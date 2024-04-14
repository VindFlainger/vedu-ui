<template>
    <div>
        <div v-if="isInstructor" class="flex pb-6 -mt-3">
            <u-button
                class="ml-auto mr-0"
                label="Add Test"
                @click="showAddTestModal = true"
            />
        </div>
        <div class="flex flex-col gap-5">
            <TestItem
                v-for="test in tests"
                :key="test.id"
                :test="test"
            />
        </div>

        <AddTestModal
            v-if="showAddTestModal"
            :course-id="route.params.course as string"
            :lesson-id="route.params.lesson as string"
            @close="showAddTestModal = false"
        />
    </div>
</template>

<script setup lang="ts">
import { LessonTest } from "~/types/lesson";
import TestItem from "~/components/Lesson/Tests/TestItem.vue";

const { $api } = useNuxtApp()
const route = useRoute()

const accountStore = useAccountStore()
const { isInstructor } = storeToRefs(accountStore)

const showAddTestModal = ref(false)

const tests = ref<LessonTest[]>([])
const { loading, addLoading, removeLoading } = useLoading()
const fetch = async () => {
    try {
        const res = await $api.lesson.GET_TESTS({
            course_id: route.params.course as string,
            lesson_id: route.params.lesson as string
        })

        tests.value = res

    } catch (err) {
        console.log(err)
    }
}

fetch()
</script>