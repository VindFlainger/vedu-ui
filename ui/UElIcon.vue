<template>
    <component :is="Icons[value]" :style="styles" />
</template>

<script setup lang="ts">
import * as Icons from '@element-plus/icons-vue'
import { colors } from '~/ui/utils/defaults'

export interface Props {
    value: string
    size?: string | number
    color?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 24,
    color: '#000000',
})

const color = computed<string>(() => {
    if (props.color.includes('#')) {
        return props.color
    } else {
        if (/^[a-z]+-\d{2,3}$/.test(props.color)) {
            const level = Number.parseInt(
                props.color.substr(props.color.indexOf('-') + 1)
            )
            const color = props.color.substr(0, props.color.indexOf('-'))
            return colors?.[color]?.[level] ?? '#000000'
        } else if (/^[a-z]+$/.test(props.color)) {
            const color = props.color.substr(0, props.color.indexOf('-'))
            return colors?.[color]?.[700] ?? colors.primary[700]
        } else return '#000000'
    }
})

const styles = {
    width: `${props.size}px`,
    height: `${props.size}px`,
    color: `${color.value}`,
}
</script>
