<template>
    <div
        :style="styles"
        class="relative inline-flex items-center text-[var(--u-tag-color)] select-none"
    >
        <slot name="prefix"></slot>
        <span class="font-nunito relative top-px">{{ value }}</span>
        <UIcon
            v-if="clearable"
            value="XMark"
            class="relative inline-block ml-[2px] dot [&:not(:hover)]:!bg-none hover:[&_svg]:!text-red-500 rounded-full -mr-1"
            size="16"
            :color="_color"
            tag="button"
            @click="emit('clear')"
        />
        <slot name="suffix"></slot>
        <div
            v-if="indicator"
            :style="indicatorStyles"
            class="absolute -top-[2px] outline -right-[2px] rounded-full">
        </div>
    </div>
</template>

<script setup lang="ts">
import { useColor } from "~/ui/composables/useColor";
import { useRounded } from "~/ui/composables/useRounded";
import { useSize } from "~/ui/composables/useSize";
import { useAdjustedColor } from "~/ui/composables/useAdjustedColor";

export interface Props {
    value: any,
    textColor?: string,
    color?: string,
    rounded?: string,
    fontWeight?: number | string,
    fontSize?: number | string,
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    borderWidth?: string | number,
    clearable?: boolean,
    indicatorColor?: string,
    indicatorOutlineColor?: string,
    indicator?: boolean,
    indicatorSize?: string | number
    solid?: boolean
}

const defaults = {
    color: 'primary-800',
    rounded: 'lg',
    fontWeight: 700,
    fontSize: 15,
    size: 'md',
    borderWidth: 2,
    clearable: false,
    indicatorColor: 'green-500',
    indicatorSize: 6
}

const props = withDefaults(defineProps<Props>(), {
    color: 'primary-800',
    rounded: 'lg',
    fontWeight: 700,
    fontSize: 15,
    size: 'md',
    borderWidth: 2,
    clearable: false,
    indicatorColor: 'green-500',
    indicatorSize: 6
})

const emit = defineEmits<{
    clear: []
}>()

const { color: _color, adjustedColor: _colorAdjustedBrightness } = useAdjustedColor(() => props.color, -50)
const { color: _textColor } = useColor(() => props.textColor || props.color)
const { color: _indicatorColor } = useColor(() => props.indicatorColor)
const { color: _indicatorOutlineColor } = useColor(() => props.indicatorOutlineColor || props.color)
const { size: _indicatorSize } = useSize(() => props.indicatorSize)
const { rounded: _rounded } = useRounded(() => props.rounded)
const { size: _fontSize } = useSize(() => props.fontSize)
const { size: _borderWidth } = useSize(() => props.borderWidth)

const sizeFrames = computed(() => {
    switch (props.size) {
        case 'xs':
            return {
                padding: '0 4px',
                fontSize: '12px'
            }
        case 'sm':
            return {
                padding: '0 6px',
                fontSize: '13px'
            }
        case 'md':
            return {
                padding: '0 8px',
                fontSize: '14px'
            }
        case 'lg':
            return {
                padding: '1px 9px',
                fontSize: '15px'
            }
        case 'xl':
            return {
                padding: '2px 10px',
                fontSize: '16px'
            }
    }
})

const styles = computed(() => ({
    'color': props.solid ? 'white' : _textColor.value,
    'background': props.solid ? _color.value : 'transparent',
    '--u-tag-color': _color.value,
    'border-color': props.solid ? _colorAdjustedBrightness.value : _textColor.value,
    'border-radius': _rounded.value,
    'font-weight': props.fontWeight,
    'padding': sizeFrames.value.padding,
    'font-size': props.fontSize == defaults.fontSize ? sizeFrames.value.fontSize : _fontSize.value,
    'border-width': _borderWidth.value
}))

const indicatorStyles = computed(() => ({
    'background': _indicatorColor.value,
    'outline-width': _borderWidth.value,
    'outline-color': _indicatorOutlineColor.value,
    'width': _indicatorSize.value,
    'height': _indicatorSize.value
}))

</script>

<style scoped>
.dot {
    background: radial-gradient(circle, rgba(239, 68, 68, 0.63) 0%, rgba(239, 68, 68, 0.48) 25%, white 80%, white 100%);
    background-clip: padding-box;
}
</style>

