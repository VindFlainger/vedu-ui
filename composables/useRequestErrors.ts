export interface RequestErrors {
    fields?: {
        field: string,
        text: string
    }[],
    message: string,
    code: number
}

export function useRequestErrors() {
    const errors = ref<RequestErrors | null>(null)

    const fieldErrors = computed(() => errors.value?.fields ? errors.value.fields.map(error => error) : [])

    const fieldErrorsMapped = computed(() => {
        return errors.value?.fields ?
            errors.value.fields.map(error => `${error.field[0].toUpperCase() + error.field.substring(1)}`)
            : []
    })

    const generalErrors = computed(() => {
        return errors.value && errors.value.message ? [errors.value.message[0] + errors.value.message.substring(1)] : []
    })

    const errorList = computed(() => [...fieldErrorsMapped.value, ...generalErrors.value])

    const code = computed(() => errors.value?.code)

    return {
        errors,
        fieldErrors,
        generalErrors,
        errorList,
        code
    }
}
