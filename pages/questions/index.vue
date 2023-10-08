<template>
    <div class="flex flex-col min-h-[100%] relative">
        <UActionBar :active="getBreakpointData('lg', true, false).value">
            <QuestionsActionBar
                v-model:search-query="searchQuery"
                :active-tags="computedActiveTags"
                @open:add-question-modal="handleOpenAddDialog"
            />
        </UActionBar>
        <div class="mb-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                <QuestionPreview
                    v-for="question in questions"
                    :key="question.id"
                    :question="question"
                    @edit="handleOpenEditDialog(question)"
                />
            </div>
        </div>
        <UPagination
            v-model:page="page"
            v-model:per-page="perPage"
            v-model:count="count"
            class="mt-auto mb-4"
        />
        <QuestionEditDialog
            v-if="showQuestionEditDialog && selectedQuestion"
            v-model="showQuestionEditDialog"
            destroy-on-close
            :question="selectedQuestion"
            max-width="800"
            @close="showQuestionEditDialog = false; selectedQuestion = null"
        />
        <QuestionCreateDialog
            v-if="showQuestionCreateDialog"
            @close="showQuestionCreateDialog = false"
            max-width="800"
        />
        <AddTagsDialog
            v-model="showAddTagsModal"
            :tags="tags"
            :active-tags="activeTags"
        />
    </div>
</template>

<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import { Question } from "~/models/QuestionModel";
import UActionBar from "~/ui/UActionBar.vue";
import QuestionCreateDialog from "~/components/Questions/QuestionCreateDialog.vue";

const getBreakpointData = inject('getBreakpointData')

const questionsStore = useQuestionsStore()

const { questions, tags } = storeToRefs(questionsStore)

useSeoMeta({
    title: 'Questions'
})

const searchQuery = useRouteQuery<string, string>('query')
const activeTags = useRouteQuery('tags', ['1', '2'])

const computedActiveTags = computed(() => {
    return tags.value.filter(tag => activeTags.value.some(_tag => _tag === tag.value))
})

const page = useRouteQuery('page', 1, { transform: v => Number(v) })
const perPage = useRouteQuery('per-page', 30, { transform: v => Number(v) })
const count = ref(300)


const selectedQuestion = ref<Question | null>(null)
const showQuestionEditDialog = ref(false)
const handleOpenEditDialog = (v: any) => {
    selectedQuestion.value = v
    showQuestionEditDialog.value = true
}

const showQuestionCreateDialog = ref(false)
const handleOpenAddDialog = () => {
    showQuestionCreateDialog.value = true
}

const showAddTagsModal = ref(false)

useAsyncData('questions', () => questionsStore.fetchQuestions({}))
useAsyncData('availableTags', () => questionsStore.fetchAvailableTags())
</script>
