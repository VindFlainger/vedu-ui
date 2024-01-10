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
                    [`The maximum number of answers is ${answersLimit}`, 'error', limitExceeded && text.length],
                    [`No more than one correct answer, uncheck the answer box below`, 'error', type === 'single' && hasCorrectAnswers && correct],
                ]"
                @enter="handleAdd"
            >
                <template #suffix>
                    <UTooltip content="Correct Mark" placement="top" v-if="type!=='text'">
                        <UCheckbox v-model="correct" size="lg" color="primary-700" class="mr-1"
                                   :radioStyle="type === 'single'"/>
                    </UTooltip>
                </template>
            </UInput>
            <UButton
                class="self-start shrink-0"
                label="Add"
                size="md"
                :disabled="!text.length || duplicated || (type === 'single' && hasCorrectAnswers && correct)"
                @click="handleAdd"
            />
        </div>
        <div
            class="p-3 min-h-[70px] flex items-center border border-dashed border-gray-400 bg-gray-50 mt-3 rounded-lg select-none">
            <div v-if="modelValue?.length" class="flex flex-wrap gap-3">
                <UTag
                    v-for="answer in addedAnswers"
                    :key="answer.label"
                    :value="answer.label"
                    clearable
                    color="primary-900"
                    :indicator="answer.new"
                    @clear="handleDelete(answer.label)"
                >
                    <template #prefix>
                        <UCheckbox
                            v-if="['single', 'multiple'].includes(type)"
                            :radioStyle="type === 'single'"
                            :model-value="(answer as QuestionMultipleAnswer).correct"
                            class="mr-1 rounded-full"
                            color="primary-900"
                            @change="handleCorrect(answer.label)"
                        />
                    </template>
                </UTag>
            </div>
            <p v-else class="grow text-center text-gray-500 text-[15px]">
                No Answers Added
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">

import { QuestionMultipleAnswer } from "~/models/QuestionModel";
import { Optional } from "utility-types";

export interface Props {
    type: 'text' | 'multiple' | 'single',
    modelValue?: Optional<QuestionMultipleAnswer, 'value'>[] | string[],
    savedAnswers?: QuestionMultipleAnswer[] | string[]
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    savedAnswers: () => []
})

const emit = defineEmits<{
    'update:modelValue': [v: Props['modelValue']],
}>()

const text = ref('')
const correct = ref(false)
const answersLimit = ref(10)

const addedAnswers = computed(() => props.modelValue.map(v => ({
    correct: props.type === 'text' ? false : (v as QuestionMultipleAnswer).correct,
    label: props.type === 'text' ? v : (v as QuestionMultipleAnswer).label,
    new: !props.savedAnswers.some(answer =>
        props.type === 'text' ?
            answer === v :
            (answer as QuestionMultipleAnswer).label === (v as QuestionMultipleAnswer).label
    )
})))

const handleAdd = () => {
    if (!duplicated.value && !limitExceeded.value) {
        let answer;
        if (props.type === 'single' || props.type === 'multiple') {
            answer = {
                label: text.value,
                ...correct.value ? { correct: true } : {},
            }
        } else {
            answer = text.value
        }

        emit('update:modelValue', [...props.modelValue, answer as any])
        text.value = ''
        correct.value = false
    }
}

const handleDelete = (answer: string) => {
    emit(
        'update:modelValue',
        (props.modelValue as any[]).filter(v => props.type === 'text' ? v !== answer : (v as QuestionMultipleAnswer).label !== answer)
    )
}

const handleCorrect = (answer: string) => {
    emit('update:modelValue', (props.modelValue as Optional<QuestionMultipleAnswer, 'value'>[]).map((v) => ({
        ...v,
        correct: answer === v.label ? !v.correct : props.type === 'single' ? false : v.correct
    })))
}

const duplicated = computed(() => props.modelValue.some(x => props.type === 'text' ? x === text.value : (x as QuestionMultipleAnswer).label === text.value))
const limitExceeded = computed(() => props.modelValue.length >= answersLimit.value)
const hasCorrectAnswers = computed(() => props.modelValue.some((value: any) => value.correct))


</script>