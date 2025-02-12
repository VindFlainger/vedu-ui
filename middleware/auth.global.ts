const serviceRoutes = ['service', 'test']
const instructorRoutes = ['questions']

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) return
    const authed = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token')

    if (serviceRoutes.includes(to.name as string)){

    } else {
        if (to.name !== 'auth') {
            if (!authed) {
                return navigateTo({ name: 'auth', query: { redirect: to.fullPath } })
            }

            const accountStore = useAccountStore()
            if (!accountStore.user) {
                try {
                    await accountStore.getUserData()
                } catch (e) {}
            }
        } else if (authed) return navigateTo({name: 'dashboard'})
    }
})