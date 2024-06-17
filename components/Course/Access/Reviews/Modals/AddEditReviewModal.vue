<template>
    <u-dialog
        ref="modal"
        title="Добавить отзыв"
        icon="Plus"
        max-width="560"
    >
        <div class="mt-4 flex justify-center">
            <el-rate
                class="[&_.el-icon]:!w-[26px] [&_.el-icon]:!h-[26px] [&_.el-icon>svg]:!w-[26px] [&_.el-icon>svg]:!h-[26px] [&_.el-icon.is-active>svg]:!scale-[1.15]"
                v-model="amount"
            />
        </div>
        <u-input
            class="mt-3"
            v-model="text"
            type="textarea"
            label="Описание"
            placeholder="Опишите ваши впечатления о качестве учебных материалов и обратной связи с командой курса"
            :autosize="{ minRows: 8, maxRows: 12 }"
        />
        <template #footer>
            <div class="flex gap-3 justify-end">
                <u-button
                    class="font-bold"
                    font-weight="600"
                    label="Отмена"
                    :disabled="loading"
                    text
                    color="red-500"
                />
                <u-button
                    label="Сохранить"
                    :disabled="loading || addDisabled"
                    :loading="loading"
                    @click="submit"
                />
            </div>
        </template>
    </u-dialog>
</template>

<script setup lang="ts">
const { $api, $notifications } = useNuxtApp()
const intercomStore = useIntercomStore()


export interface Props {
    courseId: string
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'added': []
}>()

const modal = ref<any>(null)

const amount = ref(0)
const text = ref('')

const addDisabled = computed(() => {
    return !amount.value || !text.value
})

const { loading, addLoading, removeLoading } = useLoading()
const submit = async () => {
    try {
        addLoading()
        await $api.courses.ADD_COURSE_REVIEW({
            course_id: props.courseId,
            amount: amount.value,
            text: text.value
        })

        intercomStore.addNotification({
            type: 'success',
            title: $notifications.REVIEW_ADDED.title,
            text: $notifications.REVIEW_ADDED.message
        })

        modal.value.close()

        emit('added')
    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}

</script>