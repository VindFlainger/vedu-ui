<template>
    <div
        class="bg-white p-6 rounded-2xl h-full flex flex-col gap-4 overflow-y-auto inner-scrollbar max-h-[500px]
         [@media(min-height:500px)]:pr-1"
    >
        <div
            v-for="notification in notifications"
            :key="notification.id"
            class="border p-4 rounded-2xl"
        >
            <NotificationMessage
                v-if="notification.type === 'message'"
                :data="notification.data"
                :group="notification.group"
                :receiver="notification.receiver"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()

const { notifications } = storeToRefs(accountStore)
</script>


<style scoped>

</style>