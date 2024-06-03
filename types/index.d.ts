import { DateTime } from 'luxon'
import api from '~/api/index'
import DateFormats from "~/config/dateFormats";
import { Emitter } from 'mitt'
import { NotificationsType } from "~/plugins/notifications";

interface PluginsInjections {
    $luxon: typeof DateTime
    $copy: (v: string) => void
    $api: typeof api
    $dateFormats: typeof DateFormats
    $emitter: Emitter<any>
    $notifications: NotificationsType
}

declare module '#app' {
    interface NuxtApp extends PluginsInjections {  }
}

declare module 'nuxt/dist/app/nuxt' {
    interface NuxtApp extends PluginsInjections {
        $luxon: typeof DateTime
        $api: typeof api
        $copy: (v: string) => void
        $dateFormats: typeof DateFormats
        $emitter: Emitter<any>
        $notifications: NotificationsType
    }

}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties extends PluginsInjections {

    }
}

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
