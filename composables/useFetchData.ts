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
    return useFetch(path, {
        ...options,
        method,
        onRequest: async ({ request, options }) => {

        },
        onRequestError: () => {
        },
        onResponse: () => {
        },
        onResponseError: () => {
        },
        baseURL: 'http://localhost:3000/'
    })
}
