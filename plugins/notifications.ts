import notifications from "~/config/notifications";

export default defineNuxtPlugin((nuxt) => {
    nuxt.provide("notifications", notifications)
})

export type NotificationsType = typeof notifications