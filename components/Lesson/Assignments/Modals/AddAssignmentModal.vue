<template>
    <u-dialog
        ref="modal"
        :title="edit ? 'Редактировать задание' : 'Добавить задание'"
        icon="Plus"
        max-width="800"
        :freeze="loading"
    >
        <template #default="{ close }">
            <rich-text-editor
                v-model="lazyDescription"
            />
            <ComplexFileUpload
                v-model:loading="loadingFiles"
                v-model:files="lazyFiles"
                multiple
                :readonly="edit"
                class="mt-4"
            />
        </template>
        <template #footer>
            <div class="flex justify-end gap-3">
                <u-button
                    class="font-bold"
                    label="Отмена"
                    :disabled="loading"
                    text
                    color="red-500"
                />
                <u-button
                    :label="edit ? 'Сохранить' : 'Добавить'"
                    :disabled="submitDisabled || loadingFiles"
                    :loading="loading"
                    @click="submit"
                />
            </div>
        </template>
    </u-dialog>
</template>

<script setup lang="ts">
import { AnyFile } from "~/types/global";
import { LessonAssignment } from "~/types/lesson";

const { $api } = useNuxtApp()

export interface Props {
    edit?: boolean
    description?: string
    files?: AnyFile[]
    courseId: string
    lessonId: string,
    assignmentId?: string
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'assignment-added': [v: LessonAssignment]
    'assignment-edited': [v: LessonAssignment]
}>()

const modal = ref<any>(null)

const lazyDescription = ref("")
const lazyFiles = ref<AnyFile[]>([])
const loadingFiles = ref(0)

const submitDisabled = computed(() => {
    return !lazyFiles.value.length || !lazyDescription.value.length
})

const { loading, addLoading, removeLoading } = useLoading()
const submit = async () => {
    try {
        addLoading()
        if (!props.edit) {
            const res = await $api.lesson.ADD_LESSON_ASSIGNMENT({
                description: lazyDescription.value,
                course_id: props.courseId,
                lesson_id: props.lessonId,
                files: lazyFiles.value.map(file => file.id)
            })

            emit('assignment-added', res)
        } else {
            const res = await $api.lesson.EDIT_LESSON_ASSIGNMENT({
                description: lazyDescription.value,
                course_id: props.courseId,
                lesson_id: props.lessonId,
                assignment_id: props.assignmentId as string
            })

            emit('assignment-edited', res)
        }

    } finally {
        removeLoading()
        modal.value.close(null, null, true)
    }
}

if (props.edit){
    lazyDescription.value = props.description || ""
    lazyFiles.value = props.files || []
}

</script>