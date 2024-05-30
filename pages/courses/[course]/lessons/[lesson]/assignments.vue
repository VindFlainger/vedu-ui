<template>
    <div>
        <div v-if="isInstructor" class="flex pb-6 -mt-3">
            <u-button
                class="ml-auto mr-0"
                label="Добавить задание"
                @click="showAddAssignmentModal = true"
            />
        </div>
        <div v-if="assignments" class="flex flex-col gap-5">
            <AssignmentItem
                v-for="(assignment, i) in assignments"
                :key="assignment.id"
                :course-id="route.params.course"
                :lesson-id="route.params.lesson"
                :assignment="assignment"
                :index="i"
                @delete="handleDelete(assignment.id)"
                @edit="handleShowEdit(assignment)"
            />
        </div>
        <div v-else-if="loading">
            Loading
        </div>

        <AddAssignmentModal
            v-if="showAddAssignmentModal"
            :edit="!!selectedAssignment"
            :course-id="route.params.course"
            :lesson-id="route.params.lesson"
            :assignment-id="selectedAssignment?.id"
            :description="selectedAssignment?.description"
            :files="selectedAssignment?.files"
            @assignment-added="handleAdd"
            @assignment-edited="handleEdit"
            @close="showAddAssignmentModal = false; selectedAssignment = null"
        />
    </div>
</template>

<script setup lang="ts">
import { LessonAssignment, LessonAssignmentResponse } from '~/types/lesson'

const { $api } = useNuxtApp()
const route = useRoute()

const accountStore = useAccountStore()
const { isInstructor } = storeToRefs(accountStore)

const assignments = ref<(LessonAssignment & { response: null | LessonAssignmentResponse })[] | null>(null)

const { loading, addLoading, removeLoading } = useLoading()
const fetch = async () => {
    try {
        addLoading()
        const res = await $api.lesson.GET_LESSON_ASSIGNMENTS({
            course_id: route.params.course as string,
            lesson_id: route.params.lesson as string
        })
        assignments.value = res
    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}


const showAddAssignmentModal = ref(false)

const selectedAssignment = ref<null | LessonAssignment>(null)
const handleShowEdit = (assignment: LessonAssignment) => {
    selectedAssignment.value = assignment
    showAddAssignmentModal.value = true
}

const handleDelete = async (id: string) => {
    try {
        if (assignments.value) assignments.value = assignments.value.filter(assignment => assignment.id !== id)
        await $api.lesson.DELETE_LESSON_ASSIGNMENT({
            course_id: route.params.course as string,
            lesson_id: route.params.lesson as string,
            assignment_id: id
        })
    } catch (err) {
        console.log(err)
    } finally {

    }
}

const handleAdd = (assignment: LessonAssignment) => {
    if (assignments.value) assignments.value.unshift(assignment)
}

const handleEdit = (assignment: LessonAssignment) => {
    if (assignments.value) assignments.value = assignments.value.map(v => v.id === assignment.id ? assignment : v)
}

fetch()
</script>

