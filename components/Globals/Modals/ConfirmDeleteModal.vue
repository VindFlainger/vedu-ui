<template>
    <u-dialog
        ref="modal"
        hide-header
        max-width="400"
    >
        <template #default="{ close }">
            <p class="text-red-500 text-lg font-bold">
                {{ props.title }}
            </p>
            <p class="mt-2 text-gray-900">
                {{ props.text }}
            </p>
            <div class="mt-5 flex justify-between">
                <u-button
                    color="red-500"
                    label="Delete"
                    @click="handleClose"
                    :loading="loading"
                />
                <u-button
                    text
                    color="gray-900"
                    label="Cancel"
                    @click="close"
                />
            </div>
        </template>
    </u-dialog>
</template>

<script setup lang="ts">
export interface Props {
    title: string
    text: string,
    cb: Function
}

const props = withDefaults(defineProps<Props>(), {})

const modal = ref<any>(null)

const { loading, addLoading, removeLoading } = useLoading()
const handleClose = async () => {
    try {
        addLoading()
        await props.cb()
    } finally {
        removeLoading()
        modal.value.close()
    }
}

</script>

<style scoped>

</style>