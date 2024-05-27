<template>
    <u-dialog
        ref="modal"
        title="Add Lesson"
        icon="Plus"
        max-width="560"
    >
        <div class="flex flex-col gap-5">
            <u-input
                v-model="name"
                label="Name"
            />
            <div>
                <u-label
                    label="Content"
                    text-color="gray-900"
                    class="!text-[15px]"
                />
                <rich-text-editor
                    v-model="content"
                    class="mt-1"
                    height="200"
                />
            </div>
            <drag-drop-file-upload
                v-model:loading="loadingFiles"
                v-model="image"
                :preview-value="imagePreview"
                @preview-removed="imagePreview = null"
                relation="lesson-cover"
                class="mt-"
            />
        </div>
        <template #footer="{close}">
            <div class="flex justify-between">
                <u-button
                    class="font-bold"
                    font-weight="600"
                    label="Cancel"
                    text
                    color="red-500"
                    @click="close"
                    :disabled="loading"
                />
                <u-button
                    :disabled="submitDisabled"
                    :loading="loading"
                    :label="lesson ? 'Save' : 'Add'"
                    @click="submit"
                />
            </div>
        </template>
    </u-dialog>
</template>

<script setup lang="ts">
import { LessonPreview } from "~/types/lesson";

const { $api } = useNuxtApp()
import { AnyFile } from "~/types/global";
export interface Props {
    courseId: string,
    lesson: LessonPreview
}

const props = withDefaults(defineProps<Props>(), {

})

const emit = defineEmits<{
    'added': []
    'edited': []
}>()

const modal = ref<any>()

const name = ref("")
const content = ref("")
const image = ref<AnyFile>()
const imagePreview = ref<string | null>(null)
const loadingFiles = ref(0)

const submitDisabled = computed(()=> {
    return !name.value
        || !content.value
        || (!image.value && !imagePreview.value)
        || (props.lesson && props.lesson.name === name.value && props.lesson.content === content.value && !image.value)
})

const { loading, addLoading, removeLoading } = useLoading()
const submit = async () => {
    try {
        addLoading()
        if (!props.lesson) {
            await $api.lesson.CREATE_LESSON({
                course_id: props.courseId,
                content: content.value,
                name: name.value,
                image: (image.value as AnyFile).id
            })
            emit('added')
        }
        else {
            await $api.lesson.EDIT_LESSON({
                course_id: props.courseId,
                lesson_id: props.lesson.id,
                content: content.value,
                name: name.value,
                image: image.value?.id
            })
            emit('edited')
        }

        modal.value.close()
    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}

if (props.lesson) {
    name.value = props.lesson.name
    content.value = props.lesson.content
    if (props.lesson.image) imagePreview.value = props.lesson.image
}


</script>
