<template>
    <div
        class="relative grid rounded-full bg-primary-500"
        :style="styles"
        :class="{'prevent-select': !selection}"
    >
        <div class="z-10" v-for="item in items" :style="{ padding: metrics.outerPadding }">
            <div
                class="cursor-pointer rounded-full text-center text-white"
                :style="{ padding: metrics.innerPadding }"
                @click="emit('update:modelValue', item.value)"
            >
                {{ item.label }}
            </div>
        </div>
        <div
            class="absolute h-full duration-75"
            :style="{
                padding: metrics.outerPadding,
                width: `${100 / items?.length}%`,
                marginLeft: `${activeIndex * (100 / items?.length)}%`,
            }"
        >
            <div class="h-full w-full rounded-full bg-primary-700 text-center"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
export interface Props {
    items?: {
        label: string
        value: string | number
        icon?: string
    }[]
    size?: '' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    modelValue: number | string
    selection?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    selection: false,
    size: 'md'
})

const emit = defineEmits<{
    'update:modelValue': [v: Props['modelValue']]
}>()

const activeIndex = computed(() => {
    const i = props.items.findIndex((item) => item.value === props.modelValue)
    return i === -1 ? 0 : i
})

const metrics = computed(() => {
    switch (props.size) {
        case 'xs':
            return {}
        case 'sm':
            return { outerPadding: '6px 7px', innerPadding: '5px 20px' }
        case 'md':
            return { outerPadding: '6px 7px', innerPadding: '6px 26px' }
        case 'lg':
            return { outerPadding: '7px 8px', innerPadding: '7px 28px' }
        case 'xl':
            return { outerPadding: '8px 10px', innerPadding: '8px 32px' }
    }
})

const styles = computed(() => ({
    gridTemplateColumns: `repeat(${props.items.length}, minmax(0, 1fr))`,
}))
</script>

<style scoped></style>
