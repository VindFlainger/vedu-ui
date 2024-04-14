<template>
    <div>
        <ULabel
            :description="description"
            :label="label"
            :required="required"
            :text-color="textColor"
            :style="sizeFrames.labelStyles"
            :questionIndicatorColor="isErrorState ? errorStateColor : undefined"
        />
        <VueDatePicker
            :teleport="true"
            v-bind="attrs"
            class="u-input [&_input]:!shadow-[inset_0_0_0_1px_var(--u-input-color)] [&_input]:h-[var(--u-input-height)] [&_input.dp\_\_disabled]:!bg-gray-100/80
                [&_input]:text-[var(--u-input-text-color)] [&_input]:rounded-[var(--u-input-rounded)]  [&_input]:border-none font-fa
            "
            :model-value="modelValue"
            :style="styles"
            :enable-time-picker="false"
            @update:model-value="emit('update:modelValue', $event)"

        >
            <template #input-icon>
                <UIcon value="Calendar" class="relative left-2" :size="sizeFrames.iconSizes.calendar"/>
            </template>
        </VueDatePicker>
        <div class="flex">
            <ul class="h-6" v-if="infoLine"></ul>
            <div class="grow">
                <ul v-if="!props.hideErrors && activeErrors.length"
                    class="mt-1 pl-2 text-[13px] sm:text-sm text-red-500">
                    <li
                        v-for="error in (activeErrors as Array<any>).slice(0, errorsCount as number)"
                        :key="error"
                        :class="{ 'ml-3 list-disc': (activeErrors as Array<any>).length > 1 && errorsCount > 1 }"
                    >
                        {{ error }}
                    </li>
                </ul>
                <ul v-if="(props.hideErrors || !activeErrors.length) && activeSuccesses.length"
                    class="mt-1 pl-2 text-[13px] sm:text-sm text-green-500">
                    <li
                        v-for="success in (activeSuccesses as Array<any>)"
                        :key="success"
                        :class="{ 'ml-3 list-disc': (activeSuccesses as Array<any>).length > 1}"
                    >
                        {{ success }}
                    </li>
                </ul>
                <div v-if="(props.hideErrors || !activeErrors.length) && (hint || slots.hint)" class="mt-2">
                    <slot name="hint">
                        <p class="text-[13px] sm:text-sm ml-2 text-gray-500">{{ hint }}</p>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useColor } from "~/ui/composables/useColor";
import { useRounded } from "~/ui/composables/useRounded";
import { useSize } from "~/ui/composables/useSize";

const errorStateColor = '#DC2626'

defineOptions({
    inheritAttrs: false,
})

export interface Props {
    modelValue?: any
    label?: string
    inputClass?: string
    labelClass?: string
    passwordAppearance?: boolean
    numberAppearance?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    leftIcon?: string
    rightIcon?: string
    rightIconButton?: boolean,
    selection?: boolean
    errors?: Array<any>
    errorsCount?: number
    hideErrors?: boolean | number
    conditions?: [string, 'success' | 'error', any][],
    errorState?: boolean
    required?: boolean,
    color?: string,
    textColor?: string,
    rounded?: string,
    infoLine?: boolean,
    fontSize?: string | number,
    description?: string,
    labelProps?: any,
    hint?: string
}

const props = withDefaults(defineProps<Props>(), {
    inputClass: '',
    size: 'sm',
    passwordAppearance: true,
    numberAppearance: true,
    selection: false,
    errors: () => [],
    errorsCount: 1,
    required: false,
    rightIconButton: false,
    color: 'gray-400',
    textColor: 'black',
    rounded: 'lg',
    fontSize: 14
})

const attrs = useAttrs()

const slots = defineSlots<{
    prefix?(): any
    suffix?(): any
    hint?(): any
}>()

const emit = defineEmits<{
    'update:modelValue': [v: Props['modelValue']],
    'change-number': [v: Props['modelValue']],
    'enter': [],
    'click:rightIcon': []
}>()

const sizeFrames = computed(() => {
    switch (props.size) {
        case 'xs':
            return {
                height: 32,
                labelStyles: { marginBottom: '3px', fontSize: '14px' },
                iconSizes: {
                    calendar: 16,
                },
            }
        case 'sm':
            return {
                height: 36,
                labelStyles: { marginBottom: '4px', fontSize: '15px' },
                iconSizes: {
                    calendar: 20,
                },
            }
        case 'md':
            return {
                height: 48,
                labelStyles: { marginBottom: '5px', fontSize: '16px' },
                iconSizes: {
                    calendar: 22,
                },
            }
        case 'lg':
            return {
                height: 56,
                labelStyles: { marginBottom: '7px', fontSize: '16px' },
                iconSizes: {
                    calendar: 24,
                },
            }
        case 'xl':
            return {
                height: 64,
                labelStyles: { marginBottom: '9px', fontSize: '16px' },
                iconSizes: {
                    calendar: 28,
                },
            }
    }
})

const activeErrors = computed(() => {
    const errors = []
    if (props.conditions) errors
        .push(
            ...props.conditions
                .filter(v => v[1] === 'error' && v[2])
                .map(v => v[0])
        )
    errors.push(...props.errors)
    return errors
})

const activeSuccesses = computed(() => {
    const successes = []
    if (props.conditions)
        successes
            .push(
                ...props.conditions
                    .filter(v => v[1] === 'success' && v[2])
                    .map(v => v[0])
            )
    return successes
})

const isErrorState = computed(()=> (activeErrors.value.length && !props.hideErrors) || props.errorState)

const { color } = useColor(computed(() => isErrorState.value ? errorStateColor : props.color))
const { color: textColor } = useColor(computed(() => isErrorState.value ? errorStateColor : props.textColor))
const { rounded } = useRounded(props.rounded)
const { size: fontSize } = useSize(props.fontSize)


const styles = computed(() => ({
    '--u-input-height': `${sizeFrames.value.height}px`,
    '--u-input-color': color.value,
    '--u-input-text-color': textColor.value,
    '--u-input-rounded': rounded.value,
    '--u-input-font-size': fontSize.value,
}))


const Input = ref()

defineExpose({
    input: Input
})

</script>


<style scoped lang="scss">
.u-input{
    font-family: Poppins, sans-serif;
}

.u-input :deep(input) {
    &::placeholder{
        opacity: 1;
        color: #a8abb2;
    }
    font-family: Poppins, sans-serif;
    font-size: var(--u-input-font-size);

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
}

</style>