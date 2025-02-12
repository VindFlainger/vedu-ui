<template>
    <div class="relative">
        <u-tooltip
            placement="top"
            :content="material.description || 'No description'"
            :max-width="300"
            :hide-after="1"
        >
            <a
                :href="material.file.url"
                :download="material.file.name"
                class="flex h-[100px] w-[100px] items-center justify-center rounded-2xl border border-gray-200 shadow-[0_0_3px_#e5e7eb] p-5 relative group"
            >
                <FilePreview
                    class="mt-2 shrink-0"
                    :url="material.file.url"
                    :name="material.file.name"
                />
                <div
                    class="absolute group-hover:flex hidden items-center justify-center content-[''] inset-0 bg-black/60 rounded-2xl">
                    <u-icon value="mdiDownload" color="white" size="36"/>
                </div>
            </a>
        </u-tooltip>

        <div v-if="isInstructor" class="flex gap-1 absolute -right-1 -top-2.5">
            <u-button
                icon="Pencil"
                icon-style
                color="blue-500"
                @click="handleEdit"
            />
            <u-button
                icon="XMark"
                icon-style
                color="red-500"
                @click="$emitter.emit('open:confirm-delete', {
                    title: `Удалить урок ${material.file.name}?`,
                    text: 'This will make this material inaccessible to students and it will be impossible to restore it.',
                    cb: handleDelete
                })"
            />
        </div>

    </div>


</template>

<script setup lang="ts">
import { LessonMaterial } from '~/types/lesson'

export interface Props {
    material: LessonMaterial
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'delete': [],
    'edit': []
}>()

const accountStore = useAccountStore()
const { isInstructor } = storeToRefs(accountStore)

const handleDelete = async () => {
    emit('delete')
}

const handleEdit = async () => {
    emit('edit')
}
</script>