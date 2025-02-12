<template>
    <img
        class="object-cover select-none"
        :style="styles"
        :src="src"
        :alt="alt"
        draggable="false"
        v-bind="$attrs"
    >
</template>

<script setup lang="ts">
import { useSize } from "~/ui/composables/useSize";

export interface Props {
    image?: {
        original: string,
        frames?: {
            width: number,
            height: number,
            url: string
        }[]
    } | string,
    frameWidth?: number,
    width?: number | string,
    height?: number | string,
    original: boolean,
    rounded?: boolean,
    borderRadius: number | string,
    emptyImage?: string,
    alt?: string
}

const props = withDefaults(defineProps<Props>(), {
    original: true,
    size: 32,
    borderRadius: 4
})

const { size: _width } = useSize(props.width)
const { size: _height } = useSize(props.height)
const { size: _borderRadius } = useSize(props.borderRadius)


const src = computed(()=> {
    if (!props.image) return props.emptyImage
    if (typeof props.image === 'string') return props.image
    if (props.original) return props.image.original
    if (props.image.frames) props.image.frames.find(frame => frame.width === props.frameWidth)
})

const styles = computed(() => ({
    minWidth: _width.value,
    minHeight: _height.value,
    maxWidth: _width.value,
    maxHeight: _height.value,
    borderRadius: props.rounded ? '50%' : _borderRadius.value
}))
</script>
