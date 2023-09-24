const size = ref(0)
const orderedBreakpoints = ['xs', 'sm', 'lg', 'xl', '2xl']

export default defineNuxtPlugin({
    hooks: {
        'app:created'(vueApp) {
            const breakpoint = computed(() => {
                if (size.value < 430) return 'xs'
                if (size.value < 768) return 'sm'
                if (size.value < 1024) return 'md'
                if (size.value < 1280) return 'lg'
                if (size.value < 1536) return 'xl'
                return '2xl'
            })
            const getBreakpointData = (bp: 'xs' | 'sm' | 'lg' | 'xl' | '2xl', data: any, fallout: any = undefined) => computed(() => {
                if (orderedBreakpoints.indexOf(bp) <= orderedBreakpoints.indexOf(breakpoint.value)) return data
                return fallout
            })
            vueApp.provide('breakpoint', breakpoint)
            vueApp.provide('getBreakpointData', getBreakpointData)
        },
        'page:finish'() {
            window.addEventListener('resize', () => {
                size.value = window.innerWidth
            })
            size.value = window.innerWidth
        }
    }
})
