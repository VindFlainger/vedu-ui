<template>
    <div>
        <img
            class="object-cover select-none"
            :style="styles"
            :src="src"
            alt=""
        >
    </div>
</template>

<script setup lang="ts">
import { useSize } from "~/ui/composables/useSize";

export interface Props {
    avatar: {
        original: string,
        frames?: {
            width: number,
            height: number,
            url: string
        }[]
    },
    frameWidth: number,
    size: number | string,
    original: boolean,
    rounded: boolean,
    borderRadius: number | string
}

const props = withDefaults(defineProps<Props>(), {
    original: true,
    size: 32,
    borderRadius: 4
})

const { size: _size } = useSize(props.size)
const { size: _borderRadius } = useSize(props.borderRadius)


const src = computed(()=> {
    if (props.original) return props.avatar.original
    if (props.avatar.frames) props.avatar.frames.find(frame => frame.width === props.frameWidth)
})

const styles = computed(() => ({
    minWidth: _size.value,
    minHeight: _size.value,
    maxWidth: _size.value,
    maxHeight: _size.value,
    borderRadius: props.rounded ? '50%' : _borderRadius.value
}))



</script>

<style scoped>

</style>