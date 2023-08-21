<template>
    <div v-bind="{ class: attrs.class }" :class="{ 'prevent-select': !selection }">
        <p
            v-if="props.label"
            class="font-medium"
            :style="[sizeFrames.labelStyles, { color: textColor }]"
            :class="labelClass"
        >
            {{ props.label }}
        </p>
        <ElInput
            class="u-input [&>div]:rounded-full [&>div]:!shadow-[0_0_0_1px_var(--color)] [&_input]:text-base [&_input]:text-[var(--text-color)]"
            :model-value="modelValue"
            v-bind="{ ...attrs, class: inputClass }"
            :max="max"
            :min="min"
            :style="styles"
            :type="passwordVisible ? 'text' : (type as string)"
            @update:model-value="handleUpdate"
            @keypress="handleKeypress"
            @blur="handleBlur"
        >
            <template #prefix>
                <UIcon
                    v-if="leftIcon"
                    class="[&_svg]:!text-[var(--text-color)]"
                    :value="leftIcon"
                    :size="sizeFrames.iconSizes.default"
                />
                <UIcon
                    v-else-if="type === 'email'"
                    class="[&_svg]:!text-[var(--text-color)]"
                    value="Envelope"
                />
                <slot name="prefix" v-else></slot>
            </template>
            <template #suffix>
                <UIcon v-if="rightIcon" :value="rightIcon" :size="sizeFrames.iconSizes.default" />
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
        <ul v-if="!props.hideErrors" class="mt-1 pl-2 text-sm text-red-500">
            <li
                v-for="error in errors.slice(0, errorsCount)"
                :key="error"
                :class="{ 'ml-3 list-disc': errors.length > 1 && errorsCount > 1 }"
            >
                {{ error }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import UIcon from '~/ui/UIcon.vue'

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
    selection?: boolean
    errors?: Array<any>
    errorsCount?: number
    hideErrors?: boolean | number
    errorState?: boolean
    max?: string | number
    min?: string | number
}

const props = withDefaults(defineProps<Props>(), {
    inputClass: '',
    type: 'text',
    size: 'md',
    passwordAppearance: true,
    numberAppearance: true,
    selection: false,
    errors: () => [],
    errorsCount: 3,
})

const attrs = useAttrs()

const slots = defineSlots<{
    prefix?(): any
    suffix?(): any
}>()

const emit = defineEmits<{
    'update:modelValue': [v: Props['modelValue']]
}>()

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
            }

            if (parseInt(value) > parseInt(event.target.max)) {
                event.target.value = event.target.max
                emit('update:modelValue', event.target.max)
            }
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

const isPrefixed = computed(() => slots.prefix || props.leftIcon || props.type === 'email')
const isSuffixed = computed(
    () => slots.suffix || props.rightIcon || (props.type === 'password' && props.passwordAppearance)
)

const sizeFrames = computed(() => {
    switch (props.size) {
        case 'xs':
            return {
                height: 32,
                paddingContent: '1px 8px',
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
                height: 40,
                paddingContent: '1px 12px',
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

const color = computed(() =>
    (props.errors.length && !props.hideErrors) || props.errorState ? '#DC2626' : '#49BBBD'
)
const textColor = computed(() =>
    (props.errors.length && !props.hideErrors) || props.errorState ? '#DC2626' : '#000000'
)

const styles = computed(() => ({
    '--u-input-padding': sizeFrames.value.padding,
    '--u-input-padding-content': sizeFrames.value.paddingContent,
    '--color': color.value,
    '--text-color': textColor.value,
    height: `${sizeFrames.value.height}px`,
}))

const passwordVisible = ref(false)
</script>

<style scoped lang="scss">
.u-input :deep(input) {
    padding: var(--u-input-padding);
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
}

.u-input :deep(> div) {
    padding: var(--u-input-padding-content);
}
</style>
