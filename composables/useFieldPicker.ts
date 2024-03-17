import { MaybeRefOrGetter } from "nuxt/dist/app/compat/capi";

export function useFieldPicker(object: MaybeRefOrGetter){
    return computed(()=> {
        return Object.entries(toValue(object)).find(([k,v]) => {
            if (v) return k
        })?.[0]
    })
}