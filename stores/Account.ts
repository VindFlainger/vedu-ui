export interface State {
    user: any
    expires: number,
}


export const useAccountStore = defineStore('Account', {
    state: (): State => ({
        user: null,
        expires: 0,
    }),
    getters: {
        isSessionExpired() {
            return () => !this.expires || Date.now() < this.expires - 300000
        },
    },
    actions: {
        async setAuth(refreshToken: string, expires: number, remember: boolean = true) {
            if (remember) localStorage.setItem('refresh_token', refreshToken)
            else sessionStorage.setItem('refresh_token', refreshToken)
            this.expires = expires
        },
    },
})
