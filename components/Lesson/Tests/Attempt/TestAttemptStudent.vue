<template>
    <div
        v-if="attempt"
        class="flex flex-col gap-3"
    >
        <div
            v-for="(question, i) in questions"
            :key="question.id"
            class="flex gap-5 p-4 border-2 border-gray-200 rounded-2xl bg-white"
        >
            <div class="w-[80px]">
                <div class="w-8 h-8 flex items-center justify-center border-2 border-primary-900 rounded-lg
                      bg-primary-700 self-start shrink-0 text-white font-medium text-sm"
                >
                    {{ i + 1}}
                </div>
                <p class="mt-2 text-[15px]">
                    <span class="font-medium">Score:</span> {{question.score}}
                </p>
            </div>
            <AttemptTextQuestion
                v-if="question.type === 'text'"
                :question="question"
                :number="i + 1"
            />
            <AttemptSingleQuestion
                v-else-if="question.type === 'single'"
                :question="question"
            />
            <AttemptMultipleQuestion
                v-else-if="question.type === 'multiple'"
                :question="question"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { LessonTestAttempt, LessonTestQuestionNoAnswers } from "~/types/lesson";
import AttemptTextQuestion from "~/components/Lesson/Tests/Attempt/Questions/AttemptTextQuestion.vue";
import AttemptSingleQuestion from "~/components/Lesson/Tests/Attempt/Questions/AttemptSingleQuestion.vue";

const { $api } = useNuxtApp()
const route = useRoute()


const attempt = ref<LessonTestAttempt | null>(null)
const questions = ref<LessonTestQuestionNoAnswers[]>([])
const answers = ref<any[]>([])
const {loading, addLoading, removeLoading} = useLoading()
const fetchAttempt = async () => {
    try {
        const res = await $api.lesson.GET_TEST_ATTEMPT({
            course_id: route.params.course as string,
            lesson_id: route.params.lesson as string,
            test_id: route.params.test as string,
            attempt_id: route.params.attempt as string
        })

        attempt.value = res.attempt
        questions.value = res.questions
        answers.value

    } catch (err){
        console.log(err)
    } finally {

    }
}

fetchAttempt()
</script>
