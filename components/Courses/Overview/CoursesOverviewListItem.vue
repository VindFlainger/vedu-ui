<template>
    <div class="relative p-3 bg-gray-50 rounded-lg border border-gray-100 flex flex-col
        shadow-[rgba(17,_17,_26,_0.1)_0px_4px_16px,_rgba(17,_17,_26,_0.05)_0px_8px_32px]
        ">
        <p class="font-bold mb-2">
            {{ course.name }}
        </p>
        <img
            class="rounded h-[180px] object-cover"
            :src="course.image?.original || noCourseCoverImage"
            :alt="course.name"
        >
        <div class="flex flex-col flex-grow gap-3 mt-3">
            <div >
                <p class="text-[13px] font-medium text-gray-800 mb-px">Теги</p>
                <div v-if="course.tags.length" class="flex flex-wrap gap-2" >
                    <u-tag
                        v-for="tag in course.tags.slice(0, 2)"
                        :key="tag"
                        :value="tag"
                        size="sm"
                        font-size="12"
                        class="whitespace-nowrap shrink-0"
                    />
                    <u-tag
                        v-if="course.tags.length > 2"
                        :value="`+${course.tags.length - 2}`"
                        size="sm"
                        font-size="12"
                        class="whitespace-nowrap shrink-0"
                    />
                </div>
                <div v-else>
                    <u-tag
                        value="Курс не имеет тегов"
                        size="sm"
                        font-size="12"
                        color="gray-400"
                    />
                </div>
            </div>
            <div class="mt-auto">
                <p class="text-[13px] font-medium text-gray-800 mb-px">Инструкторы</p>
                <u-avatar-group
                    :avatars="computedInstructors"
                    flex-show
                    size="30"
                    space-size="10"
                    :total="course.instructors_stats.total_count"
                />
            </div>
            <div>
                <p class="text-[13px] font-medium text-gray-800 mb-px">Студенты</p>
                <u-avatar-group
                    v-if="course.students_stats.total_count"
                    :avatars="computedStudents"
                    flex-show
                    size="30"
                    space-size="10"
                    :total="course.students_stats.total_count"
                />
                <div v-else class="text-[13px] text-gray-500 py-[5px]">
                    Еще не добавлены
                </div>
            </div>
            <div v-if="course.start">
                <p class="text-[13px] font-medium text-gray-800 mb-px">Даты</p>
                <div class="flex gap-3">
                    <div class="flex gap-1 items-center">
                        <u-icon size="17" value="CalendarDays" class="[&_svg]:stroke-2 relative bottom-px"/>
                        <span class="text-xs">{{$luxon.fromISO(course.start).toFormat('dd MMM yyyy')}}</span>
                    </div>
                    <span class="text-sm">-</span>
                    <div class="flex gap-1 items-center">
                        <u-icon size="17" value="CalendarDays" class="[&_svg]:stroke-2 relative bottom-px"/>
                        <span class="text-xs ">{{$luxon.fromISO(course.end).toFormat('dd MMM yyyy')}}</span>
                    </div>
                </div>
            </div>
        </div>

        <u-button
            class="!absolute top-1 right-1"
            icon="Trash"
            icon-style
            color="red-500"
            @click="emit('delete')"
        />

        <div class="flex justify-between mt-5">
            <u-button
                v-if="isInstructor"
                label="Управлять"
                size="xs"
                @click="emit('manage')"
            />
            <u-button
                label="Открыть"
                size="xs"
                @click="router.push({
                    name: 'courses-course',
                    params: {
                        course: course.id
                    }
                })"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { CourseBasePreview } from "~/types/courses";
import noCourseCoverImage from "~/assets/images/no-image/no-course-cover.png"
const router = useRouter()

const accountStore = useAccountStore()

const { isInstructor } = storeToRefs(accountStore)

export interface Props {
    course: CourseBasePreview
}

const props = withDefaults(defineProps<Props>(), {

})

const emit = defineEmits<{
    'manage': []
    'delete': []
}>()


const computedStudents = computed(() => props.course.students_stats.preview.map(student => ({
        firstName: student.personal_data.first_name,
        lastName: student.personal_data.last_name,
        image: student.avatar?.original,
    }))
)

const computedInstructors = computed(() => props.course.instructors_stats.preview.map(instructor => ({
        firstName: instructor.personal_data.first_name,
        lastName: instructor.personal_data.last_name,
        image: instructor.avatar?.original
    }))
)
</script>

<style scoped>

</style>