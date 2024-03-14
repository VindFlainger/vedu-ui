<template>
    <div
        class="flex items-center justify-center rounded-full relative select-none"
        :style="{
            maxWidth: size,
            maxHeight: size,
            minWidth: size,
            minHeight: size,
            backgroundColor: computedColor
        }"
    >
        <img
            v-if="image"
            class="rounded-full object-cover w-full h-full absolute z-10"
            style="transform: scale(1.01)"
            :src="image"
        >
        <span class="text-xs uppercase text-white font-medium relative leading-[10px] top-px">{{ shortcut }}</span>
    </div>
</template>

<script setup lang="ts">
import { getHexHash } from './utils/helpers'
import { useSize } from "~/ui/composables/useSize";
import { useColor } from "~/ui/composables/useColor";

export interface Props {
    image?: string,
    firstName?: any,
    lastName?: any,
    color?: string,
    shortcut?: any,
    size?: string | number
}

const props = withDefaults(defineProps<Props>(), {})

const { color } = useColor(props.color)

const computedColor = computed(() => {
    return color.value || getHexHash(`${props.firstName} ${props.lastName}`)
})
const { size } = useSize(props.size)

const shortcut = computed(() => props.shortcut || ((props.firstName ? props.firstName[0] : '') + (props.lastName ? props.lastName[0] : '')))

</script>