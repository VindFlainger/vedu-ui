<template>
    <div class="relative p-5 border border-gray-200 shadow-[0_0_3px_#e5e7eb] rounded-2xl bg-white">
        <div class="w-6 h-6 skeleton-loader rounded-full !absolute -left-2 -top-2"/>
        <div class="h-[18px] w-full max-w-[250px] skeleton-loader rounded-md"/>
        <div class="mt-3 flex flex-col gap-1">
            <div class="h-[15px] skeleton-loader rounded-md" :style="{width: `${Math.random() * (90-60+1)+60}%`}"/>
            <div class="h-[15px] skeleton-loader rounded-md" :style="{width: `${Math.random() * (90-60+1)+60}%`}"/>
            <div class="h-[15px] skeleton-loader rounded-md" :style="{width: `${Math.random() * (90-60+1)+60}%`}"/>
            <div class="h-[15px] skeleton-loader rounded-md" :style="{width: `${Math.random() * (90-60+1)+60}%`}"/>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>


<style scoped>

</style>