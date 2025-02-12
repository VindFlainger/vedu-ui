<template>
    <div>
        <div class="flex gap-3 items-start">
            <USelect
                :model-value="modelValue"
                class="max-w-xs grow"
                placeholder="Имя тега"
                filterable
                hide-selected
                hide-checkbox-style
                :options="tags"
                label-name="name"
                value-name="id"
                addable
                multiple
                no-items-found-text="По вашему запросу ничего не найдено"
                addable-label="Добавить новый тег"
                :loading="createLoading"
                @add="handleCreate"
                @update:model-value="emit('update:modelValue', $event)"
            />
        </div>
        <div
            class="p-3 min-h-[70px] flex items-center border border-dashed border-gray-400 bg-gray-50 mt-3 rounded-lg select-none">
            <div v-if="activeTags.length" class="flex flex-wrap gap-3 items-center">
                <UTag
                    v-for="tag in activeTags"
                    :key="tag.id"
                    :value="tag.name"
                    color="indigo-400"
                    clearable
                    :indicator="tag.exists"
                    @clear="handleDelete(tag.id)"
                />
            </div>
            <p v-else class="grow text-center text-gray-500 text-[15px]">
                Теги не найдены
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()

const questionsStore = useQuestionsStore()

const { tags } = storeToRefs(questionsStore)

export interface Props {
    modelValue: string[],
    savedTags: string[]
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    savedTags: () => []
})

const emit = defineEmits<{
    'update:modelValue': [v: Props['modelValue']]
}>()

const activeTags = computed(() => props.modelValue
    .filter(value => tags.value.some(tag => tag.id === value))
    .map(value => ({
        ...tags.value.find(tag => tag.id === value),
        exists: props.savedTags.some(x => x === value)
    }))
)

const { loading: createLoading, addLoading: addCreateLoading, removeLoading: removeCreateLoading } = useLoading(false)
const handleCreate = async ({ query, cb }: { query: string, cb: () => void }) => {
	console.log(query)
    try {
        addCreateLoading()
        const res = await $api.questions.CREATE_TAG({ name: query })
        await questionsStore.fetchAvailableTags()
        emit('update:modelValue', [...props.modelValue, res.id])
        cb()
    } catch (e) {

    } finally {
        removeCreateLoading()
    }
}

const handleDelete = (id: string) => {
    emit(
        'update:modelValue',
        props.modelValue.filter(x => x !== id)
    )
}

</script>