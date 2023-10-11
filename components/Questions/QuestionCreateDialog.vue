<template>
    <UDialog title="Create Question" icon="Plus" ref="dialog">
        <template v-slot:default="{close}">
            <div>
                <div class="flex gap-2 flex-col">
                    <UInput
                        class="max-w-[300px]"
                        v-model="title"
                        :conditions="[[
                            'Field is required', 'error', !title.length && submitted
                        ]]"
                        info-line
                        maxlenght="30"
                        label="Title"
                        label-class="!font-bold"
                        required
                    />
                </div>
                <div class="mt-1 flex gap-2 flex-col">
                    <USelect
                        class="max-w-[300px]"
                        :options="typeOptions"
                        v-model="type"
                        info-line
                        required
                        label="Type"
                        label-class="!font-bold"
                    />
                </div>
                <div class="mt-3">
                    <p class="font-bold" :class="{'text-red-500': !content.length  && submitted}">
                        Content <span class="text-red-500 -ml-[2px] inline-block">*</span>
                    </p>
                    <client-only>
                        <QuestionEditor
                            v-model="content"
                            class="mt-2"
                            :error-state="(!content.length || contentOverflow) && submitted"
                        />
                    </client-only>
                    <p v-if="!content.length && submitted" class="text-red-500 text-sm mt-1 ml-1">
                        Field is required
                    </p>
                    <div v-else-if="content.length" class="mt-3">
                        <UProgress
                            :value="content.length"
                            type="increase"
                            :max="characterLimit"
                            class="w-full h-2"
                        />
                        <p
                            class="text-[13px] mt-1 text-gray-600"
                            :class="{'text-red-500': contentOverflow}"
                        >
                            This scale displays the allowable payload for the question. The payload includes not only
                            symbols, but also decorations and media. To increase the limit upgrade your plan.
                        </p>
                    </div>
                </div>
                <div class="mt-5">
                    <p class="font-bold ">Tags</p>
                    <QuestionTags class="mt-2" v-model="tags"/>
                </div>
                <div class="mt-6">
                    <p class="font-bold ">Correct Answers <span class="text-red-500 -ml-[2px] inline-block">*</span></p>
                    <QuestionTSM
                        v-if="['text', 'single', 'multiple'].includes(type)"
                        class="mt-2"
                        v-model="answers"
                        :type="type as 'text' | 'single' | 'multiple'"
                    />
                    <QuestionOrder
                        v-else-if="type === 'order'"
                        class="mt-2"
                        v-model="answers"
                    />
                </div>
            </div>
        </template>
        <template #footer="{close}">
            <UTransitionExpand>
                <div v-if="submitted && computedErrors.length"
                     class="flex gap-2  items-center text-sm text-red-500 border-2 border-dashed border-red-500 rounded-lg p-2 mb-4 bg-red-50">
                    <UIcon value="ExclamationCircle" color="red-500"/>
                    <div>
                        <p v-for="check in computedErrors" :key="check.text">
                            <span v-if="check.field" class="capitalize">{{ check.field }}:</span> {{ check.text }}
                        </p>
                    </div>
                </div>
            </UTransitionExpand>
            <div class="flex gap-4 justify-end">
                <UButton
                    label="Cancel"
                    text
                    text-color="#6b7280"
                    color="#b91c1c"
                    class="!font-light"
                    @click="close()"
                />
                <UButton
                    label="Save"
                    :disabled="submitted && failedChecks.length"
                    @click="handleCreate"
                    :loading="createLoading"
                />
            </div>
        </template>
    </UDialog>
</template>

<script setup lang="ts">
import { Question } from "~/models/QuestionModel";

const dialog = ref()

const { $api } = useNuxtApp()

export interface Props {

}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    created: []
}>()

const characterLimit = ref(500)
const typeOptions = ref([
    {
        value: 'text',
        label: 'Text'
    },
    {
        value: 'single',
        label: 'Single'
    },
    {
        value: 'multiple',
        label: 'Multiple'
    },
    {
        value: 'order',
        label: 'Order'
    }
])

const title = ref<Question['title']>('')
const type = ref<Question['type']>('text')
const answers = ref<Question['answers']>([])
const content = ref<Question['content']>('')
const tags = ref<Question['tags']>([])

watch(type, () => answers.value = [])

const contentOverflow = computed(() => content.value.length > characterLimit.value)

const checks = computed(() => [
    {
        field: 'title',
        text: 'Field is required',
        invalid: !title.value
    },
    {
        field: 'content',
        text: 'Field is required',
        invalid: !content.value
    },
    {
        field: 'content',
        text: 'The maximum content size has been exceeded',
        invalid: contentOverflow.value
    },
    {
        field: 'answers',
        text: 'You should add at least one answer',
        invalid: !answers.value.length
    },
    {
        field: 'answers',
        text: 'You should assign at least one correct answer',
        invalid: type.value === 'single' || type.value === 'multiple' ?
            !answers.value.some(answer => (answer as any).correct) : false
    }
])

const failedChecks = computed(() => checks.value
    .filter(check => check.invalid)
)

const submitted = ref(false)
const { errors, fieldErrors, generalErrors } = useRequestErrors(false)
const { loading: createLoading, addLoading: addCreateLoading, removeLoading: removeCreateLoading } = useLoading()
const handleCreate = async () => {
    submitted.value = true
    if (!failedChecks.value.length) {
        try {
            addCreateLoading()
            await $api.questions.CREATE_QUESTION({
                title: title.value,
                type: type.value,
                content: content.value,
                answers: answers.value,
                tags: tags.value
            })
            emit('created')
        } catch (e: any) {
            if (e.data.errors) errors.value = e.data.errors
        } finally {
            removeCreateLoading()
        }
    }
}

const computedErrors = computed(()=> {
    return [
        ...failedChecks.value,
        ...fieldErrors.value,
        ...generalErrors.value.map(error => ({text: error}))
    ]
})


</script>

<style>
.dot {
    background: radial-gradient(circle, rgba(239, 68, 68, 0.63) 0%, rgba(239, 68, 68, 0.48) 25%, white 80%, white 100%);
    background-clip: padding-box;
}
</style>

