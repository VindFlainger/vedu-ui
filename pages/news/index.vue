<template>
    <div class="md:mx-8 lg:mx-16 xl:mx-32">

        <!-- INTRO -->
        <div v-if="page === 1" class="mt-5 mb-6 flex flex-col items-center sm:mt-8 sm:mb-10 md:mt-16 xl:mt-32">
            <div class="xl:max-w-[606px] 2xl:max-w-[900px]">
                <p class="text-center text-3xl font-extrabold font-nunito sm:text-[48px] sm:leading-[72px] 2xl:text-[75px] 2xl:leading-[90px]">
                    Новости & Статьи
                </p>
                <p class="mt-3 text-center text-base text-gray-400 font-nunit sm:text-xl 2xl:mt-5 2xl:text-2xl">
                    Новости о деятельности и жизни платформы, а также событиях и новых технологиях в сфере образования.
                </p>
            </div>
        </div>

        <!-- NEWS POSTS -->
        <div class="grid gap-10 md:grid-cols-2 2xl:grid-cols-3">
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

        <!-- PAGINATION -->
        <div class="mt-16 mb-8">
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
