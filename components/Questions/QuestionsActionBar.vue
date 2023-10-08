<template>
    <div>
        <div class="flex items-center">
            <div class="flex items-center cursor-pointer group" @click="$emit('open:addQuestionModal')">
                <UButton
                    icon-style
                    icon="Plus"
                    class="self-start group-hover:after:!bg-primary-700"
                    color="primary-800"
                />
                <span class="ml-[6px] text-sm">Add Question</span>
            </div>
            <UInput
                :model-value="searchQuery"
                class="ml-auto mr-0 [&_input]:text-sm [&_input::placeholder]:text-gray-400 [&_input::placeholder]:font-light"
                right-icon="MagnifyingGlass"
                color="primary-800"
                placeholder="Name, content or tags..."
                @update:model-value="emit('update:searchQuery', $event)"
            />
        </div>
        <div class="mt-2">
            <div class="flex ml-auto">
                <UDropdown label="asdasd">
                    <template #opener>
                        <UButton
                            icon-style
                            icon="Funnel"
                            class="self-start group-hover:after:!bg-primary-700"
                            color="primary-800"
                        />
                    </template>
                    <template #content>
                        asdasdas asdasdas asdasdas asdasdas asdasdas asdasdas asdasdas asdasdas asdasdas asdasdas asdasdas
                    </template>
                </UDropdown>
                <div class="flex gap-2 ml-3 self-center">
                    <UTag
                        v-for="tag in activeTags"
                        :key="tag"
                        :value="tag.label"
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
    activeTags?: QuestionTag[]
}

const props = withDefaults(defineProps<Props>(), {
    activeTags: () => []
})

const emit = defineEmits<{
    'update:searchQuery': [v: Props['searchQuery']],
    'open:addQuestionModal': [],
}>()

</script>