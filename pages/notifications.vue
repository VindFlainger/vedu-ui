<template>
    <div class="py-8 h-full">
        <!-- CONTENT -->
        <template v-if="notifications.length">

            <div class="relative">
                <div class="flex flex-col gap-4 grow">
                    <NotificationsOverviewItem
                        v-for="notification in notifications"
                        :key="notification.id"
                        :notification="notification"
                    />
                </div>

                <!-- LOADING OTHER -->
                <div
                    v-if="loading && notifications.length"
                    class="absolute z-20 -inset-3 rounded-xl bg-gray-100/50 backdrop-blur-[1px] shadow-[0_0_15px_#f3f4f6]"
                />
            </div>

            <!-- PAGINATION -->
            <u-pagination
                class="mt-4"
                v-model:page="page"
                v-model:per-page="perPage"
                :count="total"
                @update:page="fetch"
                @update:per-page="page = 1; fetch()"
            />
        </template>

        <!-- LOADING -->
        <PageLoader v-else-if="loading"/>

        <!-- EMPTY -->
        <NotificationsOverviewEmpty v-else/>

    </div>
</template>

<script setup lang="ts">
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