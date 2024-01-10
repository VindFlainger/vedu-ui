<template>
    <div class="p-3 bg-gray-50 rounded-lg border border-gray-100 flex flex-col
        shadow-[rgba(17,_17,_26,_0.1)_0px_4px_16px,_rgba(17,_17,_26,_0.05)_0px_8px_32px]
        ">
        <p class="font-bold mb-2">
            {{ name }}
        </p>
        <p>{{ category.name }}</p>
        <img
            class="rounded"
            :src="img"
            :alt="name"
        >
        <div class="flex flex-col flex-grow gap-3 mt-3">
            <div >
                <p class="text-[13px] font-medium text-gray-800 mb-px">Tags</p>
                <div v-if="tags && tags.length" class="flex flex-wrap gap-2" >
                    <u-tag
                        v-for="tag in tags.slice(0, 2)"
                        :key="tag.id"
                        :value="tag.name"
                        size="sm"
                        font-size="12"
                        class="whitespace-nowrap shrink-0"
                    />
                    <u-tag
                        v-if="tags.length > 2"
                        :value="`+${tags.length - 2}`"
                        size="sm"
                        font-size="12"
                        class="whitespace-nowrap shrink-0"
                    />
                </div>
                <div v-else>
                    <u-tag
                        value="No tags related to course"
                        size="sm"
                        font-size="12"
                        color="gray-400"
                    />
                </div>
            </div>
            <div class="mt-auto">
                <p class="text-[13px] font-medium text-gray-800 mb-px">Instructors</p>
                <UAvatarGroup
                    :avatars="computedInstructors"
                    flex-show
                    size="30"
                    space-size="10"
                />
            </div>
            <div>
                <p class="text-[13px] font-medium text-gray-800 mb-px">Students</p>
                <UAvatarGroup
                    :avatars="computedStudents"
                    flex-show
                    size="30"
                    space-size="10"
                    :total="10000"
                />
            </div>
            <div v-if="start">
                <p class="text-[13px] font-medium text-gray-800 mb-px">Dates</p>
                <div class="flex gap-3">
                    <div class="flex gap-1 items-center">
                        <u-icon size="17" value="CalendarDays" class="[&_svg]:stroke-2 relative bottom-px"/>
                        <span class="text-xs">{{$luxon.fromISO(start).toFormat('dd MMM yyyy')}}</span>
                    </div>
                    <span class="text-sm">-</span>
                    <div class="flex gap-1 items-center">
                        <u-icon size="17" value="CalendarDays" class="[&_svg]:stroke-2 relative bottom-px"/>
                        <span class="text-xs ">{{$luxon.fromISO(end).toFormat('dd MMM yyyy')}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-5">
            <u-button
                label="Manage"
                size="xs"
                @click="emit('manage')"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { CoursesCategory, CoursesInstructor, CoursesStudent, CoursesTag } from "~/types/courses";

export interface Props {
    name: string,
    img?: string,
    type: string,
    category: CoursesCategory,
    tags?: CoursesTag[],
    start?: string,
    end?: string,
    instructors: CoursesInstructor[],
    studentsPreview: CoursesStudent[],
    totalStudents: number,
}

const props = withDefaults(defineProps<Props>(), {
    studentsPreview: () => [],
    tags: () => []
})

const emit = defineEmits<{
    'manage': []
}>()


const computedStudents = computed(() => props.studentsPreview.map(student => ({
        firstName: student.first_name,
        lastName: student.last_name,
        image: student.img as string,
    }))
)

const computedInstructors = computed(() => props.instructors.map(student => ({
        firstName: student.first_name,
        lastName: student.last_name,
        image: student.img as string,
    }))
)
</script>

<style scoped>

</style>