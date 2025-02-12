<template>
    <div
        class="relative p-5 border border-gray-200 shadow-[0_0_3px_#e5e7eb] rounded-2xl bg-white"
    >
        <NotificationsOverviewInviteNotification v-if="notification.type === 'invite'" :notification="notification"/>
        <NotificationsOverviewMessageNotification v-else-if="notification.type === 'message'" :notification="notification"/>
    </div>
</template>

<script setup lang="ts">
import { Notification } from "~/types/notifications";

export interface Props {
    notification: Notification;
}

const props = withDefaults(defineProps<Props>(), {});

</script>