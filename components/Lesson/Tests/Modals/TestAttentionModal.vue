<template>
    <u-dialog
        ref="modal"
        icon="Plus"
        hide-header
        max-width="416"
    >
        <template #default="{close}">
            <p class="font-bold text-xl text-red-500">Finish Attempt</p>
            <p class="mt-2">
                After completing the attempt, you will no longer be able to return to it, all questions that have not been
                answered will be rated 0 points. Are you sure you want to complete the attempt?
            </p>
            <div class="mt-4 flex justify-between">
                <u-button
                    label="Confirm"
                    @click="emit('confirm'); close()"
                />
                <u-button
                    class="font-bold"
                    font-weight="600"
                    label="Cancel"
                    text
                    color="red-500"
                    @click="close"
                />
            </div>
        </template>
    </u-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    'confirm': []
}>()
</script>