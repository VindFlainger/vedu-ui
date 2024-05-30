<template>
    <div
        class="p-3 bg-white rounded-2xl border hover:scale-[1.02] cursor-pointer"
        style="box-shadow: 0 0 8px rgba(187,184,184,0.46)"
        @click="showViewNewsPostModal = true"
    >
        <el-carousel class="border overflow-hidden border-gray-300 rounded-2xl" height="250px">
            <el-carousel-item
                v-for="image in post.images"
                :key="image.url"
            >
                <img :src="image.url" class="h-[250px] object-cover w-full"/>
            </el-carousel-item>
        </el-carousel>
        <p class="mt-3 font-bold text-lg leading-6 h-[48px] line-clamp-2 text-primary-900">
            {{ post.title }}
        </p>
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
</script>

