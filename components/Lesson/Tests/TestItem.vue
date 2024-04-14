<template>
    <div class="rounded-2xl border border-gray-200 p-4 outline outline-1 outline-offset-2 outline-gray-200">
        <template v-if="isInstructor">
            <p class="font-medium">{{test.title}}</p>
            <p>Report Type: {{ test.report }}</p>
            <p>Admission Type: {{ test.admission }}</p>
            <p>Score Mode: {{ test.score_mode }}</p>
            <p>Max Attempts: {{ test.max_attempts }}</p>
            <p>Full Score: {{ test.full_score }}</p>
            <p>Questions Count: {{ test.questions.length }}</p>
            <p v-if="test.start">Start: {{$luxon.fromISO(test.start).toFormat('LLL d, yyyy')}}</p>
            <p v-if="test.end">End: {{$luxon.fromISO(test.end).toFormat('LLL d, yyyy')}}</p>
            <div class="mt-3 flex justify-between">
                <span></span>
                <u-button
                    label="See Attempts"
                />
            </div>
        </template>
        <template v-else>
            <p class="font-medium">{{test.title}}</p>
            <p>Report Type: {{ test.report }}</p>
            <p>Admission Type: {{ test.admission }}</p>
            <p>Score Mode: {{ test.score_mode }}</p>
            <p>Max Attempts: {{ test.max_attempts }}</p>
            <p>Full Score: {{ test.full_score }}</p>
            <p>Questions Count: {{ test.questions.length }}</p>
            <p v-if="test.start">Start: {{$luxon.fromISO(test.start).toFormat('LLL d, yyyy')}}</p>
            <p v-if="test.end">End: {{$luxon.fromISO(test.end).toFormat('LLL d, yyyy')}}</p>
            <div class="mt-3 flex justify-between">
                <span></span>
                <nuxt-link>
                    <u-button
                        label="Open"
                    />
                </nuxt-link>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { LessonTest } from '~/types/lesson'

export interface Props {
    test: LessonTest
}

const props = withDefaults(defineProps<Props>(), {})

const accountStore = useAccountStore()
const { isInstructor } = storeToRefs(accountStore)
</script>

<style scoped></style>
