<template>
    <div>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            style="margin: auto; background: none; display: block; shape-rendering: auto;"
            :width="size"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <circle cx="50" cy="50" r="32" stroke-width="8" :stroke="color"
                    stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite"
                                  dur="0.6756756756756757s" keyTimes="0;1"
                                  values="0 50 50;360 50 50"></animateTransform>
            </circle>
        </svg>
    </div>
</template>


<script setup lang="ts">
import { useColor } from "~/ui/composables/useColor";
import { useSize } from "~/ui/composables/useSize";

export interface Props {
    size: string | number,
    color: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 24,
    color: 'primary-700'
})

const { size } = useSize(props.size)
const { color } = useColor(props.color)


</script>

<style scoped>

</style>