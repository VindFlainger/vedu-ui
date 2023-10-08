interface State {
    collapsed: boolean,
}
export const useLayoutStore = defineStore('Layout', {
    state: () : State => ({
        collapsed: false,
    }),
    getters: {

    },
    actions: () => {

    }
})