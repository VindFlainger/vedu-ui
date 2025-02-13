<template>
    <div class="relative border border-gray-200 rounded-2xl p-5 shadow-[0_0_3px_#e5e7eb]">
        <p class="text-gray-900 font-bold text-lg">
            Задание #{{ index + 1 }}
        </p>
        <div class="mt-2">
            <div v-if="assignment.description">
                <p class="font-medium text-gray-900">
                    Описание:
                </p>
                <div v-html="assignment.description"/>
            </div>
            <div class="mt-1" v-if="assignment.files.length">
                <p class="font-medium text-gray-900">
                    Файлы:
                </p>
                <div class="flex gap-3 mt-2">
                    <FilePreview
                        v-for="file in assignment.files"
                        :key="file.path"
                        :name="file.name"
                        :url="file.url"
                        download
                    />
                </div>
            </div>
        </div>

        <div class="mt-5">
            <u-button
                v-if="isInstructor"
                label="Показать ответы"
                @click="showAssignmentResponsesModal = true"
            />
            <u-button
                v-else
                :label="assignment.response ? 'Показать ответы' : 'Прикрепить ответ'"
                @click="showAddResponseModal = true"
            />
        </div>

        <div v-if="isInstructor" class="flex gap-1 absolute -right-2 -top-3">
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
                    title: `Delete Assignment ${index + 1}`,
                    text: 'This will make this material inaccessible to students and it will be impossible to restore it.',
                    cb: handleDelete
                })"
            />
        </div>

        <AssignmentResponsesModal
            v-if="showAssignmentResponsesModal"
            :lesson-id="lessonId"
            :course-id="courseId"
            :assignment-id="assignment.id"
            @close="showAssignmentResponsesModal = false"
        />

        <AddResponseModal
            v-if="showAddResponseModal"
            :course-id="courseId"
            :lesson-id="lessonId"
            :assignment-id="assignment.id"
            :response="assignment.response"
            @close="showAddResponseModal = false"
            @added="emit('action')"
        />

    </div>
</template>

<script setup lang="ts">
import { LessonAssignment, LessonAssignmentResponse } from "~/types/lesson";

export interface Props {
    courseId: string
    lessonId: string,
    assignment: LessonAssignment & { response?: null | LessonAssignmentResponse },
    index: number
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'delete': [],
    'edit': [],
    'action': []
}>()


const accountStore = useAccountStore()
const { isInstructor } = storeToRefs(accountStore)

const handleDelete = async () => {
    emit('delete')
}

const handleEdit = async () => {
    emit('edit')
}

const showAssignmentResponsesModal = ref(false)
const showAddResponseModal = ref(false)
</script>