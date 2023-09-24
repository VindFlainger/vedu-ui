<template>
    <div class="flex flex-col p-3 rounded-lg border border-gray-300" v-bind="$attrs">
        <p class="font-bold text-lg"> {{ question.title }} </p>
        <div>
            <div class="mt-3 text-sm">
                <span class="font-bold">Type:</span>
                <p class="capitalize">{{ question.type }}</p>
            </div>
            <div class="mt-3 text-sm">
                <span class="font-bold">Content:</span>
                <client-only>
                    <p class="line-clamp-3 question-content h-[60px]" v-html="question.content"></p>
                </client-only>
            </div>
            <div class="text-sm mt-3 select-none">
                <span class="font-bold">Tags:</span>
                <div class="flex flex-wrap question-tags gap-[6px] mt-1 pb-1">
                    <p
                        v-for="tag in question.tags"
                        :key="tag"
                        class="px-2 py-[2px] text-[11px] leading-3 border border-gray-600 rounded-md font-medium text-gray-600"
                    >
                        {{ tag }}
                    </p>
                </div>
            </div>
        </div>
        <div class="flex mt-auto mb-0 items-center justify-between pt-6">
            <UButton label="Edit" size="sm" :font-size="14" class="text-sm" @click="emit('edit')"/>
            <UIcon value="Trash" color="red-500" size="22" tag="button"/>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    inheritAttrs: false
})

export interface Props {
    question: {
        id: string,
        title: string,
        type: string,
        content: string,
        tags: string[]
    }
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'edit': []
}>()

</script>

<style scoped lang="scss">
.question-content :deep(img) {
    display: none;
}

.question-tags::-webkit-scrollbar {
    @apply h-[3px] bg-gray-100 rounded-full
}

.question-tags::-webkit-scrollbar-thumb {
    @apply h-[3px] bg-gray-200 rounded-full
}
</style>