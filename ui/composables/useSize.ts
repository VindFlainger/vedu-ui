import { MaybeRefOrGetter } from "nuxt/dist/app/compat/capi";

export function useSize(v: MaybeRefOrGetter) {
    const size = computed(() => {
        if (/^\d+(px|rem|%|vh|vw)$/.test(toValue(v))) return toValue(v)
        else if (/^\d+$/.test(toValue(v))) return toValue(v) + 'px'
    })

    return { size }
}