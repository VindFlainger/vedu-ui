<template>
    <div>
        <div class="absolute -left-2 -top-2 bg-primary-900 rounded-full p-1">
            <u-icon
                size="16"
                color="white"
                value="AcademicCap"
            />
        </div>
        <p class="font-medium text-primary-900">
            Вы получили приглашение на доступ к курсу
        </p>
        <div class="mt-3 flex gap-2 items-center">
            <SizedImage
                :empty-image="noCourse"
                :image="notification.data.image"
                width="80"
                height="40"
            />
            <p class="font-medium text-[15px]">
                {{ notification.data.course_name }}
            </p>
        </div>
        <div class="flex justify-end">
            <u-button
                size="xs"
                label="Принять"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { InviteNotification } from "~/types/notifications";
import noCourse from "assets/images/no-image/no-lesson.png";

export interface Props {
    notification: InviteNotification;
}

const props = withDefaults(defineProps<Props>(), {});
</script>