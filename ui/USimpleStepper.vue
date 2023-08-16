<template>
    <div class="prevent-select">
        <div>
            <slot v-for="slot in activeSlots" :name="slot.value"> {{}} </slot>
        </div>
    </div>
    <div class="mt-8" v-if="isSingle">
        <slot name="navigation">
            <div v-if="navigation" class="flex">
                <UButton label="Back" v-if="lastActiveItemIndex">
                    <template #leftIcon>
                        <UIcon
                            class="absolute left-[6px] top-1/2 -translate-y-1/2"
                            value="ChevronLeft"
                            color="white"
                            size="15"
                            strokeWidth="3"
                            
                        />
                    </template>
                </UButton>
                <UButton label="Next" class="ml-auto mr-0">
                    <template #rightIcon>
                        <UIcon
                            class="absolute right-[6px] top-1/2 -translate-y-1/2"
                            value="ChevronRight"
                            color="white"
                            size="15"
                            strokeWidth="3"
                        />
                    </template>
                </UButton>
            </div>
        </slot>
        <UPath
            class="mt-4"
            v-bind="pathProps"
            :items="slots"
            :modelValue="modelValue"
            :skipping="skipping"
            :returning="returning"
            @update:modelValue="handlePathChange"
        />
    </div>
</template>

<script lang="ts" setup>
import { fa } from 'element-plus/es/locale'
import { mode } from 'process'

export interface Props {
    modelValue?: string | Array<string>
    slots: {
        value: string
        name?: string
    }[]
    displayColumn?: boolean
    moveable?: boolean
    pathProps?: any
    skipping?: boolean
    returning?: boolean
    navigation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    slots: () => [],
    returning: true,
    navigation: true,
})

const emit = defineEmits<{
    'update:modelValue': [v: Props['modelValue']]
}>()

const isSingle = computed(() => !Array.isArray(props.modelValue))

const activeSlots = computed(() => {
    return props.slots.filter((slot) =>
        Array.isArray(props.modelValue)
            ? props.modelValue.includes(slot.value)
            : props.modelValue === slot.value
    )
})

const lastActiveItemIndex = computed(() =>
    props.slots.findIndex((item) => item.value === props.modelValue)
)

const handlePathChange = (v: string) => {
    console.log(v)
    emit('update:modelValue', v)
}
</script>
