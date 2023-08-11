import { DateTime } from 'luxon';

interface PluginsInjections {
    $luxon: DateTime
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