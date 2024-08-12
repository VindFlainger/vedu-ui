<template>
    <button
        class="u-button u-button-bg relative overflow-hidden selection:bg-none z-10 duration-150 transition-colors
            shrink-0 self-center font-nunito"
        :style="styles"
        :class="{
            'cursor-not-allowed': disabled,
            'u-button-solid-bg': !text && !plain && !iconStyle,
            'u-button-plain': text || plain,
        }"
        @click="handleClick"
    >
        <div v-if="!iconStyle" class="flex items-center justify-center">
            <div
                v-if="leftIcon || slots.leftIcon"
                class="u-button-left-icon-wrapper"
                :class="[
                    text ? 'mr-1.5' : 'mr-2'
                ]"
            >
                <slot name="leftIcon" :color="activeTextColor" :disabled="disabled">
                    <UIcon
                        v-if="leftIcon"
                        :value="leftIcon"
                        v-bind="{
                            size: sizeFrames.iconSize,
                            color: activeTextColor,
                            'stroke-width': '2.5',
                            ...leftIconProps
                        }"
                    />
                </slot>
            </div>
            <div class="relative top-px">
                <slot>
                    {{ label }}
                </slot>
            </div>
            <div
                v-if="rightIcon || slots.rightIcon"
                class="u-button-right-icon-wrapper"
                :class="[
                    text ? 'ml-1.5' : 'ml-2'
                ]"
            >
                <slot name="rightIcon" :color="activeTextColor" :disabled="disabled">
                    <UIcon
                        v-if="rightIcon"
                        :value="rightIcon"
                        v-bind="{
                            size: sizeFrames.iconSize,
                            color: activeTextColor,
                            'stroke-width': '2.5',
                            ...rightIconProps
                        }"
                    />
                </slot>
            </div>
        </div>
        <div v-else class="flex gap-[7px] items-center u-button-icon-style-solid-bg">
            <div
                class="u-button-icon-style-icon flex items-center justify-center relative "
            >
                <UIcon
                    v-if="icon"
                    v-bind="iconProps"
                    :value="icon"
                    :size="sizeFrames.iconSize + 1"
                    :color="iconStyleIconTextColor"
                    stroke-width="2.5"
                />
            </div>

            <div
                v-if="label"
                class="u-button-icon-style-label top-px relative"
            >
                {{ label }}
            </div>
        </div>
        <div v-if="loading && !disabled" class="u-button-loading"/>
    </button>
</template>

<script setup lang="ts">
import UIcon from '~/ui/UIcon.vue'
import { useColor } from '~/ui/composables/useColor'
import { useRounded } from '~/ui/composables/useRounded'
import { Breakpoints } from "~/types/global";
import { v4 } from "uuid";

const { $getBreakpointValue } = useNuxtApp()

export interface Props {
    /* Basic */
    color?: string
    textColor?: string
    iconStyleIconTextColor?: string
    fontWeight?: number | string
    fontSize?: number
    borderWidth?: string | number
    rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

    /* Sizing */
    size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string

    /* Types */
    plain?: boolean
    text?: boolean,

    /* Content */
    label?: any

    /* States */
    loading?: boolean
    disabled?: boolean | number
    inactive?: boolean

    /* States Styles */
    disabledTextColor?: string
    disabledColor?: string

    /* Other */
    rightIcon?: string
    leftIcon?: string
    rightIconProps?: any
    leftIconProps?: any
    iconStyle?: boolean
    icon?: string
    iconProps?: any
}

const defaults = {
    color: '#49BBBD',
    iconStyleIconTextColor: '#ffffff',
    borderWidth: 1,
    size: 'md',
    rounded: 'xl',
    textColor: '#ffffff',
    fontWeight: 700,
    loading: false,
    disabled: false,
    disabledColor: '#E6E6E6',
    disabledTextColor: '#8A8A8A',
}


const props = withDefaults(defineProps<Props>(), {
    color: '#49BBBD',
    borderWidth: 1,
    size: 'md',
    rounded: 'xl',
    textColor: '#ffffff',
    iconStyleIconTextColor: '#ffffff',
    fontWeight: 700,
    loading: false,
    disabled: false,
    disabledColor: '#E6E6E6',
    disabledTextColor: '#8A8A8A',
})


const emit = defineEmits<{
    click: []
}>()

const slots = defineSlots<{
    default?(): any
    'rightIcon'?(): any
    'leftIcon'?(): any
}>()

const handleClick = () => {
    if (!props.loading && !props.loading && !props.disabled) emit('click')
}

const { color: _color } = useColor(() => props.color)
const { color: _textColor } = useColor(() => props.textColor)
const { rounded: _rounded } = useRounded(() => props.rounded)

const activeColor = computed(() => props.disabled ? props.disabledColor : _color.value)
const activeTextColor = computed(() =>
    props.disabled ?
        props.disabledTextColor :
        (props.text || props.plain || props.iconStyle) ?
            (props.color === defaults.color) ? '#49BBBD' : _color.value
            : _textColor.value
)

const sizeFrames = computed(() => {
    let size = props.size

    if (props.size.startsWith('~') && /\b((base|2xs|xs|sm|md|lg|xl|2xl):(2xs|xs|sm|md|lg|xl|2xl)|(2xs|xs|sm|md|lg|xl|2xl):(base|2xs|xs|sm|md|lg|xl|2xl))\b/.test(props.size)) {
        const frames = Object.fromEntries(props.size
            .replace('~', '')
            .split(' ')
            .map(frame => {
                return [frame.split(':')[0], frame.split(':')[1]]
            })) as Record<Breakpoints, any>
        size = $getBreakpointValue(frames).value
    }

    switch (size) {
        case 'xs':
            return { padding: '3px 10px', iconStylePadding: '2px', fontSize: 14, iconSize: 13 }
        case 'sm':
            return { padding: '4px 13px', iconStylePadding: '4px', fontSize: 15, iconSize: 13 }
        case 'md':
            return { padding: '6px 16px', iconStylePadding: '6px', fontSize: 16, iconSize: 15 }
        case 'lg':
            return { padding: '8px 18px', iconStylePadding: '8px', fontSize: 16, iconSize: 15 }
        case 'xl':
            return { padding: '12px 21px', iconStylePadding: '10px', fontSize: 16, iconSize: 19 }
        default:
            return { padding: '6px 16px', iconStylePadding: '6px', fontSize: 16, iconSize: 15 }
    }
})

const styles = computed(() => ({
    'border': props.plain ? `${props.borderWidth}px solid ${activeColor.value}` : '',
    'padding': props.iconStyle ? '' : sizeFrames.value.padding,
    'borderRadius': props.iconStyle ? '' : _rounded.value,
    'color': activeTextColor.value,
    'fontWeight': props.text ? 700 : props.fontWeight,
    'fontSize': `${props.fontSize || sizeFrames.value.fontSize}px`,
    'filter': props.loading ? 'grayscale(0.3)' : '',
    '--u-button-background-color': props.text ? 'transparent' : activeColor.value,
    '--u-button-text-color': activeTextColor.value,
    '--u-button-background-hover-opacity': (props.disabled || props.loading) ? '1' : props.plain ? '0.1' : '0.8',
    '--u-button-background-opacity': (props.plain || props.text) ? '0' : '1',
    '--u-button-hover-color': props.text ? activeColor.value : activeTextColor.value,
    '--u-button-padding': sizeFrames.value.iconStylePadding,
}))

</script>

<style scoped lang="scss">
.u-button-solid-bg:hover {
    color: var(--u-button-hover-color) !important;
}

.u-button-plain:hover:after {
    content: '';
    position: absolute;
    transition-duration: 0.1s;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background: var(--u-button-text-color);
    opacity: 0.2;
}

.u-button-solid-bg::after {
    content: '';
    position: absolute;
    transition-duration: 0.1s;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background: var(--u-button-background-color);
    opacity: var(--u-button-background-opacity);
}

.u-button-icon-style-solid-bg .u-button-icon-style-icon::after {
    content: '';
    position: absolute;
    transition-duration: 0.1s;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background: var(--u-button-background-color);
    opacity: var(--u-button-background-opacity);
}

.u-button-solid-bg::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -2;
    background: white;
}


.u-button-icon-style-solid-bg:hover .u-button-icon-style-label {
    opacity: var(--u-button-background-hover-opacity);
}

.u-button-icon-style-solid-bg .u-button-icon-style-icon::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -2;
    background: white;
}

.u-button-solid-bg:hover::after {
    content: '';
    position: absolute;
    opacity: var(--u-button-background-hover-opacity);
}

.u-button-icon-style-solid-bg:hover .u-button-icon-style-icon::after {
    content: '';
    position: absolute;
    opacity: var(--u-button-background-hover-opacity);
}

.u-button-loading::after {
    content: "";
    position: absolute;
    height: 100%;
    top: 0;
    left: -100%;
    transform: skewX(-30deg);
    width: 205%;
    background-image: linear-gradient(90deg, #00C0FF 0%, #FFCF00 49%, #FC4F4F 80%, #3268de 100%);
    opacity: 0.5;
    animation: slidebg 1s linear infinite alternate;
}

.u-button-icon-style-icon {
    padding: var(--u-button-padding);
    border-radius: 50%;
    overflow: hidden;
}

@keyframes slidebg {
    to {
        left: 0;
    }
}
</style>
