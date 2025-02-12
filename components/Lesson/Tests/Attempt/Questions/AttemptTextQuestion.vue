<template>
    <div>
        <p v-html="question.content"/>
        <u-input
            :model-value="modelValue"
            :readonly="readonly"
            class="mt-2 w-[300px]"
            placeholder="Answer"
            @update:modelValue="emit('update:modelValue', $event)"
        />
        <p class="mt-3 text-[15px]" v-if="correctAnswers">
            <span class="font-medium">Correct answers:</span> {{correctAnswers.join(', ')}}
        </p>
    </div>
</template>

<script setup lang="ts">
import { LessonTestQuestionNoAnswers } from "~/types/lesson";

export interface Props {
    question: (LessonTestQuestionNoAnswers<'text'> & { value: string | null }),
    modelValue: string | null,
    readonly?: boolean,
    correctAnswers?: string[]
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'update:modelValue': [v: string | null]
}>()

</script>

