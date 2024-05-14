<template>
    <div class="mt-8 flex gap-8">
        <div
            v-if="attempt"
            class="flex flex-col gap-3"
        >
            <div
                v-for="(question, i) in questions"
                :key="question.id"
                class="relative overflow-hidden flex gap-5 p-4 py-7 border-2 border-gray-200 rounded-2xl bg-white"
                :class="{
                    'border-red-500': question.answer === 'incorrect',
                    'border-green-500': question.answer === 'correct',
                    'border-yellow-500': question.answer === 'partly correct',
                }"
            >
                <div class="w-[110px] shrink-0">
                    <div
                        class="w-8 h-8 flex items-center justify-center border-2 border-primary-900 rounded-lg
                              bg-primary-700 self-start shrink-0 text-white font-medium text-sm"
                        :class="{
                            '!border-red-500 !bg-red-100 !text-red-500': question.answer === 'incorrect',
                            '!border-green-500 !bg-green-100 !text-green-500': question.answer === 'correct',
                            '!border-yellow-500 !bg-yellow-100 !text-yellow-500': question.answer === 'partly correct',
                        }"
                    >
                        {{ i + 1 }}
                    </div>
                    <div class="mt-2">
                        <p v-if="question.passed_score === null" class="text-[15px]">
                            <span class="font-medium">Score:</span> {{ question.score }}
                        </p>
                        <p v-else class="text-[15px]">
                            <span class="font-medium">Score:</span> {{ question.passed_score }}/{{ question.score }}
                        </p>
                    </div>
                </div>
                <AttemptTextQuestion
                    v-if="question.type === 'text'"
                    v-model.trim="question.value"
                    :question="question"
                    :readonly="finished"
                    :number="i + 1"
                    :correct-answers="question.correct_answers"
                />
                <AttemptSingleQuestion
                    v-else-if="question.type === 'single'"
                    v-model="question.value"
                    :readonly="finished"
                    :question="question"
                    :correct-answers="question.correct_answers"
                />
                <AttemptMultipleQuestion
                    v-else-if="question.type === 'multiple'"
                    v-model="question.value"
                    :readonly="finished"
                    :question="question"
                    :correct-answers="question.correct_answers"
                />
                <div
                    class="absolute right-0 top-0 font-medium leading-4 pt-[5px] pb-1.5 px-3 capitalize rounded-bl-2xl text-sm text-white"
                    :class="{
                        'bg-red-500': question.answer === 'incorrect',
                        'bg-green-500': question.answer === 'correct',
                        'bg-yellow-500': question.answer === 'partly correct',
                    }"
                >
                    {{ question.answer }}
                </div>
            </div>
        </div>
        <div class="self-start bg-white p-4 rounded-2xl w-[350px] border-2 border-dashed border-primary-700">
            <template v-if="!finished">
                <div>
                    Time Remain:
                    <span :class="{'blinking': timeRemain < 60}">
                        {{ Math.floor(timeRemain / 3600) }}h
                        {{ Math.floor((timeRemain % 3600) / 60) }}m
                        {{ Math.floor(timeRemain % 60) }}s
                </span>
                </div>
                <div>
                    Total Score: {{ questions.reduce((acc, question) => acc + question.score, 0) }}
                </div>
            </template>
            <template v-else>
                <p>
                    Score: {{ attempt.checked.total_score }}/{{ test.full_score }}
                </p>
                <p>
                    Percent:
                </p>
            </template>
            <div>
                <p>Question Navigation</p>
                <div>
                    <div class="mt-1 flex gap-1 flex-wrap">
                        <div
                            v-for="(question, i) in questions"
                            :key="question.id"
                            class="flex items-center justify-center w-6 h-6 rounded-full font-medium text-white text-sm"
                            :class="{
                                'bg-gray-500': !question.value,
                                'bg-primary-800': question.value,
                                '!bg-green-500': question.answer === 'correct',
                                '!bg-red-500': question.answer === 'incorrect',
                                '!bg-yellow-500': question.answer === 'partly correct'
                            }"
                        >
                            {{ i }}
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!finished" class="mt-4">
                <u-button
                    label="Finish"
                    class="w-full"
                    :loading="finishLoading"
                    @click="allCompleted ? finishAttempt() : showAttentionModal = true"
                />
                <p class="mt-1 text-xs text-gray-500">
                    Test will end automatically after the end of time.
                </p>
            </div>

        </div>
    </div>

    <TestAttentionModal
        v-if="showAttentionModal"
        @confirm="finishAttempt"
        @close="showAttentionModal = false"
    />
</template>

<script setup lang="ts">
import { LessonTest, LessonTestAttempt, LessonTestQuestionNoAnswers } from "~/types/lesson";
import AttemptTextQuestion from "~/components/Lesson/Tests/Attempt/Questions/AttemptTextQuestion.vue";
import AttemptSingleQuestion from "~/components/Lesson/Tests/Attempt/Questions/AttemptSingleQuestion.vue";
import TestAttentionModal from "~/components/Lesson/Tests/Modals/TestAttentionModal.vue";

const { $api } = useNuxtApp()
const route = useRoute()

const showAttentionModal = ref(false)
const finished = ref(false)
const attempt = ref<LessonTestAttempt | null>(null)
const test = ref<Omit<LessonTest, "questions" | "attempts"> | null>(null)
const questions = ref<(LessonTestQuestionNoAnswers & {
    value: any | null,
    answer?: 'correct' | 'incorrect' | 'partly correct',
    passed_score: number | null,
    correct_answers?: string | string[]
})[]>([])
const allCompleted = computed(() => {
    return questions.value.every(question => question.value)
})

const remainInterval = ref()
const timeRemain = ref(0)
const recalculateTimeRemain = () => {
    if (attempt.value && test.value) timeRemain.value = (new Date(attempt.value.started_at).getTime() + test.value.time_limit * 1000 * 60 - Date.now()) / 1000
}

const finishedData = computed(() => {
    if (finished && test.value && attempt.value && questions.value) return {
        totalScore: test.value.full_score,
        passedScore: attempt.value.checked.total_score,
        totalIncorrect: attempt.value.answers.reduce((acc, answer) => answer.passed_score === 0 ? acc + 1 : acc, 0),
        totalCorrect: attempt.value.answers.reduce((acc, answer) => answer.passed_score === questions.value.find(question => question.id === answer.question_id)?.score ? acc + 1 : acc, 0)
    }
    return null
})


const saveInterval = ref()
const { loading: saveLoading, addLoading: addSaveLoading, removeLoading: removeSaveLoading } = useLoading()
const saveAttempt = async (finish?: boolean) => {
    if (saveLoading || finish) {
        try {
            addSaveLoading()
            const res = await $api.lesson.SAVE_TEST_ATTEMPT({
                course_id: route.params.course as string,
                lesson_id: route.params.lesson as string,
                test_id: route.params.test as string,
                attempt_id: route.params.attempt as string,
                answers: questions.value.map(question => ({
                    question_id: question.id,
                    value: question.value
                })),
                finish: finish
            })

            if (finish) {
                saveInterval.value
            }
        } catch (err) {
            console.log(err)
        } finally {
            removeSaveLoading()
        }
    }
}

const { loading: finishLoading, addLoading: addFinishLoading, removeLoading: removeFinishLoading } = useLoading()
const finishAttempt = async () => {
    try {
        addFinishLoading()
        await saveAttempt(true)
    } catch (err) {
        console.log(err)
    } finally {
        removeFinishLoading()
    }
}


const { loading, addLoading, removeLoading } = useLoading()
const fetchAttempt = async () => {
    try {
        const res = await $api.lesson.GET_TEST_ATTEMPT({
            course_id: route.params.course as string,
            lesson_id: route.params.lesson as string,
            test_id: route.params.test as string,
            attempt_id: route.params.attempt as string
        })

        attempt.value = res.attempt
        questions.value = res.questions.map(question => {
            const answer = res.attempt.answers.find(answer => answer.question_id === question.id)

            return {
                ...question,
                value: answer?.value || null,
                ...res.attempt.checked.checked_at ? {
                    answer: answer?.passed_score === 0 ? 'incorrect' : answer?.passed_score === question.score ? 'correct' : 'partly correct'
                } : {},
                passed_score: answer?.passed_score === undefined ? null : answer.passed_score,
                ...res.attempt.checked.checked_at ?
                    {
                        correct_answers:
                            question.type === 'text' ?
                                question.options
                                : question.options
                                    .filter((option: any) => option.correct)
                                    .map((option: any) => option.value)
                    }
                    : {}
            }
        })
        test.value = res.test

        if (attempt.value.checked.checked_at) finished.value = true
        else {
            recalculateTimeRemain()
            remainInterval.value = setInterval(() => {
                recalculateTimeRemain()
            }, 1000)

            saveInterval.value = setInterval(saveAttempt, 20000)
        }
    } catch (err) {
        console.log(err)
    } finally {

    }
}


fetchAttempt()

onBeforeUnmount(() => {
    clearInterval(remainInterval.value)
    clearInterval(saveInterval.value)
})

</script>


<style>
@keyframes blink {
    0% {
        text-shadow: 0 0 10px rgba(255, 0, 0, 1);
    }
    50% {
        text-shadow: 0 0 20px rgba(255, 0, 0, 1);
    }
    100% {
        text-shadow: 0 0 10px rgba(255, 0, 0, 0.2);
    }
}

.blinking {
    animation: blink 0.5s infinite;
    color: #ef4444;
    font-weight: 500;
}
</style>