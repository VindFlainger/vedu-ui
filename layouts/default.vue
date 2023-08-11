<template>
    <div class="h-screen">
        <HeaderBar />
        <SideBar />
        <div
            class="max-h-screen overflow-x-hidden overflow-y-scroll pl-60 pt-14 content"
            :class="{ '!pl-12': collapsed }"
        >
            <div class="px-4 py-4">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderBar from '~/components/Navs/Header/HeaderBar.vue'
import SideBar from '~/components/Navs/SideBar/SideBar.vue'
import { useLayoutStore } from '~/store/Layout'
const layoutStore = useLayoutStore()

const { collapsed } = storeToRefs(layoutStore)
</script>

<style scoped lang="scss">
.content::-webkit-scrollbar {
    background: white;
    width: 4px;
}

.content::-webkit-scrollbar-thumb {
    background: grey;
}

.content::-webkit-scrollbar-track {
    margin-top: 64px;
}
</style>
