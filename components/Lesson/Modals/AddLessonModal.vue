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
                v-model:files="files"
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
                    :disabled="loading || submitDisabled"
                    :loading="loading"
                    label="Save"
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
    'action': []
}>()

const modal = ref<any>()

const name = ref("")
const content = ref("")
const files = ref<AnyFile[]>([])
const loadingFiles = ref(0)

const submitDisabled = computed(()=> {
    return !name.value || !content.value || !files.value[0]
})

const { loading, addLoading, removeLoading } = useLoading()
const submit = async () => {
    try {
        addLoading()
        const lesson = await $api.lesson.CREATE_LESSON({
            course_id: props.courseId,
            content: content.value,
            name: name.value,
            image: files.value?.[0]?.id as any
        })

        emit('action')
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
    files.value
}


</script>
