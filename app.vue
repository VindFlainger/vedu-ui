<template>
    <NotificationBar class="z-[10000]"/>
    <NuxtLayout>

    </NuxtLayout>
</template>

<script lang="ts" setup>
import NotificationBar from "~/components/Globals/Notifications/NotificationBar.vue"
import { useGlobalStore } from "~/stores/Global";
const globalStore = useGlobalStore()


useHead({
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.ico' }],
})

globalStore.fetchCategories()

</script>
