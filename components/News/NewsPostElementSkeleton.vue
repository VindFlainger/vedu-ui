<template>
    <div
        class="rounded-3xl border bg-white p-4 sm:rounded-[32px] sm:p-5 lg:p-7 2xl:p-5"
        style="box-shadow: 0 0 8px rgba(187,184,184,0.46)"
    >
        <div class="w-full overflow-hidden rounded-2xl aspect-[597/338] skeleton-loader sm:rounded-[26px]"/>
        <div class="mt-7 w-32 rounded-2xl h-[13px] skeleton-loader"/>
        <div class="mt-5 flex flex-col gap-1">
            <div class="rounded-2xl h-[19px] skeleton-loader" :style="{width: `${Math.random() * (90-80+1)+80}%`}"/>
            <div class="mt-1 rounded-2xl h-[19px] skeleton-loader" :style="{width: `${Math.random() * (70-30+1)+30}%`}"/>
        </div>
        <div class="mt-6">
            <div class="mt-1 rounded-2xl h-[12px] skeleton-loader" :style="{width: `${Math.random() * (90-70+1)+70}%`}"/>
            <div class="mt-2 rounded-2xl h-[12px] skeleton-loader" :style="{width: `${Math.random() * (70-40+1)+40}%`}"/>
        </div>
        <div class="mt-9 flex">
            <div class="w-20 rounded-2xl h-[13px] skeleton-loader"/>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>