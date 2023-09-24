<template>
    <UModal title="Edit Question" icon="Pencil">
        <div v-if="question">
            <div>
                <span class="font-bold">Title:</span>
                <span class="ml-1">{{ question.title }}</span>
            </div>
            <div class="mt-3">
                <span class="font-bold">Type:</span>
                <span class="ml-1 capitalize">{{ question.type }}</span>
            </div>
            <div class="mt-3">
                <p class="font-bold">Content:</p>
                <client-only>
                    <QuestionEditor class="mt-2"/>
                </client-only>
            </div>
            <div class="mt-3">
                <p class="font-bold ">Correct Answers:</p>
                <div v-if="question.type === 'text'" class="mt-2">
                    <div class="flex gap-3 max-w-md items-center">
                        <UInput size="sm" v-model="text" class="grow" maxlenght="256"/>
                        <UButton
                            class="self-start"
                            label="Add"
                            size="md"
                            :disabled="!text.length"
                            :loading="addTagLoading"
                            @click="handleAdd"
                        />
                    </div>
                    <div
                        class="p-3 min-h-[70px] flex items-center border border-dashed border-gray-300 bg-gray-50 mt-4 rounded-lg">
                        <div class="flex  flex-wrap gap-3">
                            <div
                                v-for="answer in question.answers"
                                :key="answer"
                                class="flex items-center pl-2 pr-1 border-2 border-primary-900 font-medium text-primary-900 rounded-lg text-[15px]"
                            >
                                <span>{{ answer }}</span>
                                <UIcon
                                   value="XMark"
                                   class="relative inline-block ml-[2px] dot [&:not(:hover)]:!bg-none hover:[&_svg]:!text-red-500 rounded-full"
                                   size="16"
                                   color="primary-900"
                                   tag="button"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </UModal>
</template>

<script setup lang="ts">


const { $api } = useNuxtApp()


export interface Props {
    question?: {
        title: string,
        type: string,
        content: string,
        tags: string[],
        answers: string[]
    }
}

const props = withDefaults(defineProps<Props>(), {})

const text = ref('')

const addTagLoading = ref(false)
const handleAdd = async () => {
    const data = await $api.Questions.ADD_TAG(undefined, {cancelPrevious: true})
    addTagLoading.value = false
}

</script>

<style>
.dot {
    background: radial-gradient(circle, rgba(239, 68, 68, 0.63) 0%, rgba(239, 68, 68, 0.48) 25%, white 80%, white 100%);
    background-clip: padding-box;
}
</style>

