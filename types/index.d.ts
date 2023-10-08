import { DateTime } from 'luxon'
import api from '~/api/index'
import DateFormats from "~/config/dateFormats";

interface PluginsInjections {
    $luxon: typeof DateTime
    $api: typeof api
    $dateFormats: typeof DateFormats
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
