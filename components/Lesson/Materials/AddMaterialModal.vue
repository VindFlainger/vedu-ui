<template>
    <u-dialog
        ref="modal"
        :title="edit ? 'Редактировать материал' : 'Добавить материал'"
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
                v-model:files="files"
                :readonly="edit"
                class="mt-4"
            />
        </template>
        <template #footer>
            <div class="flex justify-end gap-3">
                <u-button
                    class="font-bold"
                    font-weight="600"
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
import { LessonMaterial } from "~/types/lesson";

const { $api } = useNuxtApp()

export interface Props {
    edit?: boolean
    description?: string
    file?: AnyFile
    courseId: string
    lessonId: string,
    materialId?: string
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'material-added': [v: LessonMaterial]
    'material-edited': [v: LessonMaterial]
}>()

const modal = ref<any>(null)

const lazyDescription = ref("")
const files = ref<AnyFile[]>([])
const loadingFiles = ref(0)

const submitDisabled = computed(() => {
    return !files.value.length || !lazyDescription.value.length
})

const { loading, addLoading, removeLoading } = useLoading()
const submit = async () => {
    try {
        addLoading()
        if (!props.edit) {
            const res = await $api.lesson.ADD_LESSON_MATERIAL({
                description: lazyDescription.value,
                course_id: props.courseId,
                lesson_id: props.lessonId,
                file_id: files.value[0].id
            })

            emit('material-added', res)
        } else {
            const res = await $api.lesson.EDIT_LESSON_MATERIAL({
                description: lazyDescription.value,
                course_id: props.courseId,
                lesson_id: props.lessonId,
                material_id: props.materialId as string
            })

            emit('material-edited', res)
        }

    } finally {
        removeLoading()
        modal.value.close(null, null, true)
    }
}

if (props.edit){
    lazyDescription.value = props.description || ""
    files.value = props.file ? [props.file] : []
}

</script>