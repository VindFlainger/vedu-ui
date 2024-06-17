import { Controls } from "~/api/handler";
import _fetch from '~/api/handler'
import { NitroFetchOptions } from "nitropack";
import { Notification } from "~/types/notifications";

export interface GetNotificationsPayload {
    page: number
    per_page: number
}

export interface GetNotificationsData {
    data: Notification[]
    meta: {
        total: number
        per_page: number
        page: number
    }
}


export default {
    GET_NOTIFICATIONS: (
        data: GetNotificationsPayload,
        options?: NitroFetchOptions<any>,
        controls?: Controls
    ) => _fetch<GetNotificationsData>('GET', `/notifications`, data, options, controls),
}