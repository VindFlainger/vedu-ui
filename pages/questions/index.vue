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
                v-model="showEditModal"
                :question="selectedQuestion"
                @close="showEditModal = false"
                max-width="800"
            />
        </client-only>
    </div>
</template>

<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";

const app = getCurrentInstance()



useSeoMeta({
    title: 'Questions'
})

definePageMeta({

})

const page = useRouteQuery('page', 1, { transform: v => Number(v) })
const perPage = useRouteQuery('per-page', 30, { transform: v => Number(v) })
const count = ref(300)


const questions = ref([
    {
        id: 'smasginraww',
        type: 'text',
        title: 'Queue Question',
        content: '<p>FIFO and LIFO principles.</p>',
        tags: ['Math', 'Programming', 'AIDI'],
        answers: ['Math', 'AI', 'Easy math question', 'Math', 'AI', 'Easy', 'Math', 'AI', 'Easy math question']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p>FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p>FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p><img src="https://cdn.pixabay.com/photo/2017/03/27/16/46/dolomites-2179602_1280.jpg">FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p><img src="https://cdn.pixabay.com/photo/2017/03/27/16/46/dolomites-2179602_1280.jpg">FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p><img src="https://cdn.pixabay.com/photo/2017/03/27/16/46/dolomites-2179602_1280.jpg">FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p><img src="https://cdn.pixabay.com/photo/2017/03/27/16/46/dolomites-2179602_1280.jpg">FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p><img src="https://cdn.pixabay.com/photo/2017/03/27/16/46/dolomites-2179602_1280.jpg">FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p>FIFO and LIFO principles. Real world examples and description. FIFO and LIFO principles. Real world examples and description. FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
    {
        id: 'smasginraww',
        type: 'multiple',
        title: 'Queue Question',
        content: '<p>FIFO and LIFO principles. Real world examples and description</p>',
        tags: ['Math', 'Programming', 'AI']
    },
])

const selectedQuestion = ref(null)
const showEditModal = ref(false)
const handleEdit = (v: any) => {
    selectedQuestion.value = v
    showEditModal.value = true
}


</script>

<style></style>
