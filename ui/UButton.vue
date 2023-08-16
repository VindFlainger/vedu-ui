<template>
    <button
        :style="styles"
        @click="handleClick"
        :class="{
            'u-button-bg': !plain,
            'cursor-not-allowed': disabled,
            'cursor-default': loading,
        }"
        class="relative overflow-hidden selection:bg-none"
    >
        <div class="flex items-center justify-center">
            <div class="mr-2" v-if="icon || slots.leftIcon">
                <slot name="leftIcon">
                    <UIcon
                        v-if="icon"
                        v-bind="rightIconProps"
                        :value="icon"
                        :size="15"
                        :color="textColor"
                        stroke-width="2.5"
                    />
                </slot>
            </div>
            <slot>
                <span class="top-px">
                    {{ label }}
                </span>
            </slot>
            <div v-if="loading && !disabled" class="ml-2">
                <LoaderIcon :width="fontSize - 2" :fill="textColor" :height="fontSize - 2" />
            </div>
            <div class="ml-2" v-else-if="icon || slots.rightIcon">
                <slot name="rightIcon">
                    <UIcon
                        v-if="icon"
                        v-bind="rightIconProps"
                        :value="icon"
                        :size="15"
                        :color="textColor"
                        stroke-width="2.5"
                    />
                </slot>
            </div>
        </div>
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
    icon?: string
    rightIconProps: any
    label?: any
}

const props = withDefaults(defineProps<Props>(), {
    color: 'primary-700',
    borderWidth: 1,
    size: 'md',
    rounded: 'xl',
    textColor: 'white',
    fontWeight: 500,
    fontSize: 16,
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

const { color } = useColor(props.color)
const { color: textColor } = useColor(props.textColor)
const { rounded } = useRounded(props.rounded)

const sizeFrames = computed(() => {
    switch (props.size) {
        case 'xs':
            return { padding: '3px 8px', iconSize: '' }
        case 'sm':
            return { padding: '4px 10px' }
        case 'md':
            return { padding: '6px 16px' }
        case 'lg':
            return { padding: '8px 18px' }
        case 'xl':
            return { padding: '12px 21px' }
    }
})

const styles = computed(() => ({
    border: props.plain ? `${props.borderWidth}px solid ${color.value}` : '',
    padding: sizeFrames.value.padding,
    borderRadius: rounded.value,
    color: props.disabled ? props.disabledTextColor : textColor.value,
    fontWeight: props.fontWeight,
    fontSize: `${props.fontSize}px`,
    '--color': props.disabled ? props.disabledColor : color.value,
    '--hover-opacity': props.disabled || props.loading ? '1' : '0.8',
    filter: props.loading ? 'grayscale(0.3)' : '',
}))
</script>

<style scoped lang="scss">
.u-button-bg::after {
    content: '';
    position: absolute;
    transition-duration: 0.1s;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background: var(--color);
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
    opacity: var(--hover-opacity);
}
</style>
