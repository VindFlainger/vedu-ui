export interface State {
    user: any
}

export default defineStore('Account', {
    state: (): State => ({
        user: null,
        
    }),
})
