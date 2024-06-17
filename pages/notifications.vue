<template>
    <div class="py-8 h-full">
        <div class="h-full flex flex-col">
            <div v-if="!loading" class="flex flex-col gap-4 grow">
                <div
                    v-for="notification in notifications"
                    :key="notification.id"
                    class="relative p-5 border border-gray-200 shadow-[0_0_3px_#e5e7eb] rounded-2xl bg-white"
                >
                    <div v-if="notification.type === 'invite'">
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
                    <div v-if="notification.type === 'message'">
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
                </div>
            </div>
            <div v-else  class="flex flex-col gap-4 grow">
                <NotificationsItemSkeleton v-for="i in perPage" :key="i"/>
            </div>

            <u-pagination
                class="mt-4"
                v-model:page="page"
                v-model:per-page="perPage"
                :count="total"
                @update:page="fetch"
                @update:per-page="page = 1; fetch()"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import noCourse from '~/assets/images/no-image/no-lesson.png'
import { useRouteQuery } from "@vueuse/router";
import { Notification } from "~/types/notifications";

const { $api } = useNuxtApp()
const route = useRoute()

const page = useRouteQuery('page', 1, { transform: v => Number(v) })
const perPage = useRouteQuery('per_page', 100, { transform: v => Number(v) })
const { loading, addLoading, removeLoading } = useLoading()
const total = ref(0)
const notifications = ref<Notification[]>([]);
const loaded = ref(false)

const fetch = async () => {
    try {
        addLoading()
        const res = await $api.notifications.GET_NOTIFICATIONS({
            page: page.value,
            per_page: perPage.value
        })

        notifications.value = res.data
        total.value = res.meta.total
        page.value = res.meta.page
        perPage.value = res.meta.per_page
        loaded.value = true
    } finally {
        removeLoading()
    }
}

fetch()
</script>

<style scoped>

</style>