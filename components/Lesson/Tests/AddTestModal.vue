<template>
    <u-dialog
        ref="modal"
        title="Add Test"
        icon="Plus"
        max-width="800"
        :freeze="false"
    >
        <div>
            <u-input
                v-model="title"
                class="w-[300px]"
                required
                label="Title"
            />
            <div class="mt-3 flex gap-5">
                <u-select
                    v-model="admission"
                    required
                    label="Admission Type"
                    :options="admissionOptions"
                />
                <u-select
                    v-model="report"
                    required
                    label="Report Type"
                    :options="reportOptions"
                />
                <u-select
                    v-model="scoreMode"
                    required
                    label="Score Mode"
                    :options="scoreModeOptions"
                />
                <u-input
                    class="shrink-0"
                    required
                    v-model="maxAttempts"
                    label="Max Attempts"
                    type="number"
                    min="1"
                    max="10"
                />
            </div>
            <div class="mt-3 flex gap-5">
                <u-input
                    class="shrink-0"
                    required
                    v-model="timeLimit"
                    label="Time Limit (minutes)"
                    type="number"
                    min="1"
                    max="1440"
                />
                <u-date-input
                    v-model="start"
                    label="Start"
                />
                <u-date-input
                    v-model="end"
                    label="End"
                />
            </div>
            <div class="mt-8">
                <u-input
                    v-model="searchQuery"
                    placeholder="Start typing to search by title and tags"
                    @input="searchQuestions"
                    @focusin="searchQuestions"
                />
                <div
                    class="mt-4 min-h-[400px] h-[400px] overflow-y-auto p-4 border-2 border-dashed border-gray-300
                    rounded-2xl inner-scrollbar"
                >
                    <div v-if="questionsLoaded" class="flex flex-col gap-2">
                        <template v-if="computedFoundQuestions.length">
                            <div
                                v-for="question in computedFoundQuestions"
                                :key="question.id"
                                class="p-2 border border-gray-200 rounded-2xl"
                            >
                                <p class="font-medium text-gray-900">
                                    {{ question.title }}
                                </p>
                                <p class="text-gray-900 text-[15px] leading-5" v-html="question.content"/>
                                <div class="mt-2 text-[15px] leading-5 text-gray-900">
                                    <TextQuestionPreview v-if="question.type === 'text'" :question="question"/>
                                    <SingleQustionPreview v-else-if="question.type === 'single'" :question="question"/>
                                    <MultipleQuestionPreview v-else-if="question.type === 'multiple'"
                                                             :question="question"/>
                                </div>
                                <div class="mt-3 flex justify-end">
                                    <u-button
                                        label="Select"
                                        @click="selectedQuestions.push({...question, score: 1})"
                                    />
                                </div>
                            </div>
                        </template>
                        <div v-else>
                            No Questions Found
                        </div>
                    </div>

                    <div v-else class="flex items-center justify-center h-full">
                        <u-loading :size="50"/>
                    </div>
                </div>
                <div class="mt-4" v-if="selectedQuestions.length">
                    <p class="font-medium">Selected</p>
                    <div
                        class="flex flex-col gap-2 mt-2 min-h-[400px] h-[400px] overflow-y-auto p-4 border-2 border-dashed border-gray-300
                            rounded-2xl inner-scrollbar"
                    >
                        <div
                            v-for="question in selectedQuestions"
                            :key="question.id"
                            class="p-2 border border-gray-200 rounded-2xl"
                        >
                            <p class="font-medium text-gray-900">
                                {{ question.title }}
                            </p>
                            <p class="text-gray-900 text-[15px] leading-5" v-html="question.content"/>
                            <div class="mt-2 text-[15px] leading-5 text-gray-900">
                                <TextQuestionPreview v-if="question.type === 'text'" :question="question"/>
                                <SingleQustionPreview v-else-if="question.type === 'single'" :question="question"/>
                                <MultipleQuestionPreview v-else-if="question.type === 'multiple'" :question="question"/>
                            </div>
                            <div class="mt-3 flex justify-between items-center">
                                <u-input
                                    v-model="question.score"
                                    class="w-[70px]"
                                    size="xs"
                                    type="number"
                                    placeholder="Score"
                                    max="10"
                                    min="1"
                                />
                                <u-button
                                    label="Remove"
                                    @click="selectedQuestions = selectedQuestions.filter(v => v.id !== question.id)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <div>
                <div class="text-[15px]">
                    <p>
                        <span class="font-medium">Total Questions:</span> {{selectedQuestions.length}}
                    </p>
                    <p>
                        <span class="font-medium">Total Score:</span> {{selectedQuestions.reduce((acc, v) => acc + v.score, 0)}}
                    </p>
                </div>
                <div class="mt-4 flex justify-between">
                    <u-button
                        label="Save"
                        :loading="loading"
                        :disabled="submitDisabled"
                        @click="submit"
                    />
                    <u-button
                        class="font-bold"
                        font-weight="600"
                        label="Cancel"
                        :disabled="loading"
                        text
                        color="red-500"
                    />
                </div>
            </div>
        </template>
    </u-dialog>
</template>

<script setup lang="ts">
import { QuestionFindResult } from "~/types/questions";

const { $api, $luxon } = useNuxtApp()

export interface Props {
    courseId: string
    lessonId: string
}

const props = withDefaults(defineProps<Props>(), {})

const modal = ref<any>()

const title = ref("")
const admission = ref('entire')
const report = ref('full')
const scoreMode = ref('max-attempt')
const maxAttempts = ref(3)
const start = ref()
const end = ref()
const timeLimit = ref(1440)

const admissionOptions = [
    {
        value: 'entire',
        label: 'Entire'
    },
    {
        value: 'phased',
        label: 'Phased'
    }
]


const reportOptions = [
    {
        value: 'full',
        label: 'Full'
    },
    {
        value: 'detailed-score',
        label: 'Detailed Score'
    },
    {
        value: 'score',
        label: 'Score'
    },
    {
        value: 'accepted',
        label: 'Accepted'
    }
]

const scoreModeOptions = [
    {
        value: 'last-attempt',
        label: 'Last Attempt'
    },
    {
        value: 'max-attempt',
        label: 'Max Attempt'
    },
]


const searchQuery = ref("")
const foundQuestions = ref<QuestionFindResult[]>([])
const selectedQuestions = ref<(QuestionFindResult & { score: number })[]>([]);
const computedFoundQuestions = computed(() => {
    return foundQuestions.value.filter(question => !selectedQuestions.value.some(v => v.id === question.id))
})
const questionsLoaded = ref(false)
const searchQuestions = async () => {
    try {
        const res = await $api.questions.SEARCH_QUESTIONS({
            search: searchQuery.value,
            page: 1,
            per_page: 100
        })

        foundQuestions.value = res.data
    } catch (err) {
        console.log(err)
    } finally {
        questionsLoaded.value = true
    }
}
searchQuestions()

const submitDisabled = computed(() => {
    return !selectedQuestions.value.length || !title.value.trim() || !timeLimit
})
const { loading, addLoading, removeLoading } = useLoading()
const submit = async () => {
    try {
        addLoading()
        await $api.lesson.ADD_TEST({
            title: title.value,
            course_id: props.courseId,
            lesson_id: props.lessonId,
            questions: selectedQuestions.value.map(question => ({id: question.id, score: question.score})),
            admission: admission.value,
            hidden: true,
            max_attempts: maxAttempts.value,
            report: report.value,
            score_mode: scoreMode.value,
            start: start.value && $luxon.fromJSDate(start.value).toISO(),
            end: start.value && $luxon.fromJSDate(end.value).toISO()
        })
        modal.value.close()
    } catch (err){
        console.log(err)
    } finally {
        removeLoading()
    }
}
</script>
