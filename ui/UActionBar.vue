<template>
    <client-only>
        <teleport v-if="$slots.default && active" to="#action-bar" >
            <div class="flex justify-center bg-white py-3">
                <div class="max-sm:px-3" :class="[contentSize?' sm:w-[90%] lg:w-[80%] max-w-[1600px]': 'w-full']">
                    <slot></slot>
                </div>
            </div>
        </teleport>
        <div v-else-if="$slots.default && !active">
            <div class="pt-3 pb-5">
               <slot></slot>
            </div>
        </div>
    </client-only>
</template>

<script setup lang="ts">
export interface Props {
    contentSize?: boolean,
    active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    contentSize: true,
    active: true
})
</script>

<style scoped>

</style>