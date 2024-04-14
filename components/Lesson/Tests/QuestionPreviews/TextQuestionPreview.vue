<template>
    <div>
        <p>
            <span class="font-medium">Answers:</span>
            <span class="ml-1">{{ question.options.map(option => `"${option}"`).join(', ') }}</span>
        </p>
    </div>
</template>

<script setup lang="ts">
import { QuestionFindResult } from "~/types/questions";

export interface Props {
    question: QuestionFindResult<'text'>
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped>

</style>