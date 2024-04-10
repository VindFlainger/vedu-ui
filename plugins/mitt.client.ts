import mitt from 'mitt'

const emitter = mitt()

export default defineNuxtPlugin((nuxt) => {
    nuxt.provide("emitter", emitter)
})