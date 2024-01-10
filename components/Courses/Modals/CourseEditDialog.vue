<template>
    <UDialog
        :max-width="1100"
        :title="`${ course ? 'Edit': 'Create' } Course`"
        :icon="course?'Pencil':'Plus'"
    >
        <div class="grid grid-cols-5 gap-16">
            <div class="flex flex-col gap-4 col-span-2">
                <UInput
                    v-model="name"
                    label="Course Name"
                    required
                    placeholder="Name"
                />
                <div>
                    <ULabel class="mb-[6px]" label="Course Type" required/>
                    <UCheckboxGroup v-model="type" :options="typeOptions" :multiple="false"/>
                </div>
                <UCascader />
                <USelect label="Course Category" placeholder="Category"/>
                <UDateInput
                    v-model="startDate"
                    label="Start Date"
                    placeholder="Date"
                />
                <UDateInput
                    v-model="endDate"
                    label="End Date"
                    placeholder="Date"
                    :min-date="startDate"
                    :disabled="!startDate"
                />
            </div>
            <div class="flex flex-col gap-4 col-span-3">
                <div>
                    <ULabel class="mb-[6px]" label="Course Introduction" required/>
                    <RichTextEditor class="mt-2" height="200" placeholder="Course description (describe the essence of the course, the main skills and the technologies used)"/>
                </div>
                <div>
                    <ULabel class="mb-[6px]" label="Course Image"/>
                    <DragDropFileUpload/>
                </div>
            </div>
        </div>
    </UDialog>
</template>

<script setup lang="ts">
import { CoursesCourse } from "~/types/courses";
import UCategorySelect from "~/ui/UCategorySelect.vue";

export interface Props {
    course?: CoursesCourse
}

const props = withDefaults(defineProps<Props>(), {

})

const typeOptions = [
    {
        value: 'public',
        label: 'Public'
    },
    {
        value: 'private',
        label: 'Private'
    },
    {
        value: 'paid',
        label: 'Paid'
    }
]

const name = ref('')
const type = ref('public')
const category = ref('')
const startDate = ref()
const endDate = ref()

const initData = () => {
    if (props.course){
        name.value = props.course.name
    }
}

initData()

</script>

<style scoped>

</style>