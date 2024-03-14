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

                <div>
                    <u-label label="Course Categories"/>
                    <div class="mt-1.5">
                        <div class="flex gap-1.5 items-center cursor-pointer"  @click="showCategoriesDialog = true">
                            <u-button
                                icon-style
                                icon="Plus"
                                size="sm"
                            />

                            <div class="flex items-center">
                                <span class="leading-4">Select</span>
                                <span v-if="selectedCategories.length" class="text-sm font-medium ml-2 leading-[14px] relative top-px">
                                    ({{ selectedCategories.length }} selected)
                                </span>
                            </div>
                        </div>

                    </div>
                </div>


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
                    <RichTextEditor class="mt-2" height="200"
                                    placeholder="Course description (describe the essence of the course, the main skills and the technologies used)"/>
                </div>
                <div>
                    <ULabel class="mb-[6px]" label="Course Image"/>
                    <DragDropFileUpload/>
                </div>
            </div>
        </div>

        <PickCategoryDialog
            v-if="showCategoriesDialog"
            v-model="selectedCategories"
            :categories="categories"
            @close="showCategoriesDialog = false"
        />

    </UDialog>
</template>

<script setup lang="ts">
import { CoursesCourse } from "~/types/courses";
import { useGlobalStore } from "~/stores/Global";

const globalStore = useGlobalStore()

const { categories } = storeToRefs(globalStore)

export interface Props {
    course?: CoursesCourse
}

const props = withDefaults(defineProps<Props>(), {})

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

const showCategoriesDialog = ref(false)

const name = ref('')
const type = ref('public')
const selectedCategories = ref([])
const startDate = ref()
const endDate = ref()

const initData = () => {
    if (props.course) {
        name.value = props.course.name
    }
}

initData()

</script>

<style scoped>

</style>