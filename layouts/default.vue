<template>
    <div class="fixed inset-0 flex">
        <MainSideBar></MainSideBar>
        <div class="w-full overflow-y-auto">
            <MainTopBar></MainTopBar>
            <MainContent></MainContent>
        </div>
    </div>
</template>

<script setup lang="ts">
import MainSideBar from '~/components/Layout/MainSideBar.vue';
import { useLayoutStore } from '~/store/Layout'

const { isSideBar } = storeToRefs(useLayoutStore())

onMounted(() => {
    window.addEventListener('resize', (e) => {
        isSideBar.value = window.innerWidth >= 1024
    })
})



</script>
