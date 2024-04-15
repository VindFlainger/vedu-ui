export default defineNuxtRouteMiddleware(async (to, from) => {
    const layoutStore = useLayoutStore()
    const accountStore = useAccountStore()

    const { role } = storeToRefs(accountStore)
    layoutStore.accessToPage = !(to.meta.roles && !(to.meta.roles as string[]).includes(role.value || 'public'))
})