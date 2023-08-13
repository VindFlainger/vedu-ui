import { DateTime } from 'luxon'
import { api } from '~/plugins/api'

interface PluginsInjections {
    $luxon: DateTime
    $api: typeof api
}

declare module '#app' {
    interface NuxtApp extends PluginsInjections {}
}

declare module 'nuxt/dist/app/nuxt' {
    interface NuxtApp extends PluginsInjections {}
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties extends PluginsInjections {}
}
