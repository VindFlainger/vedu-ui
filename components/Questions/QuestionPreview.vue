<template>
    <div class="relative question-bg flex flex-col p-3 rounded-lg border border-gray-300" v-bind="$attrs">
        <p class="font-bold text-lg text-primary-900"> {{ question.title }} </p>
        <div>
            <div class="mt-3 text-sm">
                <p class="capitalize">
                    <span class="font-bold">Type:</span>
                    {{ question.type }}
                </p>
            </div>
            <div class="mt-3 text-sm">
                <p class="capitalize">
                    <span class="font-bold">Created:</span>
                    {{ $luxon.fromISO(question.createdAt).toFormat($dateFormats.dayFormat) }}
                </p>
            </div>
            <div class="mt-3 text-sm">
                <p class="capitalize">
                    <span class="font-bold">Updated:</span>
                    {{ $luxon.fromISO(question.updatedAt).toFormat($dateFormats.dayFormat) }}
                </p>
            </div>
            <div class="mt-3 text-sm">
                <span class="font-bold">Content:</span>
                <client-only>
                    <p class="line-clamp-3 question-content h-[60px]" v-html="question.content"></p>
                </client-only>
            </div>
            <div class="text-sm mt-3">
                <span class="font-bold">Tags:</span>
                <div class="flex flex-wrap question-tags gap-[6px] mt-1 pb-1">
                    <UTag
                        v-for="tag in question.tags"
                        :key="tag.id"
                        :value="tag.name"
                        border-width="1"
                        font-size="14"
                    />
                </div>
            </div>
        </div>
        <div class="flex mt-auto mb-0 items-center justify-between pt-6">
            <UButton label="Edit" size="md" :font-size="14" class="text-sm" @click="emit('edit')"/>
            <UButton icon-style icon="Trash" color="red-400" size="lg" tag="button" @click="emit('remove')"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Question, QuestionTag } from "~/models/QuestionModel";

defineOptions({
    inheritAttrs: false
})

export interface Props {
    question: Question,
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'edit': [],
    'remove': []
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

.question-bg::after {
    @apply absolute inset-0 content-[''] z-[-1] opacity-10;
    background: url("@/assets/backgrounds/question-preview-bg.svg") 0 0 / cover;
}
</style>