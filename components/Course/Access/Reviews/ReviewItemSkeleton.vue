<template>
    <div
        class="relative p-5 border border-gray-200 shadow-[0_0_3px_#e5e7eb] rounded-2xl"
    >
        <div class="flex gap-2 items-center">
            <div class="size-[32px] skeleton-loader rounded-full"/>
            <div class="h-[18px] w-full max-w-[200px] skeleton-loader rounded-md"/>
        </div>
        <div class="mt-3 flex gap-0.5">
            <u-icon
                v-for="i in 5"
                value="Star"
                solid
                color="gray-200"
            />
        </div>
        <p class="mt-3">
            <div class="mt-4 skeleton-loader h-3.5 rounded" :style="{width: `${Math.random() * (90-60+1)+60}%`}"/>
            <div class="mt-2 skeleton-loader h-3.5 rounded" :style="{width: `${Math.random() * (90-60+1)+60}%`}"/>
            <div class="mt-2 skeleton-loader h-3.5 rounded" :style="{width: `${Math.random() * (90-60+1)+60}%`}"/>
            <div class="mt-2 skeleton-loader h-3.5 rounded" :style="{width: `${Math.random() * (90-60+1)+60}%`}"/>
        </p>
        <div class="top-3 right-3 font-medium !absolute w-[82px] h-[16px] skeleton-loader rounded-md"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "ReviewItemSkeleton"
})
</script>