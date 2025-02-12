<template>
    <u-dialog
        ref="modal"
        icon="Plus"
        hide-header
        max-width="500"
        :freeze="false"
    >
        <div>
            <p class="text-center text-lg font-bold">
                Ваши попытки
            </p>
            <div v-if="fetchLoading" class="mt-5">
                <u-loading size="50"/>
            </div>
            <div v-else-if="test" class="mt-5">
                <div>
                    <p>
                        <span class="font-medium">Попытки:</span> {{ attempts.length }}/{{ test.max_attempts }}
                    </p>
                    <p>
                        <span class="font-medium">Текущие баллы:</span> {{ maxScore }}/{{ test.full_score }}
                    </p>
                    <p>
                        <span class="font-medium">Процент правильности:</span>
                        {{ ((maxScore / test.full_score) * 100).toFixed(2) }}%
                    </p>
                </div>
                <div class="mt-3">
                    <div class="flex flex-col gap-2 h-[300px] overflow-y-auto beauty_scrollbar pr-3 -mr-2">
                        <div
                            v-for="(attempt, i) in computedAttempts"
                            :key="attempt.id"
                            class="p-4 border rounded-lg"
                        >
                            <p class="font-medium">Попытка #{{ i + 1 }}</p>
                            <p>
                                Статус:
                                <span>
                                    {{ attempt.statusLabel }}
                                </span>
                            </p>
                            <p>
                                Дата начала:
                                <span>
                                    {{ $luxon.fromISO(attempt.started_at).toFormat($dateFormats.dayFormat) }}
                                </span>
                            </p>
                            <div v-if="attempt.status === 'progress'" class="mt-1 flex justify-end">
                                <u-button
                                    label="Продолжить"
                                    @click="router.push({
                                        name: 'courses-course-lessons-lesson-tests-test-attempts-attempt',
                                        params: {
                                            course: route.params.course,
                                            lesson: route.params.lesson,
                                            test: test.id,
                                            attempt: attempt.id
                                        }
                                    })"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div v-if="test" class="mt-5 flex justify-between">
            <span/>
            <u-button
                label="Начать попытку"
                :disabled="attempts.length > test.max_attempts"
                @click="startAttempt"
            />
        </div>
    </u-dialog>
</template>

<script setup lang="ts">
import { LessonTest, LessonTestAttempt } from "~/types/lesson";

const { $api, $luxon, $dateFormats } = useNuxtApp()
const router = useRouter()
const route = useRoute()
import { testStatuses } from "~/config/tests/params";

export interface Props {
    courseId: string
    lessonId: string
    testId: string
}

const props = withDefaults(defineProps<Props>(), {})


const { loading, addLoading, removeLoading } = useLoading()
const startAttempt = async () => {
    try {
        addLoading()
        const { attempt } = await $api.lesson.START_TEST_ATTEMPT({
            course_id: props.courseId,
            lesson_id: props.lessonId,
            test_id: props.testId
        })

        router.push({
            name: 'courses-course-lessons-lesson-tests-test-attempts-attempt',
            params: {
                course: props.courseId,
                lesson: props.lessonId,
                test: props.testId,
                attempt: attempt.id
            }
        })
    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}

const test = ref<Omit<LessonTest, "questions" | "attempts"> | null>(null)
const attempts = ref<Omit<LessonTestAttempt, 'answers'>[]>([])
const computedAttempts = computed(() => attempts.value.map(attempt => {
    const status = attempt.checked.checked_at ?
        'completed'
        : $luxon.fromISO(attempt.started_at).plus({ minutes: test?.value?.time_limit }) <= $luxon.now() ?
            'pending'
            : 'progress'
    return { ...attempt, status, statusLabel: testStatuses.find(s => s.value === status)?.label }
}))

const maxScore = computed(() => attempts.value.reduce((acc, attempt) => (attempt.checked.total_score && attempt.checked.total_score > acc) ? attempt.checked.total_score : acc, 0))

const { loading: fetchLoading, addLoading: addFetchLoading, removeLoading: removeFetchLoading } = useLoading()
const fetchAttempts = async () => {
    try {
        addFetchLoading()
        const res = await $api.lesson.GET_TEST_ATTEMPTS({
            course_id: props.courseId,
            lesson_id: props.lessonId,
            test_id: props.testId,
        })

        test.value = res.test
        attempts.value = res.attempts
    } catch (err) {
        console.log(err)
    } finally {
        removeFetchLoading()
    }
}

fetchAttempts()
</script>
