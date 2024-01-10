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
                ref="USelect"
                :model-value="modelValue"
                class="u-select w-full focus:!outline-none [&_.el-select\_\_input]:!ml-[var(--u-select-multiple-margin)]
                    [&_.el-input\_\_inner]:!overflow-ellipsis [&_.el-input\_\_prefix-inner>:last-child]:!mr-[var(--u-select-icon-margin)]
                "
                :class="{'[&_.el-select-tags-wrapper]:!hidden': hideSelected}"
                v-bind="{ ...attrs, class: inputClass }"
                :placeholder="placeholder as string"
                :style="styles"
                :collapse-tags="!!collapseTags"
                :max-collapse-tags="maxCollapseTags as number"
                :loading="loading as boolean"
                :multiple="multiple as boolean"
                :filterable="filterable as boolean"
                popper-class="u-select-popper"
                @visible-change="active = $event"
                @update:model-value="emit('update:modelValue', $event)"
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
                                        class="mr-[6px]"
                                        size="sm"
                                        :model-value="
                                            multiple
                                                ? modelValue?.includes(option.value)
                                                : option.value === modelValue
                                    "
                                        color="primary-700"
                                    />
                                    <img
                                        v-if="option.img"
                                        :src="option.img"
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
                    <div class="flex absolute top-[calc(50%+1px)] -translate-y-1/2"
                         :style="{'right': sizeFrames.iconRight}">
                        <UDefaultLoader
                            v-if="loading"
                            size="20"
                            :color="color"
                            class="fill-black mr-[6px] !stroke-2"
                        />
                        <UIcon
                            v-if="!active && !loading"
                            value="ChevronDown"
                            :color="color"
                            :size="sizeFrames.iconSize"
                        />
                        <UIcon
                            class="relative -top-px"
                            v-else-if="!loading"
                            value="ChevronUp"
                            :color="color"
                            :size="sizeFrames.iconSize"
                        />
                    </div>
                </template>
                <template #empty>
                    <slot name="empty">
                        <div class="px-2 py-3">
                            <div class="flex items-center  text-sm text-gray-600">
                                <UIcon value="Funnel" size="18" color="gray-600"/>
                                <p class="ml-[6px]">No items matching query</p>
                            </div>
                            <button
                                v-if="addable"
                                class="flex items-center mt-2 cursor-pointer"
                                @click="addItem"
                            >
                                <UIcon value="Plus" size="16" color="primary-900" stroke-width="2"/>
                                <p class="text-[13px] ml-[2px] text-primary-900 font-medium">{{ addableLabel }}</p>
                            </button>
                        </div>
                    </slot>
                </template>
            </ElSelect>
            <div class="flex">
                <ul class="h-6" v-if="infoLine"></ul>
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
        </div>
    </client-only>
</template>

<script setup lang="ts">

import { useRounded } from "~/ui/composables/useRounded";
import { useColor } from "~/ui/composables/useColor";

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
    placeholder?: string,
    rounded?: string,
    color?: string,
    infoLine?: boolean,
    addable?: boolean,
    addableLabel?: string,
    loading?: boolean,
    hideSelected?: boolean,
    filterable?: boolean,
    multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    inputClass: '',
    size: 'sm',
    errors: () => [],
    errorsCount: 3,
    options: () => [],
    valueName: 'value',
    labelName: 'label',
    imageName: 'img',
    collapseTags: true,
    maxCollapseTags: 2,
    required: false,
    placeholder: '',
    rounded: 'lg',
    color: 'gray-400',
    addableLabel: 'Add new',
})

const attrs = useAttrs()

const slots = defineSlots<{
    prefix?(): any
    suffix?(): any
}>()

const emit = defineEmits<{
    'update:modelValue': [v: any],
    'add': [{ query: string, cb: () => void }]
}>()

const isPrefixed = computed(() => slots.prefix || props.leftIcon)

const { rounded } = useRounded(props.rounded)
const sizeFrames = computed(() => {
    switch (props.size) {
        case 'xs':
            return {
                height: 32,
                paddingContent: `0 26px 0 6px`,
                padding: `0 2px 0 2px`,
                iconSize: 16,
                iconRight: '6px',
                labelStyles: { marginBottom: '3px' },
                paddingDropdownItem: '6px',
                iconMargin: 3,
                multipleMargin: 8
            }
        case 'sm':
            return {
                height: 36,
                paddingContent: `1px 26px 0 6px`,
                padding: `0 4px 0 4px`,
                iconSize: 20,
                iconRight: '7px',
                labelStyles: { marginBottom: '5px' },
                paddingDropdownItem: '10px',
                iconMargin: 4,
                multipleMargin: 8
            }
        case 'md':
            return {
                height: 48,
                paddingContent: `1px 26px 0 8px`,
                padding: `0 6px 0 6px}`,
                labelStyles: { marginBottom: '6px' },
                tagsPadding: '0 0 0 48px',
                iconSize: 24,
                iconRight: '12px',
                imageStyles: {
                    width: '20px',
                    height: '20px',
                },
                paddingDropdownItem: '12px',
                iconMargin: 5,
                multipleMargin: 12
            }
        case 'lg':
            return {
                height: 56,
                paddingContent: `1px 26px 0 10px`,
                padding: `0 8px 0 8px}`,
                labelStyles: { marginBottom: '10px' },
                iconSize: 24,
                iconRight: '12px',
                paddingDropdownItem: '12px',
                iconMargin: 7,
                multipleMargin: 14
            }
        case 'xl':
            return {
                height: 64,
                paddingContent: `1px 26px 0 12px`,
                padding: `0 10px 0 10px`,
                labelStyles: { marginBottom: '12px' },
                iconSize: 24,
                iconRight: '12px',
                paddingDropdownItem: '12px',
                iconMargin: 12,
                multipleMargin: 16
            }
    }
})

const { color: _color } = useColor(props.color)

const color = computed(() =>
    (props.errors.length && !props.hideErrors) || props.errorState ? '#DC2626' : _color.value
)
const textColor = computed(() =>
    (props.errors.length && !props.hideErrors) || props.errorState ? '#DC2626' : '#000000'
)

const styles = computed(() => ({
    '--u-select-padding': sizeFrames.value.padding,
    '--u-select-padding-content': sizeFrames.value.paddingContent,
    '--color': color.value,
    '--text-color': textColor.value,
    '--u-select-height': `${sizeFrames.value.height}px`,
    '--u--select-tags-padding': sizeFrames.value.tagsPadding,
    '--u-select-rounded': rounded.value,
    '--el-select-input-focus-border-color': color.value,
    '--u-select-text-color': textColor.value,
    '--u-select-icon-margin': `${sizeFrames.value.iconMargin}px`,
    '--u-select-multiple-margin': `${sizeFrames.value.multipleMargin}px`,
}))

const active = ref(false)

const computedOptions = computed(() => {
    let options = props.options
        .map((option) => ({
            value: option[props.valueName],
            label: option[props.labelName],
            img: option[props.imageName],
        }))
    if (props.hideSelected) options = options.filter(option => Array.isArray(props.modelValue) ? !props.modelValue.some((x: any) => x === option.value) : props.modelValue !== option.value)

    return options
})

const USelect = ref()

const addItem = () => {
    emit('add', {
            query: USelect.value.query,
            cb: () => {
                USelect.value.blur()
            }
        }
    )
}

</script>

<style scoped lang="scss">
.u-select {
    :deep(input) {
        color: var(--u-select-text-color)
    }

    :deep(.el-input__wrapper) {
        border-radius: var(--u-select-rounded);
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
    /*box-shadow: 0 0 0 1px var(--color) !important;*/
}
</style>
