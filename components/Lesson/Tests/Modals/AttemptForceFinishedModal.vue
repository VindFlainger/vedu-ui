<template>
    <u-dialog
        ref="modal"
        title="Add Lesson"
        icon="Plus"
        max-width="420"
        hide-header
    >
        <template #default="{ close }">
            <p class="font-medium text-red-500 text-lg">
                Тест был предварительно завершен преподавателем!
            </p>
            <div class="mt-2">
                <p class="text-[15px] font-medium">Дата</p>
                <p class="text-gray-600 text-[15px]">
                    {{ $luxon.fromISO(date).toFormat($dateFormats.dateTimeFormat) }}
                </p>
                <p class="mt-3 text-[15px] font-medium">Причина</p>
                <p class="text-gray-600 text-[15px]">{{reason}}</p>
            </div>
            <div class="mt-6 flex gap-3 justify-end">
                <u-button
                    label="Вернуться к тестам"
                    left-icon="ChevronLeft"
                    text
                    :left-icon-props="{'stroke-width': 3}"
                    @click="emit('back'); close()"
                />
                <u-button
                    label="Результаты"
                    left-icon="Newspaper"
                    :left-icon-props="{'stroke-width': 2}"
                    @click="emit('results'); close()"
                />
            </div>
        </template>
    </u-dialog>
</template>

<script setup lang="ts">
export interface Props {
    date: string
    reason: string
}

const props = withDefaults(defineProps<Props>(), {

})

const emit = defineEmits<{
    'back': []
    'results': []
}>()

</script>>