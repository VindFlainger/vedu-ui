<template>
    <div>
        <div class="absolute -left-2 -top-2 flex gap-1.5">
            <div class="flex bg-primary-900 rounded-full p-1">
                <u-icon
                    size="16"
                    color="white"
                    value="ChatBubbleLeftEllipsis"
                />
            </div>
            <div class="flex bg-primary-900 rounded-full p-1" v-if="notification.target === 'global'">
                <u-icon
                    size="16"
                    color="white"
                    value="GlobeAlt"
                />
            </div>
        </div>

        <p class="font-medium text-primary-900">
            {{ notification.data.title }}
        </p>
        <p class="mt-1 text-[15px] leading-[20px]">
            {{ notification.data.text }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { MessageNotification } from "~/types/notifications";
import noCourse from "assets/images/no-image/no-lesson.png";

export interface Props {
    notification: MessageNotification;
}

const props = withDefaults(defineProps<Props>(), {});
</script>