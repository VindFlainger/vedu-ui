<template>
    <div>
        <p v-html="question.content"/>
        <div class="mt-2">
            <div
                v-for="option in question.options"
                :key="option.value"
                class="flex items-center gap-2"
            >
                <u-checkbox
                    :label="option.label"
                    :disabled="readonly"
                    :model-value="modelValue?.length ? modelValue.includes(option.value) : false"
                    @change="modelValue?.length ?
                         emit('update:modelValue', modelValue.includes(option.value) ? modelValue.filter(v => v !== option.value) : [...modelValue, option.value] as any):
                         emit('update:modelValue', [option.value] as any)
                    "
                />
                <template v-if="correctAnswers">
                    <u-icon
                        v-if="correctAnswers.includes(option.value)"
                        value="Check"
                        stroke-width="3"
                        size="16"
                        color="green-500"
                    />
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LessonTestQuestionNoAnswers } from "~/types/lesson";

export interface Props {
    question: LessonTestQuestionNoAnswers<'multiple'>,
    modelValue: string[] | null
    readonly?: boolean
    correctAnswers?: string[]
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'update:modelValue': [v: string[] | null]
}>()
</script>
