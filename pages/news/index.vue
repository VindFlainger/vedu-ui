<template>
    <div>
        <div
            class="p-4"
            v-for="post in news"
            :key="post.id"
        >
            <p>
                {{post.title}}
            </p>
            <p v-html="post.content"/>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import { NewsPost } from "~/types/news";
const { $api } = useNuxtApp()
import { definePageMeta } from "#imports";

definePageMeta({
    roles: ['public', 'student', 'instructor'],
})

useSeoMeta({
    title: () => 'News'
})

const page = useRouteQuery('page', 1, { transform: v => Number(v) })
const perPage = useRouteQuery('per_page', 30, { transform: v => Number(v) })
const news = ref<NewsPost[] | null>(null)
const fetch = async () => {
    try {
        const res = await $api.news.GET_NEWS({ page: page.value, per_page: perPage.value })

        news.value = res.data
    } catch (err) {
        console.log(err)
    }
}

fetch()

</script>
