<template>
    <div class="flex flex-col rounded-3xl bg-gray-100 p-4 sm:rounded-[32px] sm:p-5 lg:p-7 2xl:p-5">
        <p
            class="text-xl font-extrabold leading-6 text-gray-800 font-nunito sm:line-clamp-2
               sm:h-[56px] sm:text-2xl sm:leading-7"
        >
            {{ question.title }}
        </p>
        <div class="mt-6">
            <div class="">
                <p>
                    <span class="font-bold">Тип:</span>
                    {{ typeOptions.find(option => option.value === question.type)?.label }}
                </p>
            </div>
            <div class="mt-3 ">
                <p class="capitalize">
                    <span class="font-bold">Создан:</span>
                    {{ $luxon.fromISO(question.created_at).toFormat($dateFormats.dayFormat) }}
                </p>
            </div>
            <div class="mt-3 ">
                <p class="capitalize">
                    <span class="font-bold">Изменен:</span>
                    {{ $luxon.fromISO(question.updated_at).toFormat($dateFormats.dayFormat) }}
                </p>
            </div>
            <div class="mt-3 ">
                <span class="font-bold">Текстовое содержание:</span>
                <client-only>
                    <p class="line-clamp-3 question-content" v-html="question.content"></p>
                </client-only>
            </div>
            <div v-if="question.tags.length" class="mt-3">
                <span class="font-bold">Теги:</span>
                <div class="mt-1 flex flex-wrap pb-1 question-tags gap-[6px]">
                    <UTag
                        v-for="tag in question.tags"
                        :key="tag.id"
                        :value="tag.name"
                        border-width="1"
                        font-size="14"
                    />
                </div>
            </div>
        </div>
        <div class="mt-auto mb-0 flex items-center justify-end gap-4 pt-6">
            <UButton
                label="Удалить"
                color="red-500"
                tag="button"
                left-icon="Trash"
                :left-icon-props="{
                    solid: true
                }"
                text
                @click="emit('remove')"
            />
            <UButton
                label="Изменить"
                left-icon="Pencil"
                :left-icon-props="{
                    solid: true
                }"
                @click="emit('edit')"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Question } from "~/models/QuestionModel";
import { questionOptions } from "~/config/questions/params";
const typeOptions = ref(questionOptions)

defineOptions({
    inheritAttrs: false
})

export interface Props {
    question: Question,
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'edit': [],
    'remove': []
}>()

</script>

<style scoped lang="scss">
.question-content :deep(img) {
    display: none;
}

.question-tags::-webkit-scrollbar {
    @apply h-[3px] bg-gray-100 rounded-full
}

.question-tags::-webkit-scrollbar-thumb {
    @apply h-[3px] bg-gray-200 rounded-full
}

.question-bg::after {
    @apply absolute inset-0 content-[''] z-[-1] opacity-10;
    background: url("@/assets/backgrounds/question-preview-bg.svg") 0 0 / cover;
}
</style>