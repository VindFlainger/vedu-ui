<template>
    <div class="relative h-full pt-12 py-6 flex flex-col">
        <div class="bg-white p-6 rounded-3xl flex-grow border-2 border-gray-200">
            <div>
                <div class="flex gap-3 text-sm">
                    <p class="font-medium">Сортировать по:</p>
                    <div class="flex gap-3">
                        <button
                            v-for="option in sortOptions"
                            :key="option.value"
                            class="flex gap-1 items-center"
                            @click="handleChangeSort(option.value)"
                        >
                            {{ option.label }}
                            <div class="w-3.5 h-3.5">
                                <u-icon v-if="!selectedSort[option.value]" value="ArrowsUpDown" size="14" stroke-width="2.5" color="primary-900"/>
                                <u-icon v-else-if="selectedSort[option.value] === 1" value="ArrowUp" size="12" stroke-width="3" color="primary-900"/>
                                <u-icon v-else-if="selectedSort[option.value] === -1" value="ArrowDown" size="12" stroke-width="3" color="primary-900"/>
                            </div>
                        </button>
                    </div>
                </div>

            </div>
            <div class="mt-4 flex flex-col gap-3">
                <div
                    v-for="attempt in computedAttempts"
                    :key="attempt.id"
                    class="p-4 border border-gray-200 rounded-2xl"
                >
                    <div class="flex items-center gap-2">
                        <SizedAvatar
                            :avatar="attempt.student.avatar"
                            rounded
                            :size="32"
                            :frame-width="64"
                        />
                        <p class="font-medium">
                            {{ [attempt.student.personal_data.first_name, attempt.student.personal_data.last_name].filter(x => x).join(' ') }}
                        </p>
                    </div>
                    <div class="mt-2 text-[15px] flex flex-col gap-0.5">
                        <p class="flex gap-1 items-center">
                            <u-icon value="Play" size="16" stroke-width="2"/>
                            <span class="font-medium">Статус:</span> {{ attempt.statusLabel }}
                        </p>
                        <p class="flex gap-1 items-center">
                            <u-icon value="Key" size="16" stroke-width="2"/>
                            <span class="font-medium">Секретный ключ:</span> {{ attempt.secret_key }}
                        </p>
                        <p class="flex gap-1 items-center">
                            <u-icon value="Calendar" size="16" stroke-width="2"/>
                            <span class="font-medium">Начат:</span>
                            {{ $luxon.fromISO(attempt.started_at).toFormat($dateFormats.dateTimeFormat) }}
                        </p>
                        <p class="flex gap-1 items-center" v-if="attempt.submitted_at">
                            <u-icon value="CalendarDays" size="16" stroke-width="2"/>
                            <span class="font-medium">Завершен:</span>
                            {{ $luxon.fromISO(attempt.submitted_at).toFormat($dateFormats.dateTimeFormat) }}
                        </p>
                        <p class="flex gap-1 items-center" v-if="attempt.completePercent">
                            <u-icon value="Star" size="16" stroke-width="2"/>
                            <span class="font-medium">Набранные баллы:</span> {{ attempt.checked.total_score }}
                            ({{ attempt.completePercent }}%)
                        </p>
                    </div>
                    <div class="mt-3 flex gap-3 justify-end">
                        <u-button
                            v-if="attempt.status === 'progress'"
                            text
                            color="gray-500"
                            label="Принудительно завершить"
                            @click="selectedAttempt = attempt; showForceFinishAttemptModal = true"
                        />
                        <u-button
                            label="Посмотреть"
                            @click="router.push({
                                name: 'courses-course-lessons-lesson-tests-test-attempts-attempt',
                                params: {
                                    course: route.params.course,
                                    lesson: route.params.lesson,
                                    test: route.params.test,
                                    attempt: attempt.id,
                                }
                            })"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ForceFinishAttemptModal
        v-if="showForceFinishAttemptModal"
        :course-id="route.params.course"
        :lesson-id="route.params.lesson"
        :test-id="route.params.test"
        :attempt-id="(selectedAttempt as LessonTestAttemptFullData).id"
        @action="fetchAttempts"
        @close="showForceFinishAttemptModal = false"
    />
</template>

<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import { LessonTest, LessonTestAttemptFullData } from "~/types/lesson";
import { testStatuses } from "~/config/tests/params";

const { $api, $luxon } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const sortOptions = [
    {
        value: 'status',
        label: 'Статусу'
    },
    {
        value: 'amount',
        label: 'Баллам'
    },
    {
        value: 'started',
        label: 'Времени начала'
    }
]
const selectedSort = ref<Record<string, any>>({
    status: null,
    amount: null,
    started: null
})

const selectedAttempt = ref<Omit<LessonTestAttemptFullData, "answers"> | null>(null)
const showForceFinishAttemptModal = ref(false)

const handleChangeSort = (option: string) => {
    if (!selectedSort.value[option]) selectedSort.value[option] = 1
    else if (selectedSort.value[option] === 1) selectedSort.value[option] = -1
    else if (selectedSort.value[option] === -1) selectedSort.value[option] = null

    fetchAttempts()
}

const attempts = ref<Omit<LessonTestAttemptFullData, "answers">[]>([])
const test = ref<Omit<LessonTest, "attempts"> | null>(null)
const page = useRouteQuery('page', 1, { transform: v => Number(v) })
const perPage = useRouteQuery('per_page', 30, { transform: v => Number(v) })
const total = ref(0)

const fetchAttempts = async () => {
    try {
        const data = await $api.lesson.GET_TEST_STUDENTS_ATTEMPTS({
            course_id: route.params.course as string,
            lesson_id: route.params.lesson as string,
            test_id: route.params.test as string,
            page: page.value,
            per_page: perPage.value,
            sort: selectedSort.value
        })

        total.value = data.meta.total
        attempts.value = data.attempts
        test.value = data.test
    } catch (err) {
        console.log(err)
    }
}

const computedAttempts = computed(() => attempts.value.map(attempt => {
    const status = attempt.checked.checked_at ?
        'completed'
        : $luxon.fromISO(attempt.started_at).plus({ minutes: test?.value?.time_limit }) <= $luxon.now() ?
            'pending'
            : 'progress'
    return {
        ...attempt,
        status,
        statusLabel: testStatuses.find(s => s.value === status)?.label,
        completePercent: (attempt.checked.total_score && test.value) && (((attempt.checked.total_score / test.value.full_score) * 100).toFixed(2))
    }
}))

fetchAttempts()
</script>
