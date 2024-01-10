<template>
    <button
        :style="styles"
        @click="handleClick"
        :class="{
            'u-button-bg': !plain && !text,
            'cursor-not-allowed': disabled,
        }"
        class="relative overflow-hidden selection:bg-none z-10 u-button duration-150 transition-colors"
    >
        <div v-if="!iconStyle" class="flex items-center justify-center">
            <div class="mr-2" v-if="leftIcon || slots.leftIcon">
                <slot name="leftIcon" :color="activeTextColor" :disabled="disabled">
                    <UIcon
                        v-if="leftIcon"
                        v-bind="leftIconProps"
                        :value="leftIcon"
                        :size="sizeFrames.iconSize"
                        :color="activeTextColor"
                        stroke-width="2.5"
                    />
                </slot>
            </div>
            <div>
                <slot>
                    <span>
                        {{ label }}
                    </span>
                </slot>
            </div>
            <div class="ml-2" v-if="rightIcon || slots.rightIcon">
                <slot name="rightIcon" :color="activeTextColor" :disabled="disabled">
                    <UIcon
                        v-if="rightIcon"
                        v-bind="rightIconProps"
                        :value="rightIcon"
                        :size="sizeFrames.iconSize"
                        :color="activeTextColor"
                        stroke-width="2.5"
                    />
                </slot>
            </div>
        </div>
        <div v-else>
            <UIcon
                v-if="icon"
                v-bind="iconProps"
                :value="icon"
                :size="sizeFrames.iconSize + 1"
                :color="activeTextColor"
                stroke-width="2.5"
            />
        </div>
        <div v-if="loading && !disabled" class="u-button-loading"/>
    </button>
</template>

<script setup lang="ts">
import UIcon from '~/ui/UIcon.vue'
import { useColor } from '~/ui/composables/useColor'
import { useRounded } from '~/ui/composables/useRounded'
import LoaderIcon from '~/ui/icons/LoaderIcon.vue'

export interface Props {
    color?: string
    textColor?: string
    fontWeight?: number | string
    fontSize?: number
    plain?: boolean
    borderWidth?: string | number
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    loading?: boolean
    disabled?: boolean | number
    inactive?: boolean
    disabledTextColor?: string
    disabledColor?: string
    rightIcon?: string
    leftIcon?: string
    rightIconProps?: any
    leftIconProps?: any
    label?: any
    iconStyle?: boolean,
    icon?: string,
    iconProps?: any,
    text?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    color: 'primary-700',
    borderWidth: 1,
    size: 'md',
    rounded: 'xl',
    textColor: 'white',
    fontWeight: 500,
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

const { color: _color } = useColor(props.color)
const { color: _textColor } = useColor(props.textColor)
const { rounded } = useRounded(props.rounded)

const activeColor = computed(() => props.disabled ? props.disabledColor : _color.value)
const activeTextColor = computed(() => props.disabled ? props.disabledTextColor : props.text && props.textColor === 'white' ? '#000000' : _textColor.value)

const sizeFrames = computed(() => {
    switch (props.size) {
        case 'xs':
            return { padding: '3px 10px', iconStylePadding: '2px', fontSize: 14, iconSize: 13 }
        case 'sm':
            return { padding: '4px 13px', iconStylePadding: '4px', fontSize: 15, iconSize: 13 }
        case 'md':
            return { padding: '6px 16px', iconStylePadding: '6px', fontSize: 16, iconSize: 15 }
        case 'lg':
            return { padding: '8px 18px', iconStylePadding: '8px', fontSize: 16, iconSize: 15 }
        case 'xl':
            return { padding: '12px 21px', iconStylePadding: '12px', fontSize: 16, iconSize: 15 }
    }
})

const styles = computed(() => ({
    border: props.plain ? `${props.borderWidth}px solid ${activeColor.value}` : '',
    padding: props.iconStyle ? sizeFrames.value.iconStylePadding : sizeFrames.value.padding,
    borderRadius: props.iconStyle ? '50%' : rounded.value,
    color: activeTextColor.value,
    fontWeight: props.text ? 400 : props.fontWeight,
    fontSize: `${props.fontSize || sizeFrames.value.fontSize}px`,
    filter: props.loading ? 'grayscale(0.3)' : '',
    '--u-button-background-color': props.text ? 'transparent' : activeColor.value,
    '--u-button-hover-opacity': props.disabled || props.loading ? '1' : '0.8',
    '--u-button-hover-color': props.text ? activeColor.value : activeTextColor.value,
}))
</script>

<style scoped lang="scss">
.u-button:hover{
    color: var(--u-button-hover-color) !important;
}

.u-button-bg::after {
    content: '';
    position: absolute;
    transition-duration: 0.1s;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background: var(--u-button-background-color);
}

.u-button-bg::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -2;
    background: white;
}

.u-button-bg:hover::after {
    content: '';
    position: absolute;
    opacity: var(--u-button-hover-opacity);
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

@keyframes slidebg {
    to {
        left: 0;
    }
}
</style>
