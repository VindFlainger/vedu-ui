<template>
    <UDialog title="Edit Question" icon="Pencil" ref="dialog">
        <template v-slot:default="{close}">
            <div v-if="question">
                <div>
                    <span class="font-bold">Title:</span> <span class="ml-1">{{ question.title }}</span>
                </div>
                <div class="mt-3">
                    <span class="font-bold">Type:</span> <span class="ml-1 capitalize">{{ question.type }}</span>
                </div>
                <div class="mt-3">
                    <p class="font-bold">Content:</p>
                    <client-only>
                        <QuestionEditor class="mt-2" v-model="lazyContent"/>
                    </client-only>
                    <div class="mt-3">
                        <UProgress
                            :value="lazyContent.length"
                            type="increase"
                            :max="characterLimit"
                            class="w-full h-2"
                        />
                        <p
                            class="text-[13px] mt-1 text-gray-600"
                            :class="{'text-red-500': lazyContent.length > characterLimit}"
                        >
                            This scale displays the allowable payload for the question. The payload includes not only
                            symbols, but also decorations and media. To increase the limit upgrade your plan.
                        </p>
                    </div>
                </div>
                <div class="mt-3">
                    <p class="font-bold ">Tags:</p>
                    <QuestionTags class="mt-2" v-model="lazyTags"/>
                </div>
                <div class="mt-3">
                    <p class="font-bold ">Correct Answers:</p>
                    <QuestionTSM
                        v-if="['text', 'single', 'multiple'].includes(question.type)"
                        class="mt-2"
                        v-model="lazyOptions"
                        :type="question.type as 'text' | 'single' | 'multiple'"
                        :saved-answers="question.options as QuestionMultipleAnswer[] | string[]"
                    />
                    <QuestionOrder
                        v-else-if="question.type === 'order'"
                        class="mt-2"
                        v-model="lazyOptions"
                    />
                </div>
            </div>
        </template>
        <template #footer="{close}">
            <div class="flex gap-4 justify-end">
                <UButton
                    label="Cancel"
                    text
                    text-color="#6b7280"
                    color="#b91c1c"
                    class="!font-light"
                    @click="close()"
                />
                <UButton
                    label="Save"
                    :disabled="lazyContent.length > characterLimit"
                    @click="handleUpdate"
                    :loading="updateLoading"
                />
            </div>
        </template>
    </UDialog>
</template>

<script setup lang="ts">
import { Question, QuestionMultipleAnswer } from "~/models/QuestionModel";
const { $api } = useNuxtApp()

export interface Props {
    question: Question,
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{}>()

const dialog = ref()
const characterLimit = ref(500)

const lazyOptions = ref(props.question.options)
const lazyContent = ref(props.question.content)
const lazyTags = ref(props.question.tags.map(tag => tag.id))

const {
    loading: updateLoading,
    addLoading: addUpdateLoading,
    removeLoading: removeUpdateLoading
} = useLoading()

const handleUpdate = async () => {
    try {
        addUpdateLoading()
        await $api.questions.UPDATE_QUESTION({
            id: props.question.id,
            content: lazyContent.value,
            tags: lazyTags.value,
            options: lazyOptions.value
        })
        dialog.value.close('updated')

    } catch (e) {

    } finally {
        removeUpdateLoading()
    }
}

</script>

<style>
.dot {
    background: radial-gradient(circle, rgba(239, 68, 68, 0.63) 0%, rgba(239, 68, 68, 0.48) 25%, white 80%, white 100%);
    background-clip: padding-box;
}
</style>

