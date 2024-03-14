<template>
    <UDialog hide-header max-width="800" width="100%">
        <template #default="{close}">
            <div class="flex flex-col gap-y-3 gap-x-20 flex-wrap content-start max-h-[400px]"
                 style="column-rule-style: solid">
                <div v-for="category in computedCategories">
                    <p class="font-bold">{{ category.name }}</p>
                    <div class="pl-2 space-y-2 mt-2" v-if="category.children">
                        <div v-for="subcategory in category.children">
                            <div
                                class="flex items-center gap-2 cursor-pointer group"
                                @click="handleSelect(category.id, subcategory.id)"
                            >
                                <u-checkbox
                                    :value="true"
                                    :model-value="subcategory.active"
                                    size="sm"
                                    :class="{'group-hover:[&_.u-checkbox-box]:!outline-primary-700': !subcategory.active}"
                                    :color="subcategory.active ? 'primary-900': 'black'"
                                />
                                <p
                                    class="font-medium text-sm leading-[14px] group-hover:text-primary-700"
                                    :class="{'!text-primary-900': subcategory.active}"
                                >
                                    {{ subcategory.name }}
                                </p>
                            </div>
                            <div class="pl-4" v-if="subcategory.children">
                                <div v-if="subcategory.children" class="space-y-1 mt-1">
                                    <div
                                        v-for="item in subcategory.children"
                                        class="flex items-center gap-2 cursor-pointer group"
                                        @click="handleSelect(category.id, subcategory.id, item.id)"
                                    >
                                        <u-checkbox
                                            :value="true"
                                            :model-value="item.active"
                                            size="xs"
                                            :class="{'group-hover:[&_.u-checkbox-box]:!outline-primary-700': !item.active}"
                                            :color="item.active ? 'primary-900': 'black'"
                                        />
                                        <p
                                            class="text-sm leading-[14px] group-hover:text-primary-700"
                                            :class="{'!text-primary-900': item.active}"
                                        >
                                            {{ item.name }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #footer="{close}">
            <div class="flex justify-end">
                <u-button
                    label="Confirm"
                    size="sm"
                    @click="close"
                />
            </div>
        </template>
    </UDialog>
</template>

<script setup lang="ts">
export interface Props {
    categories: any[],
    modelValue: any[]
}

const props = withDefaults(defineProps<Props>(), {
    categories: () => [],
    modelValue: () => []
})

const emit = defineEmits<{
    'selected': [v: string[]],
    'update:modelValue': [v: Props['modelValue']]
}>()

const computedCategories = computed(() => {
    return props.categories.map(category => ({
        ...category,
        active: props.modelValue.includes(category.id),
        ...category.children ? {
            children: category.children.map((subcategory: any) => ({
                ...subcategory,
                active: props.modelValue.includes(subcategory.id),
                ...subcategory.children ? {
                    children: subcategory.children.map((item: any) => ({
                        ...item,
                        active: props.modelValue.includes(item.id)
                    }))
                } : null
            }))
        } : null
    }))
})


const handleSelect = (id: string, subcategoryId: string, itemId?: string) => {
    if (!itemId) {
        const subcategories = props.categories.find(category => category.id === id)?.children
        let items : any[] = []
        if (subcategories) items = subcategories.find((subcategory: any) => subcategory.id === subcategoryId)?.children || []

        emit('update:modelValue', [
            ...props.modelValue.filter(v => (v !== subcategoryId) && (!items.some((item: any) => item.id === v))),
            ...props.modelValue.includes(subcategoryId) ? [] : [subcategoryId]
        ])
    } else {
        emit('update:modelValue', [
            ...props.modelValue.filter(v => (v !== subcategoryId) && (v !== itemId)),
            ...props.modelValue.includes(itemId) ? [] : [itemId]
        ])
    }

}

</script>

<style scoped>

</style>