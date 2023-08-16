<template>
    <div v-bind="{ class: attrs.class }" :class="{ 'prevent-select': !selection }">
        <p
            class="font-medium"
            v-if="props.label"
            :style="[sizeFrames.labelStyles, { color: textColor }]"
            :class="labelClass"
        >
            {{ props.label }}
        </p>
        <ElInput
            v-bind="{ ...attrs, class: inputClass }"
            :style="styles"
            class="u-input [&>div]:rounded-full [&>div]:!shadow-[0_0_0_1px_var(--color)] [&_input]:text-base [&_input]:text-[var(--text-color)]"
            :type="passwordVisible ? 'text' : (type as string)"
        >
            <template #prefix>
                <UIcon
                    v-if="leftIcon"
                    :value="leftIcon"
                    class="[&_svg]:!text-[var(--text-color)]"
                />
                <UIcon
                    value="Envelope"
                    v-else-if="type === 'email'"
                    class="[&_svg]:!text-[var(--text-color)]"
                />
                <slot name="prefix" v-else></slot>
            </template>
            <template #suffix>
                <UIcon v-if="rightIcon" :value="rightIcon" />
                <UIcon
                    v-else-if="type === 'password' && passwordAppearance"
                    :value="passwordVisible ? 'Eye' : 'EyeSlash'"
                    @click.stop="passwordVisible = !passwordVisible"
                    tag="button"
                />
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

const slots = defineSlots<{
    prefix?(): any
    suffix?(): any
}>()

export interface Props {
    label?: string
    inputClass?: string
    labelClass?: string
    type?: 'text' | 'email' | 'password'
    passwordAppearance?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    leftIcon?: string
    rightIcon?: string
    selection?: boolean
    errors?: Array<any>
    errorsCount?: number
    hideErrors?: boolean | number
    errorState?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    inputClass: '',
    type: 'text',
    size: 'md',
    passwordAppearance: true,
    selection: false,
    errors: () => [],
    errorsCount: 3,
})

const attrs = useAttrs()

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
            }
        case 'sm':
            return {
                height: 40,
                paddingContent: '1px 12px',
                padding: `0 ${isSuffixed.value ? '2px' : '4px'} 0 ${
                    isPrefixed.value ? '2px' : '4px'
                }`,
                labelStyles: { marginBottom: '5px' },
            }
        case 'md':
            return {
                height: 48,
                paddingContent: '1px 16px',
                padding: `0 ${isSuffixed.value ? '3px' : '6px'} 0 ${
                    isPrefixed.value ? '3px' : '6px'
                }`,
                labelStyles: { marginBottom: '6px' },
            }
        case 'lg':
            return {
                height: 56,
                paddingContent: '1px 20px',
                padding: `0 ${isSuffixed.value ? '4px' : '8px'} 0 ${
                    isPrefixed.value ? '4px' : '8px'
                }`,
                labelStyles: { marginBottom: '10px' },
            }
        case 'xl':
            return {
                height: 64,
                paddingContent: '1px 24px',
                padding: `0 ${isSuffixed.value ? '5px' : '10px'} 0 ${
                    isPrefixed.value ? '5px' : '10px'
                }`,
                labelStyles: { marginBottom: '12px' },
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
}

.u-input :deep(> div) {
    padding: var(--u-input-padding-content);
}
</style>
