<template>
    <div v-bind="{ class: attrs.class }" :class="{ 'prevent-select': !selection }">
        <p
            v-if="props.label"
            class="font-medium text-base"
            :style="[sizeFrames.labelStyles, { color: textColor }]"
            :class="labelClass"
        >
            {{ props.label }} <span class="text-red-500 -ml-[2px] inline-block" v-if="required">*</span>
        </p>
        <ElInput
            class="u-input [&>div]:!shadow-[inset_0_0_0_1px_var(--u-input-color)] [&_input]:text-base [&_input]:text-[var(--u-input-text-color)]"
            :model-value="modelValue"
            v-bind="{ ...attrs, class: inputClass }"
            :max="max"
            :min="min"
            :style="styles"
            :type="passwordVisible ? 'text' : (type as string)"
            :required="required"
            :maxlength="maxlenght as string"
            ref="Input"
            @update:model-value="handleUpdate"
            @keypress="handleKeypress"
            @blur="handleBlur"
            @keydown.enter="emit('enter')"
        >
            <template #prefix>
                <UIcon
                    v-if="leftIcon"
                    class="[&_svg]:!text-[var(--u-input-text-color)]"
                    :value="leftIcon"
                    :size="sizeFrames.iconSizes.default"
                />
                <UIcon
                    v-else-if="type === 'email'"
                    class="[&_svg]:!text-[var(--u-input-text-color)]"
                    value="Envelope"
                />
                <slot name="prefix" v-else></slot>
            </template>
            <template #suffix>
                <UIcon
                    v-if="rightIcon"
                    :value="rightIcon"
                    :tag="rightIconButton?'button':undefined"
                    :size="sizeFrames.iconSizes.default"
                    :color="color"
                    @click="emit('click:rightIcon')"
                />
                <UIcon
                    v-else-if="type === 'password' && passwordAppearance"
                    :value="passwordVisible ? 'Eye' : 'EyeSlash'"
                    :size="sizeFrames.iconSizes.default"
                    tag="button"
                    @click.stop="passwordVisible = !passwordVisible"
                />
                <div v-else-if="type === 'number' && numberAppearance" class="flex flex-col">
                    <UIcon
                        value="Plus"
                        class="rounded border"
                        :style="{ border: `1px solid ${color}` }"
                        tag="button"
                        :size="sizeFrames.iconSizes.plus"
                        :color="color"
                        @click.stop="handleNumberChange('increase')"
                    />
                    <UIcon
                        value="Minus"
                        class="mt-[2px] rounded border"
                        :style="{ border: `1px solid ${color}` }"
                        tag="button"
                        :size="sizeFrames.iconSizes.plus"
                        :color="color"
                        @click.stop="handleNumberChange('decrease')"
                    />
                </div>
                <slot name="suffix" v-else></slot>
            </template>
        </ElInput>
        <div class="flex">
            <ul class="h-6" v-if="infoLine"></ul>
            <div class="grow">
                <ul v-if="(props.hideErrors || activeErrors.length)"
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
            <p
                v-if="maxlenght"
                class="text-xs flex justify-end mt-[3px] mr-1 font-medium shrink-0 ml-3 text-gray-500"
                :class="{'!text-red-500': (activeErrors.length && !hideErrors) || errorState}"
            >
                {{ (modelValue as string).length }}/{{ maxlenght }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import UIcon from '~/ui/UIcon.vue'
import { useColor } from "~/ui/composables/useColor";
import { useRounded } from "~/ui/composables/useRounded";
import { useSize } from "~/ui/composables/useSize";

defineOptions({
    inheritAttrs: false,
})

export interface Props {
    modelValue?: string | null | number
    label?: string
    inputClass?: string
    labelClass?: string
    type?: 'text' | 'email' | 'password' | 'number'
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
    max?: string | number
    min?: string | number,
    hint?: string,
    required?: boolean,
    color?: string,
    textColor?: string,
    rounded?: string,
    maxlenght?: string,
    infoLine?: boolean,
    fontSize?: string | number
}

const props = withDefaults(defineProps<Props>(), {
    inputClass: '',
    type: 'text',
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
    rounded: 'xl',
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


const isPrefixed = computed(() => slots.prefix || props.leftIcon || props.type === 'email')
const isSuffixed = computed(
    () => slots.suffix || props.rightIcon || (props.type === 'password' && props.passwordAppearance)
)

const sizeFrames = computed(() => {
    switch (props.size) {
        case 'xs':
            return {
                height: 32,
                paddingContent: '1px 6px',
                padding: `0 ${isSuffixed.value ? '1px' : '2px'} 0 ${
                    isPrefixed.value ? '1px' : '2px'
                }`,
                labelStyles: { marginBottom: '3px' },
                iconSizes: {
                    default: 24,
                    plus: 15,
                },
            }
        case 'sm':
            return {
                height: 36,
                paddingContent: '1px 8px',
                padding: `0 ${isSuffixed.value ? '2px' : '4px'} 0 ${
                    isPrefixed.value ? '2px' : '4px'
                }`,
                labelStyles: { marginBottom: '5px' },
                iconSizes: {
                    default: 24,
                    plus: 15,
                },
            }
        case 'md':
            return {
                height: 48,
                paddingContent: '1px 16px',
                padding: `0 ${isSuffixed.value ? '3px' : '6px'} 0 ${
                    isPrefixed.value ? '3px' : '6px'
                }`,
                labelStyles: { marginBottom: '6px' },
                iconSizes: {
                    default: 24,
                    plus: 13,
                },
            }
        case 'lg':
            return {
                height: 56,
                paddingContent: '1px 20px',
                padding: `0 ${isSuffixed.value ? '4px' : '8px'} 0 ${
                    isPrefixed.value ? '4px' : '8px'
                }`,
                labelStyles: { marginBottom: '10px' },
                iconSizes: {
                    default: 24,
                    plus: 15,
                },
            }
        case 'xl':
            return {
                height: 64,
                paddingContent: '1px 24px',
                padding: `0 ${isSuffixed.value ? '5px' : '10px'} 0 ${
                    isPrefixed.value ? '5px' : '10px'
                }`,
                labelStyles: { marginBottom: '12px' },
                iconSizes: {
                    default: 24,
                    plus: 15,
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


const { color } = useColor(computed(() => (activeErrors.value.length && !props.hideErrors) || props.errorState ? '#DC2626' : props.color))
const { color: textColor } = useColor(computed(() => (activeErrors.value.length && !props.hideErrors) || props.errorState ? '#DC2626' : props.textColor))
const { rounded } = useRounded(props.rounded)
const { size: fontSize } = useSize(props.size)


const styles = computed(() => ({
    'height': `${sizeFrames.value.height}px`,
    '--u-input-padding': sizeFrames.value.padding,
    '--u-input-padding-content': sizeFrames.value.paddingContent,
    '--u-input-color': color.value,
    '--u-input-text-color': textColor.value,
    '--u-input-rounded': rounded.value,
    '--u-input-font-size': fontSize.value
}))

const passwordVisible = ref(false)

const handleUpdate = (value: Props['modelValue']) => {
    emit('update:modelValue', value)
}

const handleKeypress = (event: any) => {
    if (props.type === 'number') {
        if (event.key === 'e') return event.preventDefault()
        const value = event.target.value + event.key

        if (event.target.value !== '') {
            if (parseInt(value) < parseInt(event.target.min)) {
                event.target.value = event.target.min
                emit('update:modelValue', event.target.min)
                event.preventDefault()
            }

            if (parseInt(value) > parseInt(event.target.max)) {
                event.target.value = event.target.max
                emit('update:modelValue', event.target.max)
                event.preventDefault()
            }
        }
    }
}

const handleBlur = (event: any) => {
    if (props.type === 'number') {
        const value = event.target.value

        if (event.target.value !== '') {
            if (parseInt(value) < parseInt(event.target.min)) {
                event.target.value = event.target.min
                emit('update:modelValue', event.target.min)
                emit('change-number', event.target.min)
            }

            if (parseInt(value) > parseInt(event.target.max)) {
                event.target.value = event.target.max
                emit('update:modelValue', event.target.max)
                emit('change-number', event.target.max)
            }
            emit('change-number', event.target.value)
        }
    }
}

const handleNumberChange = (action: string) => {
    const v = (parseInt(props.modelValue as string) || 0) + (action === 'decrease' ? -1 : 1)
    const min = parseInt(props.min as string)
    const max = parseInt(props.max as string)

    if (v < min) emit('update:modelValue', min.toString())
    else if (v > max) emit('update:modelValue', max.toString())
    else emit('update:modelValue', v)
}

const Input = ref()

defineExpose({
    input: Input
})

</script>

<style scoped lang="scss">
.u-input :deep(input) {
    padding: var(--u-input-padding);
    font-size: var(--u-input-font-size);

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
}

.u-input :deep(> div) {
    padding: var(--u-input-padding-content);
    border-radius: var(--u-input-rounded);
}

.u-input :deep(.el-input__wrapper) {
    transition-duration: 0ms !important;
}
</style>
