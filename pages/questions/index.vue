<template>
    <div class="flex flex-col min-h-[100%] relative">
        <UActionBar :active="getBreakpointData('lg', true, false).value">
            <QuestionsActionBar
                v-model:search-query="searchQuery"
                v-model:active-tags="activeTags"
                :tags="tags"
                @open:add-question-modal="handleOpenAddDialog"
            />
        </UActionBar>
        <div class="relative mb-8">
            <div v-if="loading"
                 class="absolute z-20 -inset-3 rounded-xl bg-gray-100/50 shadow-[0_0_15px_#f3f4f6]"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                <QuestionPreview
                    v-for="question in questions"
                    :key="question.id"
                    :question="question"
                    @edit="handleOpenEditDialog(question)"
                    @remove="handleRemove(question.id)"
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
            @created="showQuestionCreateDialog = false"
            max-width="800"
        />
    </div>
</template>

<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import { Question } from "~/models/QuestionModel";
import UActionBar from "~/ui/UActionBar.vue";
import QuestionCreateDialog from "~/components/Questions/QuestionCreateDialog.vue";

const getBreakpointData = inject('getBreakpointData')
const { $api } = useNuxtApp()

const questionsStore = useQuestionsStore()

const { questions, tags } = storeToRefs(questionsStore)

useSeoMeta({
    title: 'Questions'
})

const searchQuery = useRouteQuery<string, string>('query')
const activeTagsRoute = useRouteQuery<string, string>('tags')

const activeTags = computed({
    get() {
        return activeTagsRoute.value ? activeTagsRoute.value.split(',') : []
    },
    set(v: any) {
        activeTagsRoute.value = v.join(',')
    }
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


const filters = computed(() => ({
    tags: activeTags.value,
    page: page.value,
    per_page: perPage.value,
    query: searchQuery.value
}))

watch([activeTagsRoute, page, perPage, searchQuery], () => {
    fetch(true)
})


const router = useRouter()
const { addLoading, removeLoading, loading } = useLoading(false)
const fetch = async (moveTop: any = false) => {
    try {
        addLoading()
        const questions = await questionsStore.fetchQuestions(filters.value)
        if (moveTop) window.scrollTo({ top: 0, behavior: 'smooth' })
        return questions
    } catch (e) {

    } finally {
        removeLoading()
    }
}

const handleRemove = async (id: string) => {
    try{
        addLoading()
        await $api.questions.REMOVE_QUESTION({id})
        await fetch()
    }catch (e) {

    }finally {
        removeLoading()
    }
}

useAsyncData('questions', fetch)
useAsyncData('availableTags', () => questionsStore.fetchAvailableTags())
</script>
