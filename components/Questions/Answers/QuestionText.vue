<template>
    <div class="mt-2">
        <div class="flex gap-3 max-w-md items-center">
            <UInput size="sm" v-model="text" class="grow" maxlenght="256"/>
            <UButton
                class="self-start"
                label="Add"
                size="md"
                :disabled="!text.length"
                :loading="loading"
                @click="handleAdd"
            />
        </div>
        <div class="p-3 min-h-[70px] flex items-center border border-dashed border-gray-300 bg-gray-50 mt-4 rounded-lg">
            <div class="flex  flex-wrap gap-3">
                <div
                    v-for="answer in answers"
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
                        @click="handleDelete(answer)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

export interface Props {
    answers: string[],
    questionId: string,
    loading: boolean
}

const props = withDefaults(defineProps<Props>(), {
    answers: () => []
})

const emit = defineEmits<{
    update: [v: string[]],
}>()

const text = ref('')

const handleAdd = () => {
    emit('update', [...props.answers, text.value])
}

const handleDelete = (answer: string) => {
    emit('update', props.answers.filter(ans => ans !== answer))
}
</script>