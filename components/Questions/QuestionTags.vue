<template>
    <div>
        <div class="flex gap-3 items-start">
            <!--            <UInput
                            info-line
                            size="sm"
                            v-model="text"
                            class="max-w-xs grow"
                            maxlenght="16"
                            :conditions="[
                                ['Tag duplicated', 'error', duplicated],
                                [`The maximum number of Tags is ${tagsLimit}`, 'error', limitExceeded && text.length],
                            ]"
                            @enter="handleAdd"
                        />-->
            <USelect
                v-model="tag"
                class="max-w-xs grow"
                filterable
                :options="tags"
                addable
                addable-label="Add new Tag"
                :loading="createLoading"
                @add="handleCreate"
            >
                <!--                <template #empty>
                                    <p>Add one</p>
                                </template>-->
            </USelect>
            <UButton
                class="self-start shrink-0"
                label="Add"
                size="md"
                :disabled="!tag || duplicated || limitExceeded"
                @click="handleAdd"
            />
        </div>
        <div
            class="p-3 min-h-[70px] flex items-center border border-dashed border-gray-400 bg-gray-50 mt-3 rounded-lg select-none">
            <div v-if="modelValue.length" class="flex gap-3 items-center">
                <UTag
                    v-for="tag in modelValue"
                    :key="tag.value || tag.label"
                    :value="tag.label"
                    color="indigo-400"
                    clearable
                    :indicator="!tag.value"
                    @clear="handleDelete(tag)"
                />
            </div>
            <p v-else class="grow text-center text-gray-500 text-[15px]">
                No Tags Added
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { QuestionTag } from "~/models/QuestionModel";
import { Optional } from "utility-types";

const { $api } = useNuxtApp()

const questionsStore = useQuestionsStore()

const { tags } = storeToRefs(questionsStore)

export interface Props {
    savedTags: QuestionTag[],
    modelValue: Optional<QuestionTag, 'value'>[]
}

const props = withDefaults(defineProps<Props>(), {
    tags: () => [],
    modelValue: () => []
})

const emit = defineEmits<{
    'update:modelValue': [v: Props['modelValue']]
}>()

const tagsLimit = ref(6)
const tag = ref<string | null>(null)

const { loading: createLoading, addLoading: addCreateLoading, removeLoading: removeCreateLoading } = useLoading(false)
const handleCreate = async (name: string) => {
    try {
        addCreateLoading()
        const res = await $api.questions.CREATE_TAG({ label: name })
        await questionsStore.fetchAvailableTags()
        tag.value = res.value
    } catch (e) {

    } finally {
        removeCreateLoading()
    }
}

const handleAdd = () => {
    if (!duplicated.value && !limitExceeded.value) {
        emit('update:modelValue', [...props.modelValue, tag])
        tag.value = null
    }
}

const handleDelete = (tag: Optional<QuestionTag, 'value'>) => {
    emit(
        'update:modelValue',
        props.modelValue.filter(_tag => _tag.value ? _tag.value !== tag.value : _tag.label !== tag.label)
    )
}

const duplicated = computed(() => props.modelValue.some(tag => tag.label === text.value))
const limitExceeded = computed(() => props.modelValue.length >= tagsLimit.value)

</script>