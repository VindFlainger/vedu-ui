import { UseFetchOptions } from 'nuxt/app'
import { MaybeRefOrGetter } from 'nuxt/dist/app/compat/capi'

export interface Controls {
    auth?: boolean
}

export function useFetchData<DataT>(
    path: MaybeRefOrGetter<string>,
    options?: UseFetchOptions<DataT>,
    controls?: Controls
) {
    const counter = ref(0)
    const result = useFetch(path, {
        ...options,
        onRequest: ({ request, options }) => {
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve()
                }, 5000)
                console.log('here')
            })
        },
        onRequestError: () => {},
        onResponse: () => {},
        onResponseError: () => {},
        baseURL: 'http://localhost:8080/',
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
