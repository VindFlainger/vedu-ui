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
                    radio-style
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LessonTestQuestionNoAnswers } from "~/types/lesson";

export interface Props {
    question: LessonTestQuestionNoAnswers<'single'>
}

const props = withDefaults(defineProps<Props>(), {})
</script>
