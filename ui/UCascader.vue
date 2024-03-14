<template>
    <div class="w-full">
        <ULabel
            :description="description"
            :label="label"
            :required="required"
            :text-color="textColor"
            :style="sizeFrames.labelStyles"
            v-bind="cascaderOptions"
        />
        <ElCascader
            class="w-full u-cascader [&_.el-input]:h-[var(--u-cascader-height)] [&_.el-input\_\_wrapper]:!shadow-[inset_0_0_0_1px_var(--u-cascader-color)]
                [&_.el-input\_\_wrapper]:rounded-[var(--u-cascader-rounded)]
            "
            :style="styles"
            :model-value="modelValue"
            :options="options"
            v-bind="cascaderOptions"
            @update:model-value="emit('update:modelValue', $event)"
        />
    </div>

</template>

<script setup lang="ts">
import { useColor } from "~/ui/composables/useColor";
import { useRounded } from "~/ui/composables/useRounded";

export interface Props {
    modelValue?: any[],
    options?: any[],
    required?: boolean,
    textColor?: string,
    description?: string,
    labelProps?: any,
    label?: string,
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    cascaderOptions: any,
    color?: string,
    rounded?: string
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    options: () => [],
    size: 'sm',
    rounded: 'lg',
    color: 'gray-400',

})

const { color } = useColor(computed(() => props.color))
const { color: textColor } = useColor(computed(() => props.textColor))
const { rounded } = useRounded(props.rounded)

const emit = defineEmits<{
    'update:modelValue': [v: any]
}>()


const sizeFrames = computed(() => {
    switch (props.size) {
        case 'xs':
            return {
                height: 32,
                paddingContent: '1px 6px',
                labelStyles: { marginBottom: '3px' },
                iconSizes: {
                    default: 24,
                    plus: 15,
                },
                iconMargin: 3
            }
        case 'sm':
            return {
                height: 36,
                paddingContent: '1px 8px',
                labelStyles: { marginBottom: '6px' },
                iconSizes: {
                    default: 24,
                    plus: 15,
                },
                iconMargin: 4
            }
        case 'md':
            return {
                height: 48,
                paddingContent: '1px 16px',
                labelStyles: { marginBottom: '6px' },
                iconSizes: {
                    default: 24,
                    plus: 13,
                },
                iconMargin: 5
            }
        case 'lg':
            return {
                height: 56,
                paddingContent: '1px 20px',
                labelStyles: { marginBottom: '10px' },
                iconSizes: {
                    default: 24,
                    plus: 15,
                },
                iconMargin: 7
            }
        case 'xl':
            return {
                height: 64,
                paddingContent: '1px 24px',
                labelStyles: { marginBottom: '12px' },
                iconSizes: {
                    default: 24,
                    plus: 15,
                },
                iconMargin: 12
            }
    }
})

const styles = computed(() => ({
    '--u-cascader-height': `${sizeFrames.value.height}px`,
    '--u-cascader-padding-content': sizeFrames.value.paddingContent,
    '--u-cascader-color': color.value,
    '--u-cascader-text-color': textColor.value,
    '--u-cascader-rounded': rounded.value,
    '--u-cascader-icon-margin': `${sizeFrames.value.iconMargin}px`
}))

</script>

<style scoped>

</style>