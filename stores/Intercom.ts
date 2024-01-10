import { v4 } from 'uuid'

export interface Notification {
    type: 'info' | 'error' | 'success',
    title: string,
    text: string,
    tempId: string
}

export interface State {
    notifications: Notification[]
}


export const useIntercomStore = defineStore('Intercom', {
    state: (): State => ({
        notifications: []
    }),
    getters: {},
    actions: {
        addNotification(notification: Omit<Notification, 'tempId'>, timeout: number = 5000) {
            const tempId = v4()
            this.notifications.push({ ...notification, tempId })
            setTimeout(() => {
                this.notifications = this.notifications.filter(notification => notification.tempId !== tempId)
            }, timeout)
        }
    },
})
