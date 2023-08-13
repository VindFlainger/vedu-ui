<template>
    <component :is="tag">
        <component
            :is="solid ? Solid[value + 'Icon'] : Outline[value  + 'Icon']"
            :style="styles"
        />
    </component>
</template>

<script setup lang="ts">
import * as Solid from '@heroicons/vue/24/solid'
import * as Outline from '@heroicons/vue/24/outline'
import {parseColor} from "~/ui/utils/parsers";

export interface Props {
    value: string
    solid?: boolean
    size?: string | number
    color?: string
    strokeWidth?: string | number
    tag?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 24,
    color: '#000000',
    tag: 'span'
})

const color = computed<string>(() => parseColor(props.color))

const styles = {
    width: `${props.size}px`,
    height: `${props.size}px`,
    color: `${color.value}`,
    strokeWidth: props.strokeWidth
}


</script>