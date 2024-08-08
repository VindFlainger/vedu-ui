<template>
    <div>
        <div>
            <u-button
                icon="Plus"
                icon-style
                size="md"
                label="Создать курс"
                font-size="14"
                font-weight="500"
                @click="emit('create')"
            />
            <u-input
                :model-value="searchQuery"
                class="mr-0 ml-auto w-full max-w-[220px] [&_input]:text-sm [&_input::placeholder]:font-light [&_input::placeholder]:text-gray-400"
                right-icon="MagnifyingGlass"
                color="primary-800"
                placeholder="Имя, содержание, теги..."
                @update:model-value="emit('update:searchQuery', $event)"
            />
        </div>

    </div>
</template>

<script setup lang="ts">
export interface Props {
    searchQuery?: string
}

const props = withDefaults(defineProps<Props>(), {

})

const emit = defineEmits<{
    'create': [],
    'update:searchQuery': [v: Props['searchQuery']]
}>()

</script>