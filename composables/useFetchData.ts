import { UseFetchOptions } from 'nuxt/app'
import { MaybeRefOrGetter } from 'nuxt/dist/app/compat/capi'

export interface Controls {
    auth?: boolean
}

export function useFetchData<DataT>(
    method: 'GET' | 'POST' = 'GET',
    path: MaybeRefOrGetter<string>,
    options?: UseFetchOptions<DataT>,
    controls?: Controls
) {
    const counter = ref(0)
    const result = useFetch(path, {
        ...options,
        method,
        onRequest: ({ request, options }) => {
           
        },
        onRequestError: () => {},
        onResponse: () => {},
        onResponseError: () => {},
        baseURL: 'http://localhost:3000/',
    })

    const {messages, code} = useErrors(result.error)

    return {
        ...result,
        execute: () => {
            counter.value++
            return result.execute()
        },
        pending: options?.lazy
            ? computed(() => result.pending.value && !!counter.value)
            : result.pending,
        messages,
        code
    }
}
