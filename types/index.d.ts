import { DateTime } from 'luxon'
import api from '~/api/index'
import DateFormats from "~/config/dateFormats";
import { Emitter } from 'mitt'

interface PluginsInjections {
    $luxon: typeof DateTime
    $api: typeof api
    $dateFormats: typeof DateFormats
    $emitter: Emitter<any>
}

declare module '#app' {
    interface NuxtApp extends PluginsInjections {  }
}

declare module 'nuxt/dist/app/nuxt' {
    interface NuxtApp extends PluginsInjections { }

}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties extends PluginsInjections { }
}

