<template>
    <div class="p-3 bg-white rounded-2xl shadow-[rgba(17,_17,_26,_0.1)_0px_4px_16px,_rgba(17,_17,_26,_0.05)_0px_8px_32px]">
        <div class="h-[24px] skeleton-loader rounded-lg" :style="{width: `${Math.random() * (90-60+1)+60}%`}"/>
        <div class="mt-2 h-[180px] skeleton-loader rounded-lg"/>
        <div class="mt-3 h-[19px] skeleton-loader rounded-lg w-12"/>
        <div class="mt-1 flex gap-2">
            <div class="h-[21px] skeleton-loader rounded-lg" :style="{width: `${Math.random() * (90-50+1)+50}px`}"/>
            <div class="h-[21px] skeleton-loader rounded-lg" :style="{width: `${Math.random() * (110-60+1)+60}px`}"/>
            <div class="h-[21px] skeleton-loader rounded-lg" :style="{width: `${Math.random() * (60-40+1)+40}px`}"/>
        </div>
        <div class="mt-3 h-[19px] skeleton-loader rounded-lg w-28"/>
        <div class="mt-1 flex">
            <div v-for="i in getRandomStudentsCount"
                 class="skeleton-loader rounded-full w-[30px] h-[30px] -ml-2 first:ml-0"/>
        </div>
        <div class="mt-3 h-[19px] skeleton-loader rounded-lg w-24"/>
        <div class="mt-1 flex">
            <div v-for="i in getRandomInstructorsCount"
                 class="skeleton-loader rounded-full w-[30px] h-[30px] -ml-2 first:ml-0"/>
        </div>
        <div class="flex justify-end mt-5">
            <div class="mt-3 h-[27px] skeleton-loader rounded-full w-20"/>
        </div>
    </div>
</template>

<script setup lang="ts">
const getRandomStudentsCount = computed(() => {
    return Math.floor(Math.random() * (6 - 3 + 1) + 3)
})

const getRandomInstructorsCount = computed(() => {
    return Math.floor(Math.random() * (6 - 3 + 1) + 3)
})
</script>
