import { Breakpoints } from "~/types/global";

const size = ref(0)
const orderedBreakpoints = ['base', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']

const breakpoints = {
    'base': 0,
    '2xs': 420,
    'xs': 520,
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536,
};


export default defineNuxtPlugin({
    hooks: {
        'app:created'(vueApp) {
            const breakpoint = computed(() => {
                return Object.entries(breakpoints)
                    .reverse()
                    .find(([key, value]) => {
                        return size.value >= value
                    })
                    ?.[0] || 'base'
            })


            const getBreakpointData = (bp: Breakpoints, data: any, fallout: any = undefined) => computed(() => {
                if (orderedBreakpoints.indexOf(bp) <= orderedBreakpoints.indexOf(breakpoint.value)) return data
                return fallout
            })

            const getBreakpointValue = (breakpointValues: Record<Breakpoints, any>) => computed(() => {
                    const breakpointsOrder = Object.keys(breakpoints);

                    const currentBreakpointIndex = breakpointsOrder.indexOf(breakpoint.value);

                    let selectedValue = null;

                    breakpointValues = Object.fromEntries(
                        Object.entries(breakpointValues)
                            .sort((([aKey], [bKey]) => orderedBreakpoints.indexOf(aKey) - orderedBreakpoints.indexOf(bKey)))
                    ) as Record<Breakpoints, any>

                    for (const [breakpoint, value] of Object.entries(breakpointValues).reverse()) {
                        const breakpointIndex = breakpointsOrder.indexOf(breakpoint);
                        if (currentBreakpointIndex >= breakpointIndex) {
                            selectedValue = value;
                            break;
                        }
                    }

                    return selectedValue;
                }
            )

            const nuxtApp = useNuxtApp()

            nuxtApp.provide('getBreakpointValue', getBreakpointValue)

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
