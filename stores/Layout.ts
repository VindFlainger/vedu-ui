interface State {
    collapsed: boolean
    contentHeight: number
    contentWidth: number
    accessToPage: boolean
    headerHeight: number
    contentScrolled: boolean
}
export const useLayoutStore = defineStore('Layout', {
    state: () : State => ({
        collapsed: false,
        contentHeight: 0,
        contentWidth: 0,
        accessToPage: true,
        headerHeight: 0,
        contentScrolled: false
    }),
    getters: {

    },
    actions: () => {

    }
})