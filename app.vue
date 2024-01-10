<template>
    <div>
        <NotificationBar class="z-[1000]"/>
        <NuxtLayout>

        </NuxtLayout>
    </div>
</template>

<script lang="ts" setup>
import NotificationBar from "~/components/Globals/Notifications/NotificationBar.vue"


useHead({
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.ico' }],
})


</script>
