import type { order } from '~/plugins/order'

interface PluginsInjections {
    $order: string
}

declare module '#app' {
    interface NuxtApp extends PluginsInjections {}
}

declare module 'nuxt/dist/app/nuxt' {
    interface NuxtApp extends PluginsInjections {

    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties extends PluginsInjections {}
}