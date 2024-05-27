<template>
    <u-dialog
        ref="modal"
        max-width="416"
        title="Принудительное завершение"
        :freeze="loading"
    >
        <u-input
            v-model="reason"
            label="Причина"
            type="textarea"
            placeholder="Опишите причину принудительного завершения попытки выполнения теста студентом"
            :autosize="{ minRows: 8, maxRows: 12 }"
        />
        <u-checkbox
            v-model="zero"
            class="mt-4 text-sm"
            label="Применить нулевую оценку"
        />
        <template #footer>
            <div class="flex gap-3 justify-end">
                <u-button
                    class="font-bold"
                    font-weight="600"
                    label="Отмена"
                    :disabled="loading"
                    text
                    color="red-500"
                />
                <u-button
                    label="Завершить"
                    :disabled="loading"
                    :loading="loading"
                    @click="submit"
                />
            </div>
        </template>
    </u-dialog>
</template>

<script setup lang="ts">
import { LessonTestAttempt } from "~/types/lesson";

const { $api } = useNuxtApp()

export interface Props {
    courseId: string
    lessonId: string
    testId: string
    attemptId: string
}
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'action': [v: LessonTestAttempt]
}>()

const modal = ref<any>(null)
const reason = ref("")
const zero = ref(false)



const { loading, removeLoading, addLoading } = useLoading()
const submit = async () => {
    try {
        const data = await $api.lesson.FORCE_FINISH_TEST_ATTEMPT({
            course_id: props.courseId,
            lesson_id: props.lessonId,
            test_id: props.testId,
            attempt_id: props.attemptId,
            force_zero: zero.value,
            reason: reason.value
        })

        modal.value.close()

        emit('action', data)

    } catch (err) {
        console.log(err)
    }
}
</script>
