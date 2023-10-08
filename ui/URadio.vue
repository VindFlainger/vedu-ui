<template>
    <label class="flex items-center" :class="{ 'prevent-select': !selection }">
        <div :style="checkboxStyles" class="rounded-sm outline outline-1">
            <UIcon
                v-if="checked && !solid"
                :color="color"
                value="Check"
                :size="checkboxMetrics.wh"
                stroke-width="2.5"
            />
            <div
                v-else-if="checked && solid"
                class="h-full w-full rounded bg-black bg-clip-content p-[2px]"
            />
        </div>
        <input
            class="hidden"
            type="radio"
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
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    selection: false,
    color: 'black',
})
const emit = defineEmits<{
    'update:modelValue': [v: Props['modelValue']]
}>()

const attrs = useAttrs()

const { color } = useColor(props.color)

const checked = computed({
    get() {
        if (Array.isArray(props.modelValue)) return props.modelValue.includes(props.value)
        else return props.modelValue
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
        } else emit('update:modelValue', checked)
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
    outlineColor: color,
}))
</script>
