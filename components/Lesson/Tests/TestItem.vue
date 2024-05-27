<template>
    <div class="rounded-2xl border border-gray-200 p-4 outline outline-1 outline-offset-2 outline-gray-200">
        <p class="font-bold text-primary-900 text-lg">{{ test.title }}</p>
        <div class="mt-1 flex flex-col gap-1" v-if="isInstructor">
            <div class="flex items-center gap-2">
                <u-icon value="Newspaper" size="20" stroke-width="2"/>
                <p class="font-medium flex gap-0.5 items-center leading-4">
                    Формат отчета
                    <u-tooltip placement="top" offset="7" max-width="350">
                        <u-icon solid value="QuestionMarkCircle" size="16" color="primary-900"/>
                        <template #content>
                            Вид отчета после завершения попытки выполнения теста:
                            <ul>
                                <li class="ml-3 list-disc">Полный - отображение баллов за весь тест, баллов по каждому вопросу и правильных ответов.</li>
                                <li class="ml-3 list-disc">Баллы по вопросам - отображение баллов за весь тест и баллов по каждому вопросу.</li>
                                <li class="ml-3 list-disc">Общий балл - отображение баллов за весь тест.</li>
                                <li class="ml-3 list-disc">Без отчета - подтверждение завершения теста, без отображения результатов.</li>
                            </ul>
                        </template>
                    </u-tooltip>
                    :
                </p>
                {{ computedReportType }}
            </div>
            <p class="flex items-center gap-2">
                <u-icon value="ChartBar" stroke-width="2" size="20"/>
                <p class="font-medium flex gap-0.5 items-center leading-4">
                    Способ оценивания
                    <u-tooltip placement="top" offset="7" max-width="370">
                        <u-icon solid value="QuestionMarkCircle" size="16" color="primary-900"/>
                        <template #content>
                            Способ оценивания теста:
                            <ul>
                                <li class="ml-3 list-disc">Лучшая попытка - оценка теста по попытке с наибольшим количеством баллов.</li>
                                <li class="ml-3 list-disc">Последняя попытка - оценка теста по последеней попытке.</li>
                            </ul>
                        </template>
                    </u-tooltip>
                    :
                </p>
                {{ computedScoreMode }}
            </p>
            <p class="flex items-center gap-2">
                <u-icon value="ArrowPath" stroke-width="2" size="20"/>
                <span class="font-medium">Всего попыток:</span> {{ test.max_attempts }}
            </p>
            <p class="flex items-center gap-2">
                <u-icon value="Star" stroke-width="2" size="20"/>
                <span class="font-medium">Максимальный балл:</span> {{ test.full_score }}
            </p>
            <p class="flex items-center gap-2">
                <u-icon value="CircleStack" stroke-width="2" size="20"/>
                <span class="font-medium">Количество вопросов:</span> {{ test.questions.length }}
            </p>
            <p v-if="test.start" class="flex items-center gap-2">
                <u-icon value="Calendar" stroke-width="2" size="20"/>
                <span class="font-medium">Начало:</span> {{ $luxon.fromISO(test.start).toFormat('LLL d, yyyy') }}
            </p>
            <p v-if="test.end" class="flex items-center gap-2">
                <u-icon value="CalendarDays" stroke-width="2" size="20"/>
                <span class="font-medium">Завершение:</span> {{ $luxon.fromISO(test.end).toFormat('LLL d, yyyy') }}
            </p>
            <div class="mt-3 flex justify-between">
                <span></span>
                <u-button
                    label="Увидеть попытки"
                    @click="router.push({
                        name: 'courses-course-lessons-lesson-tests-test-attempts',
                        params: {
                            course: route.params.course,
                            lesson: route.params.lesson,
                            test: test.id
                        }
                    })"
                />
            </div>
        </div>
        <div v-else class="mt-1 flex flex-col gap-1">
            <div class="flex items-center gap-2">
                <u-icon value="Newspaper" size="20" stroke-width="2"/>
                <p class="font-medium flex gap-0.5 items-center leading-4">
                    Формат отчета
                    <u-tooltip placement="top" offset="7" max-width="350">
                        <u-icon solid value="QuestionMarkCircle" size="16" color="primary-900"/>
                        <template #content>
                            Вид отчета после завершения попытки выполнения теста:
                            <ul>
                                <li class="ml-3 list-disc">Полный - отображение баллов за весь тест, баллов по каждому вопросу и правильных ответов.</li>
                                <li class="ml-3 list-disc">Баллы по вопросам - отображение баллов за весь тест и баллов по каждому вопросу.</li>
                                <li class="ml-3 list-disc">Общий балл - отображение баллов за весь тест.</li>
                                <li class="ml-3 list-disc">Без отчета - подтверждение завершения теста, без отображения результатов.</li>
                            </ul>
                        </template>
                    </u-tooltip>
                    :
                </p>
                {{ computedReportType }}
            </div>
            <p class="flex items-center gap-2">
                <u-icon value="ChartBar" stroke-width="2" size="20"/>
                <p class="font-medium flex gap-0.5 items-center leading-4">
                    Способ оценивания
                    <u-tooltip placement="top" offset="7" max-width="370">
                        <u-icon solid value="QuestionMarkCircle" size="16" color="primary-900"/>
                        <template #content>
                            Способ оценивания теста:
                            <ul>
                                <li class="ml-3 list-disc">Лучшая попытка - оценка теста по попытке с наибольшим количеством баллов.</li>
                                <li class="ml-3 list-disc">Последняя попытка - оценка теста по последеней попытке.</li>
                            </ul>
                        </template>
                    </u-tooltip>
                    :
                </p>
                {{ computedScoreMode }}
            </p>
            <p class="flex items-center gap-2">
                <u-icon value="ArrowPath" stroke-width="2" size="20"/>
                <span class="font-medium">Всего попыток:</span> {{ test.max_attempts }}
            </p>
            <p class="flex items-center gap-2">
                <u-icon value="Star" stroke-width="2" size="20"/>
                <span class="font-medium">Максимальный балл:</span> {{ test.full_score }}
            </p>
            <p class="flex items-center gap-2">
                <u-icon value="CircleStack" stroke-width="2" size="20"/>
                <span class="font-medium">Количество вопросов:</span> {{ test.questions.length }}
            </p>
            <p v-if="test.start" class="flex items-center gap-2">
                <u-icon value="Calendar" stroke-width="2" size="20"/>
                <span class="font-medium">Начало:</span> {{ $luxon.fromISO(test.start).toFormat('LLL d, yyyy') }}
            </p>
            <p v-if="test.end" class="flex items-center gap-2">
                <u-icon value="CalendarDays" stroke-width="2" size="20"/>
                <span class="font-medium">Завершение:</span> {{ $luxon.fromISO(test.end).toFormat('LLL d, yyyy') }}
            </p>
            <div class="mt-3 flex justify-between">
                <span></span>
                <u-button
                    label="Открыть"
                    @click="showStartAttemptModal = true"
                />
            </div>
        </div>
        <StartAttemptModal
            v-if="showStartAttemptModal"
            :course-id="route.params.course"
            :lesson-id="route.params.lesson"
            :test-id="test.id"
            @close="showStartAttemptModal = false"
        />
    </div>
</template>

<script setup lang="ts">
import { LessonTest } from '~/types/lesson'
import StartAttemptModal from "~/components/Lesson/Tests/Modals/StartAttemptModal.vue";
import { reportTypes, scoreTypes } from "~/config/tests/params";
import SeeAttemptsModal from "~/components/Lesson/Tests/Modals/SeeAttemptsModal.vue";

const route = useRoute()
const router = useRouter()

export interface Props {
    test: LessonTest,
}

const props = withDefaults(defineProps<Props>(), {})

const accountStore = useAccountStore()
const { isInstructor } = storeToRefs(accountStore)

const showStartAttemptModal = ref(false)

const computedScoreMode = computed(()=> scoreTypes.find(type => type.value === props.test.score_mode)?.label)
const computedReportType = computed(()=> reportTypes.find(type => type.value === props.test.report)?.label)

</script>

