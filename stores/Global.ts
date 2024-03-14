import api from '~/api'

export interface State {
    categories: []
}


export const useGlobalStore = defineStore('Global', {
    state: (): State => ({
        categories: []
    }),
    getters: {

    },
    actions: {
        async fetchCategories(){
            const res = await api.global.GET_CATEGORIES()

            this.categories = res

            return res
        }
    },
})
