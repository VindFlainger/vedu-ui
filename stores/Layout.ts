interface State {
    collapsed: boolean,
    contentHeight: number,
    contentWidth: number
}
export const useLayoutStore = defineStore('Layout', {
    state: () : State => ({
        collapsed: false,
        contentHeight: 0,
        contentWidth: 0
    }),
    getters: {

    },
    actions: () => {

    }
})