import { vMaska } from "maska"

export default defineNuxtPlugin((nuxt) => {
    nuxt.vueApp.directive("maska", vMaska)
})