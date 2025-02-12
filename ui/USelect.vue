<template>
    <client-only>
        <div v-bind="{ class: attrs.class }">
            <ULabel
                v-if="label"
                :label="label"
                :required="required"
                :text-color="textColor"
                :style="sizeFrames.labelStyles"
            />
            <ElSelect
                ref="USelect"
                :model-value="lazyValue"
                class="u-select w-full focus:!outline-none [&_.el-input\_\_inner]:!overflow-ellipsis 
                    [&_.el-input\_\_prefix-inner>:last-child]:!mr-[var(--u-select-icon-margin)]"
                :class="{ 
                    [String.raw`[&_.el-select\_\_selected-item]:!hidden`]: hideSelected,
                    [String.raw`[&_.el-select\_\_selected-item.el-select\_\_input-wrapper]:!block`]: hideSelected
                     }"
                v-bind="{ ...attrs, class: inputClass }"
                :placeholder="placeholder as string"
                :style="styles"
                :collapse-tags="!!collapseTags"
                :max-collapse-tags="maxCollapseTags as number"
                :popper-options="{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 4],
                            },
                        },
                    ],
                }"
                :loading="loading as boolean"
                :multiple="multiple as boolean"
                :filterable="filterable as boolean"
                :remote="!!remote"
                :remote-method="handleRemote"
                popper-class="u-select-popper"
                @visible-change="active = $event"
                @update:model-value="handleChangeValue"
            >
                <template #label v-if="slots.selected">
                    <div>
                        <slot name="selected" :selected="computedSelected"></slot>
                    </div>
                </template>
                <template #default>
                    <ElOption
                        v-for="option in computedOptions"
                        :key="option.value"
                        :value="option.value"
                        :label="option.label"
                    >
                        <template #default>
                            <div
                                class="group"
                                :class="{
                                    active: attrs.multiple
                                        ? lazyValue?.includes(option.value)
                                        : option.value === lazyValue,
                                }"
                            >
                                <slot name="option" :active="multiple ? lazyValue?.includes(option.value): option.value === lazyValue" :label="option.label" :option="option">
                                    <div
                                        class="flex items-center"
                                        :class="{ 'group-[.active]:bg-primary-700/20': hideCheckboxStyle }"
                                        :style="{ padding: sizeFrames.paddingDropdownItem }"
                                    >
                                        <UCheckbox
                                            v-if="!hideCheckboxStyle"
                                            class="mr-[6px]"
                                            size="sm"
                                            :model-value="
                                                multiple
                                                    ? lazyValue?.includes(option.value)
                                                    : option.value === lazyValue
                                            "
                                            color="primary-700"
                                        />
                                        <img v-if="option.img" :src="option.img" class="mr-2" />
                                        <span
                                            class="relative top-px text-gray-700"
                                            :class="{
                                                'group-[.active]:text-primary-700': !hideCheckboxStyle,
                                            }"
                                        >
                                            {{ option.label }}
                                        </span>
                                    </div>
                                </slot>
                            </div>
                        </template>
                    </ElOption>
                </template>
                <template #prefix>
                    <UIcon
                        v-if="leftIcon"
                        class="[&_svg]:!text-[var(--text-color)] ml-1.5"
                        :value="leftIcon"
                        :size="sizeFrames.iconSize"
                    />
                    <div
                        class="absolute top-[calc(50%+1px)] flex -translate-y-1/2"
                        :style="{ right: sizeFrames.iconRight }"
                    >
                        <UDefaultLoader v-if="loading" size="20" :color="color" class="mr-[6px] fill-black !stroke-2" />
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
                            <div class="flex items-center text-sm text-gray-600">
                                <UIcon value="Funnel" size="18" color="gray-600" />
                                <p class="ml-[6px]">{{ noItemsFoundText }}</p>
                            </div>
                            <button v-if="addable" class="mt-2 flex cursor-pointer items-center" @click="addItem">
                                <UIcon value="Plus" size="16" color="primary-900" stroke-width="2" />
                                <p class="ml-[2px] text-[13px] font-medium text-primary-900">{{ addableLabel }}</p>
                            </button>
                        </div>
                    </slot>
                </template>
            </ElSelect>
            <div class="flex">
                <ul class="h-6" v-if="infoLine"></ul>
                <ul v-if="!props.hideErrors && errors.length" class="mt-1 pl-2 text-sm text-red-500">
                    <li
                        v-for="error in (errors as Array<any>).slice(0, errorsCount as number)"
                        :key="error"
                        :class="{ 'ml-3 list-disc': (errors as Array<any>).length > 1 && errorsCount > 1 }"
                    >
                        {{ error }}
                    </li>
                </ul>
            </div>
        </div>
    </client-only>
</template>

<script setup lang="ts">
import { useRounded } from '~/ui/composables/useRounded';
import { useColor } from '~/ui/composables/useColor';

defineOptions({
    inheritAttrs: false,
});

export interface Props {
    label?: string;
    inputClass?: string;
    modelValue?: any[] | any;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    leftIcon?: string;
    errors?: Array<any>;
    errorsCount?: number;
    hideErrors?: boolean | number;
    errorState?: boolean;
    valueName?: string;
    labelName?: string;
    imageName?: string;
    options?: any[];
    collapseTags?: boolean;
    maxCollapseTags?: number;
    hideCheckboxStyle?: boolean;
    labelClass?: string;
    required?: boolean;
    placeholder?: string;
    rounded?: string;
    color?: string;
    infoLine?: boolean;
    addable?: boolean;
    addableLabel?: string;
    loading?: boolean;
    hideSelected?: boolean;
    filterable?: boolean;
    multiple?: boolean;
    returnObject?: boolean;
    noItemsFoundText?: string;
    remote?: (v: string) => any
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
    returnObject: false,
    multiple: false,
    noItemsFoundText: 'No items matching query',
});

const attrs = useAttrs();


const slots = defineSlots<{
    prefix?(): any;
    suffix?(): any;
    empty?(): any;
    option?(props: { active: boolean, label: string, option: any }): any;
    selected?(props: { selected: Props['modelValue'] }): any;
}>();

const emit = defineEmits<{
    add: [{ query: string; cb: () => void }];
}>();

const modelValue = defineModel<any[] | any>()

const USelect = ref();

const lazyValue = ref<Props['modelValue']>(null);

const remoteOptions = ref(null)

const handleChangeValue = (v: Props['modelValue']) => {
    if (props.returnObject) {
        if (!props.multiple)
            modelValue.value = (remoteOptions.value || props.options).find((option) => option[props.valueName] === v)
        else
            modelValue.value = (remoteOptions.value || props.options).filter((option) => v.includes(option[props.valueName]))
    } else {
        modelValue.value = v
    }
};

const handleRemote = async (v: string) => {
    if (props.remote) {
        try {
            remoteOptions.value = await props.remote(v)
        } catch (err) {
            console.log(err)
        }
    }
}

watch(
    () => props.modelValue,
    (v: Props['modelValue']) => {
        if (props.returnObject) {
            if (!props.multiple) lazyValue.value = v?.[props.valueName];
            else lazyValue.value = v ? v.map((x: any) => x[props.valueName]) : [];
        } else {
            lazyValue.value = v;
        }
    },
    { immediate: true }
);

const isPrefixed = computed(() => slots.prefix || props.leftIcon);

const { rounded } = useRounded(props.rounded);
const sizeFrames = computed(() => {
    switch (props.size) {
        case 'xs':
            return {
                height: 32,
                paddingContent: `0 26px 0 6px`,
                padding: `0 2px 0 2px`,
                iconSize: 16,
                iconRight: '6px',
                labelStyles: { marginBottom: '3px', fontSize: '14px' },
                paddingDropdownItem: '6px',
                iconMargin: 3,
                multipleMargin: 8,
            };
        case 'sm':
            return {
                height: 35,
                paddingContent: `1px 26px 0 6px`,
                padding: `0 4px 0 4px`,
                iconSize: 20,
                iconRight: '7px',
                labelStyles: { marginBottom: '4px', fontSize: '15px' },
                paddingDropdownItem: '10px',
                iconMargin: 4,
                multipleMargin: 8,
            };
        case 'md':
            return {
                height: 48,
                paddingContent: `1px 26px 0 8px`,
                padding: `0 6px 0 6px}`,
                labelStyles: { marginBottom: '5px', fontSize: '16px' },
                tagsPadding: '0 0 0 48px',
                iconSize: 24,
                iconRight: '12px',
                imageStyles: {
                    width: '20px',
                    height: '20px',
                },
                paddingDropdownItem: '12px',
                iconMargin: 5,
                multipleMargin: 12,
            };
        case 'lg':
            return {
                height: 56,
                paddingContent: `1px 26px 0 10px`,
                padding: `0 8px 0 8px}`,
                labelStyles: { marginBottom: '7px', fontSize: '16px' },
                iconSize: 24,
                iconRight: '12px',
                paddingDropdownItem: '12px',
                iconMargin: 7,
                multipleMargin: 14,
            };
        case 'xl':
            return {
                height: 64,
                paddingContent: `1px 26px 0 12px`,
                padding: `0 10px 0 10px`,
                labelStyles: { marginBottom: '9px', fontSize: '16px' },
                iconSize: 24,
                iconRight: '12px',
                paddingDropdownItem: '12px',
                iconMargin: 12,
                multipleMargin: 16,
            };
    }
});

const { color: _color } = useColor(props.color);

const color = computed(() =>
    (props.errors.length && !props.hideErrors) || props.errorState ? '#DC2626' : _color.value
);
const textColor = computed(() =>
    (props.errors.length && !props.hideErrors) || props.errorState ? '#DC2626' : '#000000'
);

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
}));

const active = ref(false);

const computedOptions = computed(() => {
    let options = (remoteOptions.value || props.options).map((option) => ({
        ...option,
        value: option[props.valueName],
        label: option[props.labelName],
        img: option[props.imageName],
    }));

    if (props.hideSelected)
        options = options.filter((option) =>
            Array.isArray(props.modelValue)
                ? !props.modelValue.some((x: any) => x === option.value)
                : props.modelValue !== option.value
        );

    return options;
});

const computedSelected = computed(() => {
    if (modelValue.value) {
        if (Array.isArray(modelValue.value)) return computedOptions.value.filter((option) => modelValue.value.includes(option.value));

        return computedOptions.value.find((option) => option.value === modelValue.value);
    } 
    
    return modelValue.value
})


const addItem = () => {
    emit('add', {
        query: USelect.value.states.inputValue,
        cb: () => {
            USelect.value.blur();
        },
    });
};
</script>

<style scoped lang="scss">
.u-select {
    :deep(input) {
        color: var(--u-select-text-color);
    }

    :deep(.el-select__wrapper) {
        border-radius: var(--u-select-rounded);
        box-shadow: inset 0 0 0 1px var(--color) !important;
        padding: var(--u-select-padding-content);
        height: var(--u-select-height);
        gap: 0 !important;

        .el-select__suffix {
            @apply hidden;
        }
        .el-select__placeholder {
            margin-left: var(--u-select-multiple-margin) !important;
        }

        .el-select__input {
            margin-left: var(--u-select-multiple-margin) !important;
        }
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
