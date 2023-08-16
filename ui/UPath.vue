<template>
    <div class="prevent-select flex flex-wrap" :class="{ 'flex-col': displayColumn }">
        <div
            v-for="(item, i) in items"
            class="group flex cursor-pointer font-medium"
            :class="{
                active: lastActiveItemIndex >= i,
                'not-last-active': lastActiveItemIndex > i,
                '!cursor-not-allowed':
                    (!skipping && i > lastActiveItemIndex) ||
                    (!returning && i < lastActiveItemIndex),
            }"
            @click="handleClick(i, item.value)"
        >
            <UIcon v-if="item.icon" :value="item.icon" tag="span" size="16" class="group-[.active]:[&_svg]:!text-primary-700 mr-[2px]"/>
            <span class="group-[.active]:text-primary-700">
                {{ item.name || item.value }}
            </span>
            <span
                v-if="items.length - i - 1"
                class="ml-1 mr-1 group-[.not-last-active]:text-primary-700"
            >
                >
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
export interface Props {
    displayColumn?: boolean
    items?: Array<{
        name?: string
        value: string
        icon?: string
    }>
    modelValue?: string
    skipping?: boolean
    returning?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    returning: true,
})

const emit = defineEmits<{
    'update:modelValue': [v: Props['modelValue']]
}>()

const lastActiveItemIndex = computed(() =>
    props.items.findIndex((item) => item.value === props.modelValue)
)

const handleClick = (i: number, v: string) => {
    if (
        (i < lastActiveItemIndex.value || props.skipping) &&
        (i > lastActiveItemIndex.value || props.returning)
    )
        emit('update:modelValue', v)
}
</script>
