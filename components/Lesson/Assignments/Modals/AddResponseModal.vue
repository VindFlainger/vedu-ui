<template>
    <u-dialog
        ref="modal"
        title="Add Response"
        icon="Plus"
        max-width="500"
        :freeze="loading"
    >
        <div v-if="response">
            <div>
                <div>
                    <p class="font-bold">Added</p>
                    <p>
                        {{ $luxon.fromISO(response.created_at).toFormat($dateFormats.dayFormat) }}
                    </p>
                </div>

                <div class="mt-3">
                    <p class="font-bold">Text</p>
                    <p>
                        {{response.text}}
                    </p>
                </div>

                <div v-if="response.resolve.status !== 'waiting'" class="mt-4">
                    <p class="font-bold">Resolved</p>
                    <p class="text-[15px]">
                        <span class="font-medium">Points:</span> {{ response.resolve.points }}
                    </p>
                    <p class="capitalize text-[15px]">
                        <span class="font-medium">Status:</span> {{ response.resolve.status }}
                    </p>
                </div>

                <div class="mt-3">
                    <p class="font-bold">Files</p>
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
                v-model.trim="text"
                label="Text"
            />
        </div>
        <template #footer="{close}">
            <div class="flex justify-between">
                <u-button
                    label="Save"
                    :loading="loading"
                    :disabled="submitDisabled"
                    @click="submit"
                />
                <u-button
                    class="font-bold"
                    font-weight="600"
                    label="Cancel"
                    :disabled="loading"
                    text
                    color="red-500"
                    @click="close"
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
        modal.value.close(null, null, true)
    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}
</script>
