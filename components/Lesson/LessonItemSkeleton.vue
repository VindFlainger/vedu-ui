<template>
    <div class="flex gap-5 p-5 border border-gray-200 rounded-2xl">
        <div class="w-[200px] h-[120px] skeleton-loader rounded shrink-0"/>
        <div class="w-full">
            <div class="w-44 skeleton-loader h-5 rounded"/>
            <div class="mt-4 skeleton-loader h-3.5 rounded" :style="{width: `${Math.random() * (90-60+1)+60}%`}"/>
            <div class="mt-2 skeleton-loader h-3.5 rounded" :style="{width: `${Math.random() * (90-60+1)+60}%`}"/>
            <div class="mt-2 skeleton-loader h-3.5 rounded" :style="{width: `${Math.random() * (90-60+1)+60}%`}"/>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>