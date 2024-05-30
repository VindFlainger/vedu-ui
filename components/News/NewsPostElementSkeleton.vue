<template>
    <div
        class="p-3 bg-white rounded-2xl border"
        style="box-shadow: 0 0 8px rgba(187,184,184,0.46)"
    >
        <div class="overflow-hidden rounded-2xl h-[250px] skeleton-loader"/>
        <div class="mt-3 h-[48px] flex flex-col gap-1">
            <div class="h-[21px] skeleton-loader rounded-2xl" :style="{width: `${Math.random() * (90-80+1)+80}%`}"/>
            <div class="h-[21px] skeleton-loader rounded-2xl" :style="{width: `${Math.random() * (70-30+1)+30}%`}"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

</script>

<style scoped>

</style>