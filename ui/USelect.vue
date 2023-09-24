<template>
    <client-only>
        <div v-bind="{ class: attrs.class }">
            <p
                v-if="props.label"
                class="font-medium"
                :style="[sizeFrames.labelStyles, { color: textColor }]"
                :class="labelClass"
            >
                {{ props.label }} <span class="text-red-500 -ml-[2px] inline-block" v-if="required">*</span>
            </p>
            <ElSelect
                v-bind="{ ...attrs, class: inputClass }"
                class="u-select w-full focus:!outline-none"
                :style="styles"
                @visible-change="active = $event"
                :collapse-tags="collapseTags"
                :max-collapse-tags="maxCollapseTags"
                @update:model-value="emit('update:modelValue', $event)"
                :model-value="modelValue"
                popper-class="u-select-popper"
                :placeholder="placeholder"
            >
                <template #default>
                    <ElOption
                        v-for="option in computedOptions"
                        :key="option.value"
                        :value="option.value"
                        :label="option.label"
                    >
                        <template #default="props">
                            <div
                                class="group"
                                :class="{
                                active: attrs.multiple
                                    ? modelValue?.includes(option.value)
                                    : option.value === modelValue,
                            }"
                            >
                                <div
                                    class="flex items-center"
                                    :class="{'group-[.active]:bg-primary-700/20': hideCheckboxStyle}"
                                    :style="{ padding: sizeFrames.paddingDropdownItem }"
                                >
                                    <UCheckbox
                                        v-if="!hideCheckboxStyle"
                                        size="sm"
                                        :model-value="
                                        attrs.multiple
                                            ? modelValue?.includes(option.value)
                                            : option.value === modelValue
                                    "
                                        color="primary-700"
                                    />
                                    <img
                                        v-if="option.img"
                                        :src="option.img"
                                        :style="sizeFrames.imageStyles"
                                        class="mr-2"
                                    />
                                    <span
                                        class="relative top-px text-gray-700"
                                        :class="{
                                        'group-[.active]:text-primary-700': !hideCheckboxStyle,
                                    }"
                                    >
                                    {{ option.label }}
                                </span>
                                </div>
                            </div>
                        </template>
                    </ElOption>
                </template>
                <template #prefix>
                    <UIcon
                        v-if="leftIcon"
                        class="[&_svg]:!text-[var(--text-color)]"
                        :value="leftIcon"
                    />
                    <UIcon
                        v-if="!active"
                        value="ChevronDown"
                        class="absolute top-[calc(50%+1px)] -translate-y-1/2"
                        :style="{'right': sizeFrames.iconRight}"
                        :color="color"
                        :size="sizeFrames.iconSize"
                    />
                    <UIcon
                        v-else
                        value="ChevronUp"
                        class="absolute top-[calc(50%)] -translate-y-1/2"
                        :style="{'right': sizeFrames.iconRight}"
                        :color="color"
                        :size="sizeFrames.iconSize"
                    />
                </template>
            </ElSelect>
            <ul v-if="!props.hideErrors" class="mt-1 pl-2 text-sm text-red-500">
                <li
                    v-for="error in (errors as Array<any>).slice(0, errorsCount as number)"
                    :key="error"
                    :class="{ 'ml-3 list-disc': (errors as Array<any>) > 1 && errorsCount > 1 }"
                >
                    {{ error }}
                </li>
            </ul>
        </div>
    </client-only>
</template>

<script setup lang="ts">
import { fa } from 'element-plus/es/locale'
import { mode } from 'process'

defineOptions({
    inheritAttrs: false,
})

export interface Props {
    label?: string
    inputClass?: string
    modelValue?: any[] | any,
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    leftIcon?: string
    errors?: Array<any>
    errorsCount?: number
    hideErrors?: boolean | number
    errorState?: boolean
    valueName?: string
    labelName?: string
    imageName?: string
    options?: any[]
    collapseTags?: boolean
    maxCollapseTags?: number
    hideCheckboxStyle?: boolean,
    labelClass?: string,
    required?: boolean,
    placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
    inputClass: '',
    size: 'md',
    errors: () => [],
    errorsCount: 3,
    options: () => [],
    valueName: 'value',
    labelName: 'label',
    imageName: 'img',
    collapseTags: true,
    maxCollapseTags: 2,
    required: false,
    placeholder: ''
})

const attrs = useAttrs()

const slots = defineSlots<{
    prefix?(): any
    suffix?(): any
}>()

const emit = defineEmits<{
    'update:modelValue': [v: any]
}>()

const active = ref(false)

const computedOptions = computed(() =>
    props.options.map((option) => ({
        value: option[props.valueName],
        label: option[props.labelName],
        img: option[props.imageName],
    }))
)

const isPrefixed = computed(() => slots.prefix || props.leftIcon)

const sizeFrames = computed(() => {
    switch (props.size) {
        case 'xs':
            return {
                height: `32px`,
                paddingContent: '0 8px',
                padding: `0 2px 0 ${isPrefixed.value ? '1px' : '2px'}`,
                iconSize: 16,
                iconRight: '6px',
                labelStyles: { marginBottom: '3px' },
                paddingDropdownItem: '6px'
            }
        case 'sm':
            return {
                height: `40px`,
                paddingContent: '1px 12px',
                padding: `0 '4px' 0 ${isPrefixed.value ? '2px' : '4px'}`,
                iconSize: 20,
                iconRight: '7px',
                labelStyles: { marginBottom: '5px' },
                paddingDropdownItem: '8px'
            }
        case 'md':
            return {
                height: `46px`,
                paddingContent: '1px 16px',
                padding: `0 6px 0 ${isPrefixed.value ? '3px' : '6px'}`,
                labelStyles: { marginBottom: '6px' },
                tagsPadding: '0 0 0 48px',
                iconSize: 24,
                iconRight: '12px',
                imageStyles: {
                    width: '20px',
                    height: '20px',
                },
                paddingDropdownItem: '12px'
            }
        case 'lg':
            return {
                height: `56px`,
                paddingContent: '1px 20px',
                padding: `0 8px 0 ${isPrefixed.value ? '4px' : '8px'}`,
                labelStyles: { marginBottom: '10px' },
                iconSize: 24,
                iconRight: '12px',
                paddingDropdownItem: '12px'
            }
        case 'xl':
            return {
                height: `64px`,
                paddingContent: '1px 24px',
                padding: `0 10px 0 ${isPrefixed.value ? '5px' : '10px'}`,
                labelStyles: { marginBottom: '12px' },
                iconSize: 24,
                iconRight: '12px',
                paddingDropdownItem: '12px'
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
    '--u-select-padding': sizeFrames.value.padding,
    '--u-select-padding-content': sizeFrames.value.paddingContent,
    '--color': color.value,
    '--text-color': textColor.value,
    '--u-select-height': sizeFrames.value.height,
    '--u--select-tags-padding': sizeFrames.value.tagsPadding,
}))
</script>

<style scoped lang="scss">
.u-select {
    :deep(.el-input__wrapper.is-focus) {
        box-shadow: 0 0 0 1px var(--color) !important;
    }

    :deep(.el-input__wrapper) {
        @apply rounded-full;
        box-shadow: inset 0 0 0 1px var(--color) !important;
        padding: var(--u-select-padding-content);

        .el-input__suffix {
            @apply hidden;
        }

        .el-input__prefix-inner > div {
            @apply m-0;
        }
    }

    :deep(input) {
        height: var(--u-select-height);
        padding: var(--u-select-padding);
    }


    :deep(.el-select__tags) {
        padding: var(--u--select-tags-padding);
    }

    :deep(.el-tag) {
        @apply rounded-full;
        border: 1px solid var(--color);
        background: none;
    }

    :deep(.el-tag__close) {
        @apply text-[--text-color] opacity-80;

        &:hover {
            background: none;
        }

        &:hover::after {
            content: '';
            position: absolute;
            border-radius: 50%;
            width: 100%;
            height: 100%;
            background: var(--color);
            opacity: 0.3;
        }
    }

    :deep(.el-select__tags-text) {
        @apply relative top-px text-[--text-color] opacity-80;
    }
}

.u-select-popper {
    .el-select-dropdown {
        padding: 8px 0 !important;
    }
    .el-select-dropdown__item {
        @apply h-auto p-0 leading-none;
        &.selected {
            @apply bg-none font-normal text-primary-700 after:hidden;
        }

        &.hover {
            @apply bg-black/5;
        }
    }
}

.el-select :deep(.el-input.is-focus .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--color) !important;
}
</style>
