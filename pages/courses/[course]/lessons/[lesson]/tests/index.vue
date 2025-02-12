<template>
    <div v-if="loaded">
        <div v-if="isInstructor" class="flex pb-6 -mt-3">
            <u-button
                class="ml-auto mr-0"
                label="Добавить тест"
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
    </div>
    <div v-else class="flex flex-col items-center">
        <u-loading
            size="42"
        />
        <p class="text-primary-700 text-[13px] ml-0.5">
            Загрузка...
        </p>
    </div>

    <AddTestModal
        v-if="showAddTestModal"
        :course-id="route.params.course as string"
        :lesson-id="route.params.lesson as string"
        @close="showAddTestModal = false"
    />
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
const loaded = ref(false)
const fetch = async () => {
    try {
        const res = await $api.lesson.GET_TESTS({
            course_id: route.params.course as string,
            lesson_id: route.params.lesson as string
        })

        tests.value = res
        loaded.value = true

    } catch (err) {
        console.log(err)
    }
}

fetch()
</script>