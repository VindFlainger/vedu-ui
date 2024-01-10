import { MaybeRefOrGetter } from "nuxt/dist/app/compat/capi";
import { toInteger } from "lodash-es";

export function useSize(v: MaybeRefOrGetter) {
    const size = computed<string>(() => {
        if (/^\d+(px|rem|%|vh|vw)$/.test(toValue(v))) return toValue(v)
        else if (/^\d+$/.test(toValue(v))) return toValue(v) + 'px'
    })

    const number = computed<number>(() => toInteger(v))

    return { size, number }
}