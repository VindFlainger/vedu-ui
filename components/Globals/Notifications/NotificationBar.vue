<template>
    <div class="flex flex-col gap-2 fixed top-0 right-0 p-2">
        <transition-group
            enter-active-class="relative duration-200"
            leave-active-class="relative duration-200"
            enter-from-class="left-[100%] bottom-[25px] opacity-0"
            enter-to-class="left-0 bottom-0 opacity-100"
            leave-from-class="left-0 bottom-0 opacity-100"
            leave-to-class="left-[100%] bottom-[25px] opacity-0"
        >
            <div
                class="flex gap-2 items-center max-w-[500px] border-2 border-dashed bg-gray-50 rounded-xl py-1 px-2 group"
                :class="[
                {
                 'border-red-500': notification.type === 'error',
                 'border-green-600': notification.type === 'success',
                 'border-blue-500': notification.type === 'info'
                },
                notification.type
            ]"
                v-for="notification in computedNotifications"
                :key="notification.tempId"
            >
                <UIcon :value="notification.icon" :color="notification.color"/>
                <div class="group-[.error]:text-red-500 group-[.success]:text-green-600 group-[.info]:text-blue-500">
                    <p class="font-semibold">
                        {{ notification.title }}
                    </p>
                    <p class="text-sm mt-[2px]">{{ notification.text }}</p>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import { useIntercomStore } from "~/stores/Intercom";
import { storeToRefs } from "pinia";

const intercomStore = useIntercomStore()
const { notifications } = storeToRefs(intercomStore)

const getIcon = (type: string) => {
    switch (type) {
        case 'error':
            return 'XCircle'
        case 'success':
            return 'CheckCircle'
        case 'info':
            return 'InformationCircle'
    }
}

const getColor = (type: string) => {
    switch (type) {
        case 'error':
            return 'red-500'
        case 'success':
            return 'green-600'
        case 'info':
            return 'blue-500'
    }
}


const computedNotifications = computed(() => notifications.value.map(notification => ({
    ...notification,
    icon: getIcon(notification.type),
    color: getColor(notification.type)
})))


</script>

<style scoped>

</style>