<template>
    <div class="min-h-[calc(100%-80px)] px-6 py-3">
        <SBellIcon test="10" class="w-5"></SBellIcon>
        {{ $luxon.fromISO('2016-05-25') }}
    </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '~/store/Layout'
import { storeToRefs } from 'pinia'

const { isSideBar } = storeToRefs(useLayoutStore())
const { $order } = useNuxtApp()


</script>

<style scoped></style>
