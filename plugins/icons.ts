import * as solid from '@heroicons/vue/24/solid'
import * as outline from '@heroicons/vue/24/outline'

export default defineNuxtPlugin((nuxt) => {
    Object.entries(solid).forEach(([name, icon]) => {
        nuxt.vueApp.component('S' + name, icon)
    })

    Object.entries(outline).forEach(([name, icon]) => {
        nuxt.vueApp.component('O' + name, icon)
    })
})
