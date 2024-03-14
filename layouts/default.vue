<template>
    <div>
        <HeaderBar v-if="hydratated && user && !maintenance"/>
        <LoadingStub v-if="!maintenance && !user"/>
        <MaintenanceStub v-if="maintenance"/>
        <div v-if="!maintenance" class="min-h-[calc(100vh-64px)] flex flex-col">
            <div id="action-bar" class="sticky top-16 bg-white z-[1000]"></div>
            <div class="py-4 flex justify-center grow bg-sky-50">
                <div class="max-sm:px-3 sm:w-[95%] lg:w-[90%] max-w-[1600px] min-h-[100%]">
                    <NotFoundStub v-if="accessDenied"/>
                    <NuxtPage v-else :class="{'hidden': !hydratated}"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

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