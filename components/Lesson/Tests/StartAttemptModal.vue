<template>
    <u-dialog
        ref="modal"
        icon="Plus"
        hide-header
        max-width="400"
        :freeze="false"
    >
        <div>
            <p class="text-center text-lg font-bold">
                Attempts
            </p>
            <div v-if="fetchLoading" class="mt-5">
                <u-loading size="50"/>
            </div>
            <div v-else class="mt-5">
                <div>
                    <p>
                        Attempts: {{attempts.length}}/{{test.max_attempts}}
                    </p>
                    <p>
                        Max score: {{maxScore}}/{{test.full_score}}
                    </p>
                    <p>
                        Max points: {{((maxScore / test.full_score) * 100).toFixed(2)}}%
                    </p>
                </div>
                <div class="mt-3">
                    <div class="flex flex-col gap-2 h-[300px] overflow-y-auto beauty_scrollbar pr-3 -mr-2">
                        <div
                            v-for="(attempt, i) in computedAttempts"
                            :key="attempt.id"
                            class="p-4 border rounded-lg"
                        >
                            <p class="font-medium">Attempt #{{i+1}}</p>
                            <p>
                                Status:
                                <span>
                                    {{attempt.status}}
                                </span>
                            </p>
                            <p>
                                Started:
                                <span>
                                    {{$luxon.fromISO(attempt.started_at).toFormat($dateFormats.dayFormat)}}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div v-if="test" class="mt-5 flex justify-between">
            <span/>
            <u-button
                label="Start Attempt"
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
const computedAttempts = computed(()=> attempts.value.map(attempt => {
    const status = attempt.checked.checked_at ?
        'completed'
        :  $luxon.fromISO(attempt.started_at).plus({ minutes: test?.value?.time_limit }) <= $luxon.now() ?
            'pending'
            : 'progress'
    return { ...attempt, status }
}))

const maxScore = computed(()=> attempts.value.reduce((acc, attempt)=> (attempt.checked.total_score && attempt.checked.total_score > acc) ? attempt.checked.total_score : acc, 0))

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
