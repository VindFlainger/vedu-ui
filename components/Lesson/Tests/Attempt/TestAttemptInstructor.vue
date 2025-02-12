<template>
    <div class="p-8">
        <template v-if="!loading && attempt">
            <div class="relative flex gap-8" v-if="attempt.checked.checked_at">
                <div
                    class="flex flex-col gap-3"
                >
                    <div
                        v-for="(question, i) in questions"
                        :key="question.id"
                        ref="questionElements"
                        class="relative overflow-hidden flex gap-5 p-4 pt-7 border-2 border-gray-200 rounded-2xl bg-white"
                        :class="{
                            'border-red-500': question.status === 'incorrect',
                            'border-green-500': question.status === 'correct',
                            'border-yellow-500': question.status === 'partly-correct',
                        }"
                    >
                        <div class="w-[110px] shrink-0">
                            <div
                                class="w-8 h-8 flex items-center justify-center border-2 border-primary-900 rounded-lg
                              bg-primary-700 self-start shrink-0 text-white font-medium text-sm"
                                :class="{
                                    '!border-red-500 !bg-red-100 !text-red-500': question.status === 'incorrect',
                                    '!border-green-500 !bg-green-100 !text-green-500': question.status === 'correct',
                                    '!border-yellow-500 !bg-yellow-100 !text-yellow-500': question.status === 'partly-correct',
                                }"
                            >
                                {{ i + 1 }}
                            </div>
                            <div class="mt-2">
                                <p v-if="question.passedScore === null" class="text-[15px]">
                                    <span class="font-medium">Баллы:</span> {{ question.score }}
                                </p>
                                <p v-else class="text-[15px]">
                                    <span class="font-medium">Баллы:</span> {{ question.passedScore }}/{{
                                        question.score
                                    }}
                                </p>
                            </div>
                        </div>
                        <div class="grow">
                            <AttemptTextQuestion
                                v-if="question.type === 'text'"
                                v-model.trim="question.value"
                                :question="question"
                                readonly
                                :number="i + 1"
                                :correct-answers="question.correctAnswers"
                            />
                            <AttemptSingleQuestion
                                v-else-if="question.type === 'single'"
                                v-model="question.value"
                                readonly
                                :question="question"
                                :correct-answers="question.correctAnswers"
                            />
                            <AttemptMultipleQuestion
                                v-else-if="question.type === 'multiple'"
                                v-model="question.value"
                                :question="question"
                                :correct-answers="question.correctAnswers"
                                readonly
                            />
                            <div class="mt-3 flex justify-end">
                                <div v-if="question.editing" class="flex gap-3">
                                    <u-input
                                        type="number"
                                        v-model.number="question.lazyPassedScore"
                                        :min="0"
                                        :max="question.score"
                                        :readonly="saveChangesLoading"
                                        size="xs"
                                    />
                                    <u-button
                                        :disabled="saveChangesLoading"
                                        label="Применить"
                                        size="xs"
                                        @click="handleChangeScore(question.id, question.lazyPassedScore)"
                                    />
                                    <u-button
                                        :disabled="saveChangesLoading"
                                        label="Отмена"
                                        color="red-500"
                                        size="xs"
                                        @click="question.editing = false"
                                    />
                                </div>
                                <u-button
                                    v-else
                                    :left-icon-props="{ solid: true }"
                                    :disabled="saveChangesLoading"
                                    label="Изменить оценку"
                                    size="xs"
                                    left-icon="Pencil"
                                    @click="question.editing = true"
                                />
                            </div>
                        </div>
                        <div
                            class="absolute right-0 top-0 font-medium leading-4 pt-[5px] pb-1.5 px-3 capitalize rounded-bl-2xl text-sm text-white"
                            :class="{
                                'bg-red-500': question.status === 'incorrect',
                                'bg-green-500': question.status === 'correct',
                                'bg-yellow-500': question.status === 'partly-correct',
                            }"
                        >
                            {{ question.statusLabel }}
                        </div>
                    </div>
                </div>
                <div
                    class="sticky top-8 self-start bg-white p-4 rounded-2xl w-full max-w-[370px] border-2 border-dashed border-primary-700">
                    <div>
                        <p class="font-medium text-primary-900 text-lg">Навигация</p>
                        <div>
                            <div class="mt-1 flex gap-1 flex-wrap">
                                <div
                                    v-for="(question, i) in questions"
                                    :key="question.id"
                                    class="relative flex items-center justify-center w-6 h-6 rounded-full font-medium
                                        text-white text-sm select-none cursor-pointer"
                                    :class="{
                                            'bg-gray-500': !question.value,
                                            'bg-primary-800': question.value,
                                            '!bg-green-500': question.status === 'correct',
                                            '!bg-red-500': question.status === 'incorrect',
                                            '!bg-yellow-500': question.status === 'partly-correct',
                                            'pl-1': question.originalScore
                                        }"
                                    @click="goToQuestion(i)"
                                >
                                    {{ i + 1 }}
                                    <span v-if="question.originalScore" class="font-normal">*</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 text-[15px]">
                            <p>
                                <span class="font-medium">Всего правильных ответов:</span> {{ computedStats.totalCorrectQuestions }}
                            </p>
                            <p>
                                <span class="font-medium">Всего неправильных ответов:</span> {{ computedStats.totalIncorrectQuestions }}
                            </p>
                            <p>
                                <span class="font-medium">Всего частично правильных ответов:</span> {{ computedStats.totalPartlyCorrectQuestions }}
                            </p>
                            <p>
                                <span class="font-medium">Всего баллов набрано:</span>
                                {{ computedStats.totalQuestionsAmountChecked }} из {{ computedStats.totalQuestionsAmount }}
                                ({{ ((computedStats.totalQuestionsAmountChecked / computedStats.totalQuestionsAmount) * 100).toFixed(2) }}%)
                            </p>
                        </div>
                        <div class="mt-5">
                            <u-button
                                :disabled="!questions.some(question => question.originalScore !== undefined)"
                                :loading="saveChangesLoading"
                                label="Сохранить изменения"
                                size="xs"
                                @click="saveChanges"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <AttemptNotFinishedState
                v-else
                @force-finished="fetchAttempt"
            />
        </template>
        <div class="w-full flex justify-center" v-else-if="loading">
            <u-loading size="100"/>
        </div>
        <AttemptNotFoundState v-else/>
    </div>
</template>

<script setup lang="ts">
import {
    LessonTest,
    LessonTestAttempt,
    LessonTestAttemptAnswer,
    LessonTestQuestionNoAnswers
} from "~/types/lesson";
import AttemptTextQuestion from "~/components/Lesson/Tests/Attempt/Questions/AttemptTextQuestion.vue";
import AttemptSingleQuestion from "~/components/Lesson/Tests/Attempt/Questions/AttemptSingleQuestion.vue";
import AttemptNotFoundState from "~/components/Lesson/Tests/Attempt/AttemptNotFoundState.vue";
import { GetTestAttemptInstructorData } from "~/api/lesson";
import { attemptQuestionStatuses } from "~/config/attempts/params";

const { $api } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const finished = ref(false)
const attempt = ref<LessonTestAttempt | null>(null)
const test = ref<Omit<LessonTest, "attempts"> | null>(null)

const questionElements = ref<HTMLElement[]>([])
const questions = ref<(LessonTestQuestionNoAnswers & {
    id: string
    value: any | null
    status: string
    passedScore: number
    correctAnswers: string | string[]
    statusLabel: string
    editing?: boolean
    lazyPassedScore: number
    originalScore?: number
})[]>([])

const computedStats = computed(()=> {
    return {
        totalQuestions: questions.value.length,
        totalCorrectQuestions: questions.value.reduce((acc, question) => acc + (question.status === 'correct' ? 1 : 0), 0),
        totalIncorrectQuestions: questions.value.reduce((acc, question) => acc + (question.status === 'incorrect' ? 1 : 0), 0),
        totalPartlyCorrectQuestions: questions.value.reduce((acc, question) => acc + (question.status === 'partly-correct' ? 1 : 0), 0),
        totalQuestionsAmount: questions.value.reduce((acc, question) => acc + question.score, 0),
        totalQuestionsAmountCheckedOriginal: questions.value.reduce((acc, question) => acc + (question.originalScore || question.passedScore), 0),
        totalQuestionsAmountChecked: questions.value.reduce((acc, question) => acc + question.passedScore, 0),
    }
})


const goToQuestion = (index: number) => {
    if (questionElements.value[index]) questionElements.value[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    })
}

const calculateStatus = (score: number, passedScore: number) => {
    const status = passedScore === 0 ? 'incorrect' : passedScore === score ? 'correct' : 'partly-correct'
    return {
        status,
        statusLabel: attemptQuestionStatuses.find(s => status === s.value)?.label as string,
    }
}


const handleChangeScore = (questionId: string, score: number) => {
    const question = questions.value.find(question => question.id === questionId)
    if (question) {
        question.originalScore = question.passedScore
        question.passedScore = score
        const { status, statusLabel } = calculateStatus(question.score, question.passedScore)
        question.status = status
        question.statusLabel = statusLabel
        question.editing = false
    }
}

const { loading: saveChangesLoading, addLoading: addSaveChangesLoading, removeLoading: removeSaveChangesLoading } = useLoading()
const saveChanges = async () => {
    try {
        addSaveChangesLoading()
        await $api.lesson.CHANGE_CHECK_RESULTS_ATTEMPT({
            course_id: route.params.course as string,
            lesson_id: route.params.lesson as string,
            test_id: route.params.test as string,
            attempt_id: route.params.attempt as string,
            answers: questions.value
                .filter(question => question.originalScore)
                .map(question => ({
                    question_id: question.id,
                    passed_score: question.passedScore
                }))
        })

        fetchAttempt()
    } catch (err) {
        console.log(err)
    }
    finally {
        removeSaveChangesLoading()
    }
}

const { loading, addLoading, removeLoading } = useLoading()
const fetchAttempt = async () => {
    try {
        addLoading()

        const res = await $api.lesson.GET_TEST_ATTEMPT({
            course_id: route.params.course as string,
            lesson_id: route.params.lesson as string,
            test_id: route.params.test as string,
            attempt_id: route.params.attempt as string
        }) as GetTestAttemptInstructorData

        attempt.value = res.attempt
        test.value = res.test

        if (res.attempt.checked.checked_at) {
            questions.value = res.test.questions
                .map(question => {
                    const answer = res.attempt.answers.find(answer => answer.question_id === question.id) as LessonTestAttemptAnswer

                    return {
                        ...question,
                        value: answer.value || null,
                        passedScore: answer.passed_score as number,
                        lazyPassedScore: answer.passed_score as number,
                        correctAnswers:
                            question.type === 'text' ?
                                question.options
                                : question.options
                                    .filter((option: any) => option.correct)
                                    .map((option: any) => option.value),
                        ...calculateStatus(question.score, answer.passed_score as number),
                    }
                })
        }
    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}




fetchAttempt()
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