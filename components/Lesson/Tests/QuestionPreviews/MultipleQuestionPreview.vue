<template>
    <div>
        <p class="font-medium">
            Ответы:
        </p>
        <ul>
            <li
                v-for="answer in question.options"
                :key="answer.value"
                class="list-inside list-disc"
            >
                <span>{{answer.label}}</span>
                <span v-if="answer.correct" class="ml-1 text-green-700">(правильный)</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { QuestionFindResult } from "~/types/questions";

export interface Props {
    question: QuestionFindResult<'multiple'>
}

const props = withDefaults(defineProps<Props>(), {})
</script>