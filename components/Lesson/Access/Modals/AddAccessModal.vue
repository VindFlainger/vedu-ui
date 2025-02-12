<template>
    <u-dialog
        ref="modal"
        icon="Plus"
        title="Создать токен доступа"
        max-width="500"
        :freeze="loading"
        @close="$emit('close', link)"
    >
        <div v-if="!link" class="flex flex-col gap-3">
            <u-select
                v-model="type"
                label="Тип токена"
                placeholder="Выбрать"
                required
                :options="options"
            />

            <UDateInput
                v-model="expires"
                label="Срок действия"
                placeholder="Дата"
                :min-date="new Date()"
            />
        </div>
        <div v-else>
            <p class="text-2xl text-primary-900 font-bold text-center">
                Токен создан
            </p>
            <div class="mt-1 flex justify-center gap-1">
                <div v-for="i in 3" class="w-2 h-2 bg-primary-900 rounded-full"/>
            </div>
            <div class="mt-6 flex gap-2">
                <u-input
                    class="w-full"
                    readonly
                    :model-value="link"
                />
                <u-button
                    label="Копировать"
                    @click="$copy(link)"
                />
            </div>

            <div class="mt-8 flex justify-center">
                <img class="border-[3px] border-dashed border-primary-900  rounded-2xl" :src="linkQR" draggable="false">
            </div>
        </div>
        <template v-if="!link" #footer="{ close }">
            <div class="flex gap-3 justify-end" >
                <u-button
                    text
                    color="red-500"
                    label="Отмена"
                    :disabled="loading"
                    @click="close"
                />
                <u-button
                    :disabled="!type"
                    :loading="loading"
                    label="Сохранить"
                    @click="addToken"
                />
            </div>
        </template>
    </u-dialog>
</template>

<script setup lang="ts">
import QRCode from 'qrcode'
const { $api, $copy } = useNuxtApp()

export interface Props {
    courseId: string
}

const props = withDefaults(defineProps<Props>(), {})

const options = ref([
    {
        label: 'Одноразовый',
        value: 'single'
    },
    {
        label: 'Многоразовый',
        value: 'multiple'
    },
])

const expires = ref()
const type = ref()
const link = ref()
const linkQR = ref()

const { loading, addLoading, removeLoading } = useLoading()
const addToken = async () => {
    try {
        addLoading()

        const res = await $api.courses.GENERATE_COURSE_ACCESS_TOKEN({
            course_id: props.courseId,
            type: type.value,
            expires: expires.value
        })

        link.value = `${window.location.origin}/courses/${props.courseId}/access?token=${res.token}`
        linkQR.value = await QRCode.toDataURL(`${window.location.origin}/courses/${props.courseId}/access?token=${res.token}`)
    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}
</script>
