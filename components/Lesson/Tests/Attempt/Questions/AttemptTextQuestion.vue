<template>
    <div>
        <p v-html="question.content"/>
        <u-input class="mt-2 w-[300px]" placeholder="Answer"/>
    </div>
</template>

<script setup lang="ts">
import { LessonTestQuestionNoAnswers } from "~/types/lesson";

export interface Props {
    question: LessonTestQuestionNoAnswers<'text'>
}

const props = withDefaults(defineProps<Props>(), {})
</script>

