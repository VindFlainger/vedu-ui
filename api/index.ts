import { NitroFetchOptions } from "nitropack";
import { v4 } from 'uuid'
import { FetchContext, FetchResponse } from "ofetch";

export interface Controls {
    auth?: boolean,
    cancelPrevious?: boolean,
}

let queue: { id: string, controller: AbortController, path: string }[] = []

export default <DataT>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
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
            baseURL: 'http://localhost:3000/',
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
