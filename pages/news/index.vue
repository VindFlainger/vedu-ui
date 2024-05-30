<template>
    <div class="pt-8 pb-8">
        <p class="text-xl font-bold text-primary-900">
            Новости проекта ({{ total }})
        </p>
        <div class="mt-4 grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            <template v-if="!loading">
                <NewsPostElement
                    v-for="post in news"
                    :key="post.id"
                    :post="post"
                />
            </template>
            <template v-else>
                <NewsPostElementSkeleton
                    v-for="i in perPage"
                    :key="i"
                />
            </template>

        </div>
        <div class="mt-8">
            <u-pagination
                v-model:page="page"
                v-model:per-page="perPage"
                :count="total"
            />
        </div>
    </div>

</template>


<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";

const { $api } = useNuxtApp()
import { definePageMeta } from "#imports";
import { NewsPost } from "~/types/news";
import NewsPostElement from "~/components/News/NewsPostElement.vue";

definePageMeta({
    roles: ['public', 'student', 'instructor'],
})

useSeoMeta({
    title: () => 'News'
})


const page = useRouteQuery('page', 1, { transform: v => Number(v) })
const perPage = useRouteQuery('per_page', 30, { transform: v => Number(v) })
const { loading, addLoading, removeLoading } = useLoading()
const total = ref(0)
const news = ref<NewsPost[] | null>(null);
const fetch = async () => {
    try {
        addLoading()
        const res = await $api.news.GET_NEWS({ page: page.value, per_page: perPage.value })

        news.value = res.data
        total.value = res.meta.total
    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}

watch([page, perPage], () => {
    fetch()
})

fetch()

</script>
