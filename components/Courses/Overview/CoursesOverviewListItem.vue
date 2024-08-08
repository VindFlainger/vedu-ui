<template>
    <div class="relative flex flex-col rounded-3xl bg-gray-100 p-4 sm:rounded-[32px] sm:p-5 lg:p-7 2xl:p-5">
        <p
            class="text-xl font-extrabold leading-6 text-gray-800 font-nunito sm:line-clamp-2
               sm:h-[56px] sm:text-2xl sm:leading-7"
        >
            {{ course.name }}
        </p>
        <SizedImage
            class="mt-3 !rounded-xl sm:!rounded-2xl"
            :image="course.image"
            :empty-image="noCourseCoverImage"
            :height="180"
            width="100%"
        />
        <div class="mt-3 flex flex-grow flex-col gap-3">
            <div >
                <p class="mb-px font-medium text-gray-800 text-[13px]">Теги</p>
                <div v-if="course.tags.length" class="flex flex-wrap gap-2" >
                    <u-tag
                        v-for="tag in course.tags.slice(0, 2)"
                        :key="tag"
                        :value="tag"
                        size="sm"
                        font-size="12"
                        class="shrink-0 whitespace-nowrap"
                    />
                    <u-tag
                        v-if="course.tags.length > 2"
                        :value="`+${course.tags.length - 2}`"
                        size="sm"
                        font-size="12"
                        class="shrink-0 whitespace-nowrap"
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
                <p class="mb-px font-medium text-gray-800 text-[13px]">Инструкторы</p>
                <u-avatar-group
                    :avatars="computedInstructors"
                    flex-show
                    size="30"
                    space-size="10"
                    :total="course.instructors_stats.total_count"
                />
            </div>
            <div>
                <p class="mb-px font-medium text-gray-800 text-[13px]">Студенты</p>
                <u-avatar-group
                    v-if="course.students_stats.total_count"
                    :avatars="computedStudents"
                    flex-show
                    size="30"
                    space-size="10"
                    :total="course.students_stats.total_count"
                />
                <div v-else class="text-gray-500 text-[13px] py-[5px]">
                    Еще не добавлены
                </div>
            </div>
            <div v-if="course.start">
                <p class="mb-px font-medium text-gray-800 text-[13px]">Даты</p>
                <div class="flex gap-3">
                    <div class="flex items-center gap-1">
                        <u-icon size="17" value="CalendarDays" class="relative bottom-px [&_svg]:stroke-2"/>
                        <span class="text-xs">{{$luxon.fromISO(course.start).toFormat('dd MMM yyyy')}}</span>
                    </div>
                    <span class="text-sm">-</span>
                    <div class="flex items-center gap-1">
                        <u-icon size="17" value="CalendarDays" class="relative bottom-px [&_svg]:stroke-2"/>
                        <span class="text-xs">{{$luxon.fromISO(course.end).toFormat('dd MMM yyyy')}}</span>
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

        <div class="mt-5 flex justify-between">
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