import { AsyncDataOptions, useNuxtApp } from "#app";
import { AsyncData, KeysOf, PickFrom } from "#app/composables/asyncData";
import { NuxtApp } from "#app/nuxt";

export interface ExtendedDataControls {
    unmountedClear: boolean
}

export function useExtendedData<ResT, DataE = Error, DataT = ResT, PickKeys extends KeysOf<DataT> = KeysOf<DataT>>
(key: string, handler: (ctx?: NuxtApp) => Promise<ResT>, options?: AsyncDataOptions<ResT, DataT, PickKeys>, controls?: ExtendedDataControls): AsyncData<PickFrom<DataT, PickKeys>, DataE | null> {

    const clearCache = () => {
        delete useNuxtApp().payload.data[key]
    }

    onUnmounted(() => {
        if (controls?.unmountedClear) clearCache()
    })

    return useAsyncData(key, handler, options)
}