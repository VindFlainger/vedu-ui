<template>
    <label class="flex items-center" :class="{ 'prevent-select': !selection }">
        <div :style="checkboxStyles" class="u-checkbox-box rounded-sm outline outline-1 relative"
             :class="{'!rounded-full': radioStyle}">
            <UIcon
                v-if="checked && !solid && !radioStyle"
                :color="color"
                value="Check"
                :size="checkboxMetrics.wh"
                stroke-width="2.5"
            />
            <div
                v-else-if="checked && solid"
                :style="{backgroundColor: markerColor}"
                class="h-full w-full rounded bg-clip-content p-[2px]"
            />
            <div
                v-else-if="checked && radioStyle"
                :style="{backgroundColor: markerColor}"
                class="h-full w-full rounded-full bg-clip-content p-[15%]"
            />
        </div>
        <input
            class="hidden"
            type="checkbox"
            :class="checkboxClass"
            :checked="checked"
            @change="checked = $event"
        />
        <span class="ml-2" :class="labelClass" v-if="label || $slots.default">
            <slot>
                <span>{{ label }}</span>
            </slot>
        </span>
    </label>
</template>

<script setup lang="ts">
import { useColor } from '~/ui/composables/useColor'

export interface Props {
    label?: string
    labelClass?: string
    checkboxClass?: string
    value?: string | number | null
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    modelValue?: boolean | Array<string | number | null | undefined>
    selection?: boolean
    solid?: boolean
    color?: string
    markerColor?: string
    radioStyle?: boolean,
    returnValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    selection: false,
    color: 'black',
    markerColor: 'primary-900'
})
const emit = defineEmits<{
    'update:modelValue': [v: Props['modelValue']]
}>()

const attrs = useAttrs()

const { color } = useColor(() => props.color)
const { color: markerColor } = useColor(() => props.markerColor)


const checked = computed({
    get() {
        if (Array.isArray(props.modelValue)) return props.modelValue.includes(props.value)
        else return props.returnValue ? props.modelValue === props.value : props.modelValue
    },
    set(event: any) {
        const checked = event.target.checked

        if (Array.isArray(props.modelValue)) {
            if (!checked)
                emit(
                    'update:modelValue',
                    props.modelValue.filter((value) => value !== props.value)
                )
            if (checked) emit('update:modelValue', [...props.modelValue, props.value])
        } else emit('update:modelValue', props.returnValue ? props.value : checked)
    },
})

const checkboxMetrics = computed(() => {
    switch (props.size) {
        case 'xs':
            return { wh: 8 }
        case 'sm':
            return { wh: 10 }
        case 'md':
            return { wh: 12 }
        case 'lg':
            return { wh: 16 }
        case 'xl':
            return { wh: 20 }
    }
})

const checkboxStyles = computed(() => ({
    minHeight: `${checkboxMetrics.value.wh}px`,
    height: `${checkboxMetrics.value.wh}px`,
    minWidth: `${checkboxMetrics.value.wh}px`,
    width: `${checkboxMetrics.value.wh}px`,
    outlineColor: color.value,
}))
</script>
