<template>
    <div class="relative flex flex-col pt-4 pb-10 min-h-[100%]">

        <!-- TOP ACTIONS -->
        <div
            v-if="questionsLoaded"
            class="pb-6"
        >
            <QuestionsActionBar
                v-model:search-query="searchQuery"
                v-model:active-tags="activeTags"
                :tags="tags"
                @open:add-question-modal="handleOpenAddDialog"
            />
        </div>


        <!-- CONTENT -->
        <template v-if="questions.length">
            <div class="relative">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    <QuestionPreview
                        v-for="question in questions"
                        :key="question.id"
                        :question="question"
                        @edit="handleOpenEditDialog(question)"
                        @remove="handleRemove(question.id)"
                    />
                </div>
                <!-- LOADING OTHER -->
                <div
                    v-if="loading && questions.length"
                    class="absolute z-20 -inset-3 rounded-xl bg-gray-100/50 backdrop-blur-[1px] shadow-[0_0_15px_#f3f4f6]"
                />
            </div>
            <UPagination
                v-model:page="page"
                v-model:per-page="perPage"
                v-model:count="count"
                class="mt-12"
            />
        </template>


        <!-- LOADING -->
        <PageLoader v-else-if="loading"/>

        <!-- EMPTY -->
        <div v-else class="mt-16 flex items-center justify-center">
            <div class="flex flex-col items-center justify-center px-16 py-8 max-w-[500px] w-[90%]">
                <div class="w-[50%]">
                    <img class="" src="~/assets/images/qa.png" alt="">
                </div>
                <p class="mt-1 text-xl font-bold text-gray-700">No Saved Questions</p>
                <UButton class="mt-8" size="sm" label="Create" @click="handleOpenAddDialog"/>
            </div>
        </div>


        <!-- BOTTOM ACTIONS -->
        <BottomActionBar :active="contentScrolled">
            <div>
                <u-button
                    icon-style
                    icon="Plus"
                    label="Новый вопрос"
                    @click="handleOpenAddDialog"
                />
            </div>
        </BottomActionBar>
    </div>


    <!-- DIALOGS -->
    <QuestionEditDialog
        v-if="showQuestionEditDialog && selectedQuestion"
        v-model="showQuestionEditDialog"
        destroy-on-close
        :question="selectedQuestion"
        max-width="800"
        @close="showQuestionEditDialog = false; selectedQuestion = null"
        @updated="fetch"
    />

    <QuestionCreateDialog
        v-if="showQuestionCreateDialog"
        @close="showQuestionCreateDialog = false"
        @created="fetch"
        max-width="800"
    />


</template>

<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import { Question } from "~/models/QuestionModel";
import QuestionCreateDialog from "~/components/Questions/QuestionCreateDialog.vue";
import api from "~/api";
const layoutStore = useLayoutStore()
const questionsStore = useQuestionsStore()

const { contentScrolled } = storeToRefs(layoutStore)
const { tags } = storeToRefs(questionsStore)

definePageMeta({
    roles: ['instructor'],
})

const getBreakpointData = inject('getBreakpointData')
const { $api } = useNuxtApp()


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
const count = ref(0)


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


const questionsLoaded = ref(false)
const router = useRouter()
const { addLoading, removeLoading, loading } = useLoading()

const questions = ref<Question[]>([])
const questionsCount = ref<number>(0)
const fetch = async (moveTop: any = false) => {
    try {
        addLoading()

        const res = await api.questions.GET_QUESTIONS(filters.value, undefined, { cancelPrevious: true })
        questions.value = res.data
        questionsCount.value = res.meta.count

        if (moveTop) window.scrollTo({ top: 0, behavior: 'smooth' })
        questionsLoaded.value = true
        count.value = questionsCount.value as number
    } catch (e) {

    } finally {
        removeLoading()
    }
}

const handleRemove = async (id: string) => {
    try {
        addLoading()
        await $api.questions.REMOVE_QUESTION({ id })
        await fetch()
    } catch (e) {

    } finally {
        removeLoading()
    }
}

onMounted(() => {
    fetch()
    questionsStore.fetchAvailableTags()
})

onUnmounted(() => {
    questionsStore.setEmpty()
})
</script>
