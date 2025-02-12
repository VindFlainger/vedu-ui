<template>
    <u-dialog
        ref="modal"
        :title="response ? 'Просмотр результата' : 'Добавить ответ'"
        icon="Plus"
        max-width="500"
        :freeze="loading"
    >
        <div v-if="response">
            <div>
                <div v-if="response.resolve.status !== 'waiting'">
                    <p class="font-bold">Статус</p>
                    <p class="text-[15px]">
                        <span class="font-medium">Оценка:</span> {{ response.resolve.points }} %
                    </p>
                    <p class="text-[15px]">
                        <span class="font-medium">Статус:</span> {{ response.resolve.status === 'resolved' ? 'Ответ защитан' : 'Ответ не защитан' }}
                    </p>
                </div>
                <div v-else class="font-medium">
                    <p class="font-bold">Статус</p>
                    <p class="font-bold text-primary-900 text-[15px]">Задание еще не проверено</p>
                </div>



                <div class="mt-3">
                    <p class="font-bold">Добавлен</p>
                    <p>
                        {{ $luxon.fromISO(response.created_at).toFormat($dateFormats.dayFormat) }}
                    </p>
                </div>

                <div class="mt-3" v-if="response.text">
                    <p class="font-bold">Сообщение</p>
                    <p>
                        {{response.text}}
                    </p>
                </div>

                <div class="mt-3">
                    <p class="font-bold">Файлы</p>
                    <div class="mt-2 flex gap-2">
                        <FilePreview
                            v-for="(file, i) in response.files"
                            :key="file"
                            :url="file"
                            :name="`File ${i}`"
                        />
                    </div>
                </div>

            </div>
        </div>
        <div v-else>
            <ComplexFileUpload
                class="mt-4"
                v-model:loading="loadingFiles"
                v-model:files="lazyFiles"
                multiple
            />
            <u-input
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 12 }"
                v-model="text"
                label="Сообщение"
            />
        </div>
        <template #footer="{close}" v-if="!response">
            <div class="flex justify-end gap-3">
                <u-button
                    class="font-bold"
                    font-weight="600"
                    label="Отмена"
                    :disabled="loading"
                    text
                    color="red-500"
                    @click="close"
                />
                <u-button
                    label="Сохранить"
                    :loading="loading"
                    :disabled="submitDisabled"
                    @click="submit"
                />
            </div>
        </template>
    </u-dialog>
</template>

<script setup lang="ts">
import { AnyFile } from "~/types/global";
import { LessonAssignmentResponse } from "~/types/lesson";

const { $api } = useNuxtApp()

export interface Props {
    courseId: string
    lessonId: string
    assignmentId: string
    response?: LessonAssignmentResponse
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'added': []
}>()

const lazyFiles = ref<AnyFile[]>([])
const loadingFiles = ref(0)
const text = ref("")
const modal = ref<any>(null)

const submitDisabled = computed(() => {
    return !lazyFiles.value.length
})

const { loading, addLoading, removeLoading } = useLoading()
const submit = async () => {
    try {
        addLoading()
        const res =  await $api.lesson.ADD_ASSIGNMENT_RESPONSE({
            course_id: props.courseId,
            lesson_id: props.lessonId,
            assignment_id: props.assignmentId,
            files: lazyFiles.value.map(file => file.id),
            text: text.value
        })
        emit('added')
        modal.value.close(null, null, true)
    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}
</script>
