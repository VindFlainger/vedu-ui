<template>
    <div>
        <HeaderBar v-if="hydratated && user && !maintenance"/>
        <LoadingStub v-if="!maintenance && !user"/>
        <MaintenanceStub v-if="maintenance"/>
        <ContentBlock
            v-if="!maintenance"
            :access-denied="accessDenied"
            :hydratated="hydratated"
            :maintenance="maintenance"
        />
    </div>
</template>

<script setup lang="ts">

import ContentBlock from "~/components/Globals/Layout/ContentBlock.vue";

useSeoMeta({
    titleTemplate: title => `Vedu! | ${title}`
})
const accountStore = useAccountStore()
const route = useRoute()

const { user, maintenance, role } = storeToRefs(accountStore)

const accessDenied = computed(()=>{
    return route.meta.roles && role.value && !(route.meta.roles as string[]).includes(role.value)
})

const account = useAccountStore()
const setAuth = () => {
    if (account.user) {
        const _hsq = window._hsq = window._hsq || [];
        console.log({
            email: account.user.auth.email,
            id: account.user.id
        })

        window._hsq.push(["identify",{
            email: account.user.auth.email,
            id: account.user.id
        }]);

        _hsq.push(["trackPageView"]);
    }
    window.HubSpotConversations.widget.load()
}

const hydratated = ref(false)
onMounted(() => {
    hydratated.value = true
    if (window.HubSpotConversations) setAuth()
    else  window.hsConversationsOnReady = [setAuth]
})

</script>