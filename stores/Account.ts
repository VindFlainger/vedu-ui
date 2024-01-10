export interface State {
    user: any,
    maintenance: boolean
}

import api from '~/api/index'


export const useAccountStore = defineStore('Account', {
    state: (): State => ({
        user: null,
        maintenance: false
    }),
    getters: {
        role: (state): string | undefined => {
            return state.user?.role
        }
    },
    actions: {
        async setAuth(refreshToken: string, remember: boolean) {
            if (remember) localStorage.setItem('refresh_token', refreshToken)
            else sessionStorage.setItem('refresh_token', refreshToken)
        },
        async clearAuth(){
            localStorage.removeItem('refresh_token')
            sessionStorage.removeItem('refresh_token')
            await this.logoutHubspotChat()
            await window.open('http://localhost:8080/auth', '_self')
        },
        async logoutHubspotChat(){
            if (window.HubSpotConversations) {
                window.HubSpotConversations.clear()
                window.HubSpotConversations.widget.remove()
                const cookies = document.cookie.split(";");

                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i];
                    const eqPos = cookie.indexOf("=");
                    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }
            }
        },
        async getUserData() {
            const res = await api.account.GET_USER()
            this.user = res
        }
    },
})
