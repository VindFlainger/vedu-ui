<template>
    <div>
        <div v-if="receiver" class="flex items-center gap-2">
            <SizedAvatar
                :avatar="receiver.avatar"
                :frame-width="64"
                :size="32"
                rounded
            />
            <div>
                <p class="font-medium">
                    {{ [receiver.first_name, receiver.last_name].filter(x => x).join(' ') }}
                </p>
            </div>
        </div>
        <div v-else class="flex items-center gap-2">
            <div class="flex items-center justify-center size-8 bg-purple-100 p-1 rounded-full">
                <img
                    class="size-6 shrink-0 rounded-full"
                    src="~/assets/images/logo.png" alt=""
                >
            </div>

            <p class="font-medium">Vedu</p>
        </div>
        <div class="text-sm mt-1">
            {{ data.text }}
        </div>
    </div>
</template>

<script setup lang="ts">
export interface Props {
    data: any,
    group?: boolean,
    receiver?: any
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped>

</style>