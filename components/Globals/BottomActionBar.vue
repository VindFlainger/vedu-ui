<template>
    <transition
        enter-active-class="translate-y-[calc(100%+16px)]"
        leave-active-class="translate-y-[calc(100%+16px)]"
        class="bottom-3 duration-200"
    >
        <div v-if="active" class="fixed left-1/2 -translate-x-1/2 z-20">
            <div
                class="flex justify-center"
            >
                <div
                    class="flex bg-gray-50 py-3 rounded-[20px] px-5 shadow-[inset_0_0_0_4px_white] border border-gray-300"
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
        </div>
    </transition>
</template>

<script setup lang="ts">
const layoutStore = useLayoutStore()
const { contentScrolled } = storeToRefs(layoutStore)

export interface Props {
    active: boolean
}

const props = withDefaults(defineProps<Props>(), {

})

</script>