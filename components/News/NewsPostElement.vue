<template>
    <div class="flex flex-col rounded-3xl bg-gray-100 p-4 sm:rounded-[32px] sm:p-5 lg:p-7 2xl:p-5">
        <div class="relative w-full aspect-[597/338]">
            <img
                class="absolute h-full w-full cursor-pointer rounded-2xl object-cover sm:rounded-[26px]"
                :src="mainImage"
                alt=""
                @click="showViewNewsPostModal = true"
            >
            <div class="absolute bottom-3 left-3 z-10 flex gap-2">
                <div
                    class="rounded-full bg-white px-6 py-2 text-sm font-bold font-nunito"
                    v-for="tag in post.tags"
                    :key="tag"
                >
                    {{ tag }}
                </div>
            </div>
        </div>
        <p class="mt-7 font-bold capitalize text-gray-600 font-nunito text-[13px]">
            {{ $luxon.fromISO(post.created_at).toFormat('LLL d, yyyy') }}
        </p>
        <div class="mt-3">
            <p
                class="cursor-pointer text-xl font-extrabold leading-6 text-gray-800 font-nunito sm:text-2xl sm:leading-7"
                @click="showViewNewsPostModal = true"
            >
                {{ post.title }}
            </p>
            <p class="mt-2 text-sm text-gray-500 sm:mt-4 sm:leading-5">
                {{ post.subtitle }}
            </p>
        </div>
        <div class="mt-auto mb-0 pt-3 sm:pt-6">
            <button
                class="font-bold text-sm font-nunito underline underline-offset-2 hover:text-primary-700 !outline-none"
                @click="showViewNewsPostModal = true"
            >
                Открыть
            </button>
        </div>
    </div>

    <ViewNewsPostModal
        v-if="showViewNewsPostModal"
        :title="post.title"
        :subtitle="post.subtitle"
        :content="post.content"
        :images="post.images.map(v => v.url)"
        :created-at="post.created_at"
        @close="showViewNewsPostModal = false"
    />
</template>

<script setup lang="ts">
import { NewsPost } from "~/types/news";

const showViewNewsPostModal = ref(false)

export interface Props {
    post: NewsPost
}

const props = withDefaults(defineProps<Props>(), {})

const mainImage = computed(() => {
    const mainImage = props.post.images.find(image => image.main) || props.post.images[0]

    if (mainImage) return mainImage.url
})
</script>

