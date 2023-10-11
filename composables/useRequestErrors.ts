import { MaybeRefOrGetter } from "nuxt/dist/app/compat/capi";

export interface RequestErrors {
    fields: {
        field: string,
        text: string
    }[],
    general: string[]
}

export function useRequestErrors(fieldsMapping: MaybeRefOrGetter<boolean> = true) {
    const errors = ref<RequestErrors | null>(null)

    const fieldErrors = computed(() => {
        return errors.value ?
            errors.value.fields.map(error => toValue(fieldsMapping) ? `${error.field[0].toUpperCase() + error.field.substring(1)}: ${error.text}` : error)
            : []
    })

    const generalErrors = computed(() => {
        return errors.value ? errors.value.general : []
    })

    return {
        errors,
        fieldErrors,
        generalErrors
    }
}
