import { NitroFetchOptions } from "nitropack";
import { v4 } from 'uuid'
import { FetchContext, FetchResponse } from "ofetch";

export interface Controls {
    noAuth?: boolean,
    cancelPrevious?: boolean,
}

let tokenFetching = false
let fetchError = false
let expires = 0
let queue: { id: string, handler: any, path: string }[] = []





export default async <DataT>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    data?: any,
    options?: NitroFetchOptions<any>,
    controls?: Controls
) => {

    const config = useRuntimeConfig()

    const baseUrl = config.public.baseUrl

    const pending = queue.filter(r => r.path === path)
    pending.forEach(request => {
        if (request && controls?.cancelPrevious) request.handler.abort()
    })

    const id = v4()
    const controller = new AbortController();
    const signal = controller.signal;
    const handler = {
        aborted: false,
        id,
        abort(){
            this.aborted = true
            controller.abort()
        }
    }
    queue.push({ id, handler, path })

    if(method === 'GET' && data && data instanceof Object) {
        let finalData = data
        Object.entries(data).forEach(([k, v]) => {
            if (Array.isArray(v)) {
                v.forEach((x, i) => finalData[`${k}[${i}]`] = x)
                delete finalData[k]
            }
        })
    }


    return $fetch<DataT>(
        path,
        {
            ...options,
            retry: false,
            credentials: 'include',
            method,
            ...data ? ['POST', 'PUT', 'PATCH'].includes(method) ? { body: data } : { query: data } : {},
            baseURL: baseUrl,
            signal,
            onRequest: () => {
                return new Promise<void>((resolve, reject) => {
                    if (controls?.noAuth) return resolve()
                    const accountStore = useAccountStore()
                    if (expires && expires > Date.now()) return resolve()
                    else {
                        if (!tokenFetching) {
                            tokenFetching = true
                            $fetch(`${baseUrl}/refresh`, {
                                method: 'POST',
                                body: {
                                    'refresh_token': localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token')
                                },
                                credentials: 'include'
                            })
                                .then((r: any) => {
                                    fetchError = false
                                    expires = Date.now() + r.live_time
                                })
                                .catch((e) => {
                                    if (e.response?.status === 403 || e.response?.status === 401){
                                        fetchError = true
                                        accountStore.clearAuth()
                                    } else if (e.name === 'FetchError'){
                                        accountStore.maintenance = true
                                        return reject()
                                    }
                                })
                                .finally(() => {
                                    tokenFetching = false
                                })
                        }
                        const loop = () => {
                            setTimeout(() => {
                                if (!tokenFetching && !fetchError) {
                                    if (handler.aborted){
                                        queue = queue.filter(r => r.id !== id)
                                        return reject()
                                    }
                                    resolve()
                                } else if (fetchError) {
                                    queue = queue.filter(r => r.id !== id)
                                    reject()
                                }
                                else loop()
                            }, 100)
                        }
                        loop()
                    }
                })
            },
            onRequestError(context: FetchContext & { error: Error }): Promise<void> | void {
                queue = queue.filter(r => r.id !== id)
            },
            onResponse(context: FetchContext & { response: FetchResponse<ResponseType> }): Promise<void> | void {
                queue = queue.filter(r => r.id !== id)
            },
            onResponseError(context: FetchContext & { response: FetchResponse<ResponseType> }): Promise<void> | void {
                queue = queue.filter(r => r.id !== id)
            }
        }
    )
}
