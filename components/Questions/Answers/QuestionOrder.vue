<template>
    <div>
        <div class="flex gap-3 items-start">
            <UInput
                info-line
                size="sm"
                v-model="text"
                class="max-w-xs grow"
                maxlenght="256"
                :conditions="[
                    ['Answers duplicated', 'error', duplicated],
                    [`The maximum number of answers is ${answersLimit}`, 'error', limitExceeded && text.length]
                ]"
                @enter="handleAdd"
            />
            <UButton
                class="self-start shrink-0"
                label="Add"
                size="md"
                :disabled="!text.length || duplicated"
                @click="handleAdd"
            />
        </div>
        <div class="mt-2">
            <Container
                v-if="modelValue?.length"
                class="flex flex-col gap-3 !overflow-x-visible [&_.dndrop-draggable-wrapper]:!overflow-visible"
                @drop="handleDrop"
            >
                <Draggable
                    v-for="(answer,i) in sortedAnswers"
                    :key="answer.value || answer.label"
                    class="relative flex border-primary-900 border-dashed border-2 cursor-pointer py-2 pr-2 pl-5 rounded-lg select-none bg-white"
                >
                    <div>
                        <p class="absolute -left-3 outline outline-2 outline-white top-1/2 -translate-y-1/2 w-6 h-6 border-2 border-primary-900
                               flex items-center justify-center shrink-0 rounded-full bg-primary-700 self-start font-medium text-sm text-white"
                        >
                            <span class="relative top-px">{{ answer.order + 1 }}</span>
                        </p>
                        <p>{{ answer.label }}</p>
                    </div>
                </Draggable>
            </Container>
            <p v-else class="flex items-center justify-center min-h-[70px] rounded-lg text-gray-500 text-[15px] border border-dashed border-gray-300 bg-gray-50">
                No Answers Added
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Optional } from "utility-types";
import { QuestionOrderAnswer } from "~/models/QuestionModel";
// @ts-ignore
import { Container, Draggable } from 'vue-dndrop'

export interface Props {
    modelValue?: Optional<QuestionOrderAnswer, 'value'>[],
    savedAnswers?: QuestionOrderAnswer[]
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    savedAnswers: () => []
})

const emit = defineEmits<{
    'update:modelValue': [v: Props['modelValue']],
}>()

const answersLimit = ref(8)
const text = ref('')

const sortedAnswers = computed(() => props.modelValue.sort((a, b) => a.order - b.order))

const handleDrop = (e: any) => {
   props.modelValue.forEach((ans, i) => {
       if (ans.order === e.removedIndex) ans.order = e.addedIndex
       else if (e.removedIndex > e.addedIndex && ans.order >= e.addedIndex && ans.order < e.removedIndex) {
           ans.order++
       } else if (e.removedIndex < e.addedIndex && ans.order <= e.addedIndex && ans.order > e.removedIndex) {
           ans.order--
       }
   })
}

const handleAdd = () => {
    if (!duplicated.value && !limitExceeded.value) {
        const last = props.modelValue[props.modelValue.length - 1]
        const answer = {
            label: text.value,
            order: last?last.order + 1: 0
        }
        emit('update:modelValue', [...props.modelValue, answer])
        text.value = ''
    }
}

const duplicated = computed(() => props.modelValue.some(x => x.label === text.value))
const limitExceeded = computed(() => props.modelValue.length >= answersLimit.value)

</script>

<style>

</style>

