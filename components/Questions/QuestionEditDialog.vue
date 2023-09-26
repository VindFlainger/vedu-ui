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
                <QuestionText
                    v-if="question.type === 'text'"
                    :answers="question.answers"
                    :question-id="question.id"
                    :loading="updateAnswersLoading"
                    @update="handleUpdateAnswers($event, question.id)"
                />
            </div>
        </div>
    </UModal>
</template>

<script setup lang="ts">
import { Question, QuestionAnswers } from "~/models/QuestionModel";
const questionsStore = useQuestionsStore()

export interface Props {
    question?: Question
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    deletedAnswer: [v: string]
    addedAnswer: [v: string]
    addedTag: [v: string],
    deletedTag: [v: string]
}>()

const text = ref('')

const { loading: updateAnswersLoading, addLoading: addUpdateAnswersLoading, removeLoading: removeUpdateAnswersLoading } = useLoading()
const handleUpdateAnswers = async (answers: QuestionAnswers, questionId: string) => {
    try {
        addUpdateAnswersLoading()
        await questionsStore.updateQuestionAnswers(questionId, answers)
    }
    catch (e){

    }
    finally {
        removeUpdateAnswersLoading()
    }
}


</script>

<style>
.dot {
    background: radial-gradient(circle, rgba(239, 68, 68, 0.63) 0%, rgba(239, 68, 68, 0.48) 25%, white 80%, white 100%);
    background-clip: padding-box;
}
</style>

