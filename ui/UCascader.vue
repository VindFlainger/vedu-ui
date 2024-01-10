<template>
    <div class="w-full">
        <ULabel
            :description="description"
            :label="label"
            :required="required"
            :text-color="textColor"
            :style="sizeFrames.labelStyles"
        />
        <UCascader/>
    </div>

</template>

<script setup lang="ts">
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
    fontSize?: string | number,
    description?: string,
    labelProps?: any
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
    rounded: 'lg',
    fontSize: 14
})


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

</script>

<style scoped>

</style>