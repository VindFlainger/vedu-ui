import { NitroFetchOptions } from "nitropack";
import { v4 } from 'uuid'
import { FetchContext, FetchResponse } from "ofetch";

export interface Controls {
    auth?: boolean,
    cancelPrevious?: boolean,
}

let queue: { id: string, controller: AbortController, path: string }[] = []

export default <DataT>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    data?: any,
    options?: NitroFetchOptions<any>,
    controls?: Controls
) => {
    const request = queue.find(r => r.path === path)
    if (request && controls?.cancelPrevious) request.controller.abort()
    const id = v4()
    const controller = new AbortController();
    const signal = controller.signal;
    queue.push({ id, controller, path })

    return $fetch<DataT>(
        path,
        {
            ...options,
            method,
            ...data ? ['POST', 'PUT', 'PATCH'].includes(method) ? { body: data } : { query: data } : {},
            baseURL: 'http://localhost:3000/mocks/',
            signal,
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
