<template>
    <div class="p-4 border border-gray-200 rounded-2xl">
        <div class="flex items-center gap-2">
            <SizedAvatar
                :avatar="response.student.avatar"
                :size="32"
                rounded
            />
            <p class="font-medium">
                {{
                    [response.student.personal_data.first_name, response.student.personal_data.last_name].filter(x => x).join(' ')
                }}
            </p>
        </div>
        <p class="mt-3" v-if="response.text" v-html="response.text"/>
        <div class="mt-3">
            <FilePreview
                v-for="(file, i) in response.files"
                :key="file"
                :name="`File ${i + 1}`"
                :url="file"
                download
            />
        </div>
        <div v-if="!showEvaluate" class="mt-3 flex justify-end">
            <u-button
                :label="evaluated ? 'Показать оценку' : 'Оценить'"
                @click="showEvaluate = true"
            />
        </div>
        <div v-else class="mt-3 p-4 border-2 border-dashed border-gray-300 rounded-2xl">
            <div class=" flex gap-4 items-end">
                <u-select
                    required
                    v-model="status"
                    label="Статус"
                    :options="statusOptions"
                    placeholder=""
                    :disabled="evaluated && !editEvaluate"
                />
                <u-input
                    required
                    v-model="points"
                    label="Баллы"
                    type="number"
                    min="1"
                    max="100"
                    :disabled="evaluated && !editEvaluate"
                />

            </div>
            <div v-if="status === 'rejected'" class="mt-1 ml-0.5">
                <u-checkbox
                    v-model="extraAttempt"
                    :disabled="evaluated && !editEvaluate"
                    label="Еще попытка"
                    class="text-sm"
                />
            </div>
            <div class="mt-3">
                <u-input
                    v-model="message"
                    label="Сообщение"
                    type="textarea"
                    :autosize="{ minRows: 8, maxRows: 12 }"
                    :disabled="evaluated && !editEvaluate"
                />
            </div>
            <div class="mt-5 flex gap-3 items-end">
                <u-button
                    class="mr-0 ml-auto"
                    text
                    label="Отмена"
                    color="red-500"
                    @click="handleCancel"
                />
                <u-button
                    v-if="evaluated && !editEvaluate"
                    label="Изменить"
                    @click="editEvaluate = true"
                />
                <u-button
                    v-else
                    label="Сохранить"
                    :disabled="!status"
                    :loading="loading"
                    @click="resolve"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LessonAssignmentResponse } from "~/types/lesson";

const { $api } = useNuxtApp()

export interface Props {
    courseId: string
    lessonId: string,
    assignmentId: string
    response: LessonAssignmentResponse
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'resolved': [v: LessonAssignmentResponse]
}>()

const statusOptions = [
    {
        label: 'Выполнено',
        value: 'resolved'
    },
    {
        label: 'Отклонено',
        value: 'rejected'
    },
]

const showEvaluate = ref(false)
const editEvaluate = ref(false)
const points = ref(0)
const status = ref('resolved')
const extraAttempt = ref(false)
const message = ref("")

const evaluated = computed(() => {
    return props.response.resolve.status !== 'waiting'
})

const { loading, addLoading, removeLoading } = useLoading()
const resolve = async () => {
    try {
        addLoading()
        const res = await $api.lesson.RESOLVE_LESSON_ASSIGNMENT_RESPONSE({
            course_id: props.courseId,
            lesson_id: props.lessonId,
            assignment_id: props.assignmentId,
            response_id: props.response.id,
            status: status.value,
            message: message.value,
            extra_attempt: extraAttempt.value,
            points: points.value
        })

        editEvaluate.value = false
        showEvaluate.value = false
        emit('resolved', res)
    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}

if (props.response.resolve.status !== 'waiting') {
    points.value = props.response.resolve.points
    status.value = props.response.resolve.status
    message.value = props.response.resolve.message
    extraAttempt.value = props.response.resolve.extra_attempt
}

const handleCancel = () => {
    points.value = props.response.resolve.points
    status.value = props.response.resolve.status
    message.value = props.response.resolve.message
    extraAttempt.value = props.response.resolve.extra_attempt
    editEvaluate.value = false
    showEvaluate.value = false
}




</script>