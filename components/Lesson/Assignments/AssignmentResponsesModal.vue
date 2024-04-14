<template>
    <u-dialog
        ref="modal"
        title="Assignment Responses"
        icon="Plus"
        max-width="800"
    >
        <div>
            <div>
                <p class="font-bold text-gray-900 text-lg">
                    Relevant
                </p>
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


            <div class="mt-5">
                <p class="font-bold text-gray-900 text-lg">
                    Viewed
                </p>
                <div class="mt-2">
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
            </div>

        </div>
    </u-dialog>
</template>

<script setup lang="ts">

import { LessonAssignmentResponse } from "~/types/lesson";

const { $api } = useNuxtApp()

export interface Props {
    courseId: string
    lessonId: string,
    assignmentId: string
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

const fetch = async () => {
    try {
        const res = await $api.lesson.GET_LESSON_ASSIGNMENT_RESPONSES({
            course_id: props.courseId,
            lesson_id: props.lessonId,
            assignment_id: props.assignmentId,
        })

        if (res) responses.value = res

    } catch (err) {
        console.log(err)
    } finally {

    }
}

fetch()
</script>
