<template>
    <div>
        <UPath
            v-if="isSingle"
            class="mb-5"
            v-bind="pathProps"
            :items="slots"
            :modelValue="modelValue"
            :skipping="skipping"
            :returning="returning"
            @update:modelValue="handlePathChange"
        />
        <div class="prevent-select">
            <div v-for="(slot, i) in slots">
                <div v-if="lastActiveSlotIndex >= i" v-show="i === lastActiveSlotIndex">
                    <slot :name="slot.value"/>
                </div>
            </div>
        </div>
        <div class="mt-8" v-if="isSingle">
            <slot name="navigation">
                <div v-if="navigation" class="flex">
                    <UButton
                        v-if="lastActiveSlotIndex"
                        :label="backLabel"
                        :disabled="false"
                        @click="handleMove(-1)"
                    >
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
                    <UButton
                        :label="(slots.length - 1) === lastActiveSlotIndex? finishLabel: nextLabel"
                        class="ml-auto mr-0"
                        @click="handleMove(1)"
                        :disabled="nextDisabled"
                    >
                        <template #rightIcon="{ color }" v-if="(slots.length - 1) !== lastActiveSlotIndex">
                            <UIcon
                                class="absolute right-[6px] top-1/2 -translate-y-1/2"
                                value="ChevronRight"
                                :color="color"
                                size="15"
                                strokeWidth="3"
                            />
                        </template>
                    </UButton>
                </div>
            </slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { fa } from 'element-plus/es/locale'
import { mode } from 'process'

export interface Props {
    modelValue?: string
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
    nextDisabled?: boolean,
    confirmNext?: boolean,
    confirmBack?: boolean,
    nextLabel?: string,
    backLabel?: string,
    finishLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
    slots: () => [],
    returning: true,
    navigation: true,
    confirmNext: true,
    nextLabel: 'Next',
    backLabel: 'Back',
    finishLabel: 'Finish'
})

const emit = defineEmits<{
    'update:modelValue': [v: Props['modelValue']]
    'step-next': [target: string, move: () => void]
    'step-back': [target: string, move: () => void]
}>()

const isSingle = computed(() => !Array.isArray(props.modelValue))

const lastActiveSlotIndex = computed(() =>
    props.slots.findIndex((item) => item.value === props.modelValue)
)

const handleMove = (n: number) => {
    if (n !== 0) {
        const newActiveSlot = props.slots[lastActiveSlotIndex.value + n]
        const move = () => emit('update:modelValue', newActiveSlot.value)
        if (n > 0 ? props.confirmNext : props.confirmBack)
            n > 0 ? emit('step-next', newActiveSlot.value, move) : emit('step-back', newActiveSlot.value, move)
        else move()
    }
}

const handlePathChange = (v: string) => {
    const n = props.slots.findIndex(slot => slot.value === v) - lastActiveSlotIndex.value
    handleMove(n)
}

</script>
