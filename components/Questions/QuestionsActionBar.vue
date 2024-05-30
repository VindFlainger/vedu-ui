<template>
    <div>
        <div class="flex items-center">
            <UDropdown
                width="300"
                popper-class="!rounded-xl"
                @visible-change="tagsDropdownVisible = $event"
            >
                <template #opener>
                    <UButton
                        icon-style
                        icon="Funnel"
                        class="self-start group-hover:after:!bg-primary-700"
                        color="primary-800"
                    />
                </template>
                <template #content>
                    <div class="pt-3 px-3">
                        <UInput
                            ref="tagInput"
                            placeholder="Tag Name"
                            v-model="tagQuery"
                            color="primary-700"
                            autofocus
                        />
                        <div class="py-5">
                            <div v-if="visibleTags.length" class="flex flex-wrap gap-2">
                                <UTag
                                    v-for="tag in visibleTags"
                                    :key="tag.id"
                                    :value="tag.name"
                                    class="cursor-pointer"
                                    @click="handleAddTag(tag.id)"
                                />
                                <UTag
                                    v-if="(filteredTags.length - visibleTags.length) > 0"
                                    :value="`+${filteredTags.length - visibleTags.length}`"
                                    class="border-dashed"
                                />
                            </div>
                            <div v-else class="flex flex-col gap-1 items-center py-6">
                                <UIcon value="FaceFrown" color="gray-600"/>
                                <p class="text-center text-sm text-gray-600">No Tags Found</p>
                            </div>
                        </div>
                    </div>
                </template>
            </UDropdown>

            <div class="flex items-center cursor-pointer group ml-2" @click="$emit('open:addQuestionModal')">
                <UButton
                    icon-style
                    icon="Plus"
                    class="self-start group-hover:after:!bg-primary-700"
                    color="primary-800"
                />
                <span class="ml-[6px] text-sm">Новый вопрос</span>
            </div>
            <UInput
                :model-value="searchQuery"
                class="ml-auto mr-0 [&_input]:text-sm [&_input::placeholder]:text-gray-400 [&_input::placeholder]:font-light"
                right-icon="MagnifyingGlass"
                color="primary-800"
                placeholder="Имя, содержание, теги..."
                @update:model-value="emit('update:searchQuery', $event)"
            />
        </div>
        <div v-if="computedActiveTags.length" class="mt-5" >
            <div class="flex items-center ml-auto">
                <div class="flex flex-wrap gap-2 self-center">
                    <UTag
                        v-for="tag in computedActiveTags"
                        :key="tag"
                        :value="tag.name"
                        clearable
                        @clear="handleRemoveTag(tag.id)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { QuestionTag } from "~/models/QuestionModel";

export interface Props {
    searchQuery?: string,
    tags: QuestionTag[],
    activeTags?: string[]
}

const props = withDefaults(defineProps<Props>(), {
    activeTags: () => [],
    tags: () => []
})

const emit = defineEmits<{
    'update:searchQuery': [v: Props['searchQuery']],
    'update:activeTags': [v: Props['activeTags']],
    'open:addQuestionModal': [],
}>()

const tagsLimit = ref(10)


const tagQuery = ref('')

const availableTags = computed(() => props.tags.filter(tag => !props.activeTags.some(x => x === tag.id)))
const filteredTags = computed(() => availableTags.value.filter(tag => !tagQuery.value || tag.name.toLowerCase().includes(tagQuery.value.toLowerCase())))
const visibleTags = computed(() => filteredTags.value.slice(0, tagsLimit.value))
const computedActiveTags = computed(() => props.tags.filter(tag => props.activeTags.some(x => x === tag.id)))

const tagInput = ref()
const tagsDropdownVisible = ref(false)

watch(tagsDropdownVisible, (v) => {
    if (v) tagInput.value.input.focus()
})

const handleAddTag = (v: string) => {
    emit('update:activeTags', [...props.activeTags, v])
}

const handleRemoveTag = (v: string) => {
    emit('update:activeTags', props.activeTags.filter(tag => tag !== v))
}


</script>