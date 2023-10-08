<template>
    <UModal>
        <template #default="{close}">
            <div class="mt-2" >
                <USelect :options="tags"/>

            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
export interface Props {
    tags?: {
        label: string,
        value: string
    }[],
    activeTags: string[]
}

const props = withDefaults(defineProps<Props>(), {
    tags: () => []
})
</script>

<style scoped>

</style>