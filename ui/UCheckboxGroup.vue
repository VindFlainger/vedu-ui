<template>
    <div class="flex flex-col gap-[6px]">
        <div v-for="option in computedOptions" :key="option.value">
            <UCheckbox
                class="u-checkbox-group-checkbox text-[15px]"
                :model-value="modelValue"
                :label="option.label"
                :value="option.value"
                :radio-style="!multiple"
                return-value
                @update:model-value="emit('update:modelValue', $event)"
            >
                <template #default>
                    {{ option.label }}
                </template>
            </UCheckbox>
        </div>
    </div>
</template>

<script setup lang="ts">
export interface Props {
    modelValue: any,
    options: {
        [key: string]: any
    }[],
    valueName?: string
    labelName?: string,
    multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    options: () => [],
    valueName: 'value',
    labelName: 'label',
    multiple: true
})

const emit = defineEmits<{
    'update:modelValue': [v: Props['modelValue']]
}>()


const computedOptions = computed(() => {
    let options = props.options
        .map((option) => ({
            value: option[props.valueName],
            label: option[props.labelName],
        }))

    return options
})

</script>

<style scoped>

</style>