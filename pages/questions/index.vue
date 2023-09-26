<template>
    <div class="flex flex-col min-h-[100%]">
        <div class="mb-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                <QuestionPreview
                    v-for="question in questions"
                    :key="question.id"
                    :question="question"
                    @edit="handleEdit(question)"
                />
            </div>
        </div>
        <UPagination
            class="mt-auto mb-8"
            v-model:page="page"
            v-model:per-page="perPage"
            v-model:count="count"
        />
        <client-only>
            <QuestionEditDialog
                v-if="selectedQuestion"
                v-model="showEditModal"
                :question="selectedQuestion"
                @close="handleEditModalClose"
                max-width="800"
            />
        </client-only>
    </div>
</template>

<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
const questionsStore = useQuestionsStore()

const { questions } = storeToRefs(questionsStore)

useSeoMeta({
    title: 'Questions'
})

definePageMeta({})

const page = useRouteQuery('page', 1, { transform: v => Number(v) })
const perPage = useRouteQuery('per-page', 30, { transform: v => Number(v) })
const count = ref(300)


const selectedQuestion = ref(null)
const showEditModal = ref(false)
const handleEdit = (v: any) => {
    selectedQuestion.value = v
    showEditModal.value = true
}

const handleEditModalClose = () => {
    showEditModal.value = false
    selectedQuestion.value = null
}
</script>
