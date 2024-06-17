<template>
    <u-dialog
        ref="modal"
        title="Ответы на задание"
        icon="Plus"
        max-width="800"
    >
        <div v-if="!loading && (waitingResponses.length || closedResponses.length)">
            <p class="font-bold text-gray-900 text-lg">
                Ожидают
            </p>
            <div v-if="waitingResponses.length">
                <div class="mt-2">
                    <AssignmentResponse
                        v-for="response in waitingResponses"
                        :key="response.id"
                        :response="response"
                        :course-id="courseId"
                        :lesson-id="lessonId"
                        :assignment-id="assignmentId"
                        @resolved="handleResolved"
                    />
                </div>
            </div>
            <div v-else class="mt-5 flex flex-col items-center justify-center">
                <u-icon value="PuzzlePiece" solid size="40" color="primary-900"/>
                <p class="text-primary-900 font-medium">
                    Тут пока ничего нету
                </p>
            </div>


            <div class="mt-5">
                <p class="font-bold text-gray-900 text-lg">
                    Просмотренные
                </p>
                <div v-if="closedResponses.length" class="mt-2">
                    <AssignmentResponse
                        v-for="response in closedResponses"
                        :key="response.id"
                        :response="response"
                        :course-id="courseId"
                        :lesson-id="lessonId"
                        :assignment-id="assignmentId"
                        @resolved="handleResolved"
                    />
                </div>
                <div v-else class="mt-5 flex flex-col items-center justify-center">
                    <u-icon value="PuzzlePiece" solid size="40" color="primary-900"/>
                    <p class="text-primary-900 font-medium">
                        Тут пока ничего нету
                    </p>
                </div>
            </div>
        </div>
        <div v-else-if="!loading" class="mt-5 flex flex-col items-center justify-center">
            <u-icon value="PuzzlePiece" solid size="80" color="primary-900"/>
            <p class="text-primary-900 font-medium">
                Тут пока ничего нету
            </p>
            <div class="flex justify-center">
                <p class="mt-3 text-gray-500 text-sm text-center max-w-[370px]">
                    Студенты еще не добавили свои ответы на задания. Вы можете напомнить студентам об этом задании оставив комментарий к курсу или уведомление.
                </p>
            </div>
        </div>
        <AssignmentResponsesEmpty v-else/>
    </u-dialog>
</template>

<script setup lang="ts">

import { LessonAssignmentResponse } from "~/types/lesson";
import AssignmentResponsesEmpty from "~/components/Lesson/Assignments/AssignmentResponsesEmpty.vue";

const { $api } = useNuxtApp()

export interface Props {
    courseId: string
    lessonId: string,
    assignmentId: string,
    response?: LessonAssignmentResponse
}

const props = withDefaults(defineProps<Props>(), {})


const responses = ref<LessonAssignmentResponse[]>([])
const waitingResponses = computed(() => {
    return responses.value.filter(response => response.resolve.status === 'waiting')
})
const closedResponses = computed(() => {
    return responses.value.filter(response => response.resolve.status !== 'waiting')
})

const handleResolved = (response: LessonAssignmentResponse) => {
    responses.value = responses.value.map(v => v.id === response.id ? { ...v, resolve: response.resolve } : v)
}


const { loading, addLoading, removeLoading } = useLoading()
const fetch = async () => {
    try {
        addLoading()
        const res = await $api.lesson.GET_LESSON_ASSIGNMENT_RESPONSES({
            course_id: props.courseId,
            lesson_id: props.lessonId,
            assignment_id: props.assignmentId,
        })

        if (res) responses.value = res

    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}

fetch()
</script>
