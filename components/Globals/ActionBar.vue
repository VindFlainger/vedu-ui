<template>
    <client-only>
        <teleport v-if="$slots.default && active" to="#action-bar" >
            <div
                class="px-4 md:px-8 xl:px-16 pb-4 2xl:px-32 2xl:pb-8 mr-1"
                :class="{
                    '!pb-2 sm:!pb-4 !px-3 sm:!px-6 xl:!px-12 2xl:!px-24 2xl:!pb-4 sm:-mt-2': contentScrolled
                }"
            >
                <div
                    class="flex bg-white py-3"
                    :class="{
                    'rounded-[22px] border px-4': contentScrolled
                }"
                >
                    <div
                        class="max-sm:px-3"
                        :class="{
                         '': contentScrolled,
                    }"
                    >
                        <slot></slot>
                    </div>
                </div>
            </div>
        </teleport>
        <div v-else-if="$slots.default && !active">
            <div class="pt-3 pb-5 z-[1000]">
               <slot></slot>
            </div>
        </div>
		<U-c
    </client-only>
</template>

<script setup lang="ts">
const layoutStore = useLayoutStore()

export interface Props {
    active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    active: true
})

const { contentScrolled } = storeToRefs(layoutStore)
</script>