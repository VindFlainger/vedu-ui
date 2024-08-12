<template>
    <div
        class="relative flex flex-col rounded-2xl bg-gray-100 p-4 sm:rounded-3xl sm:p-3 lg:p-5"
        :class="{
            '!rounded-tr-[14px]': course.status === 'draft'
        }"
    >
        <p
            class="text-xl font-extrabold leading-6 text-gray-800 font-nunito sm:line-clamp-2
               sm:h-[56px] sm:text-2xl sm:leading-7"
        >
            {{ course.name }}
        </p>

        <template v-if="course.status === 'draft'">
            <u-tag
                class="!absolute right-1.5 top-1.5"
                value="Черновик"
                size="xs"
                color="gray-500"
                solid
            />
            <div class="absolute size-4 bg-gray-600 -top-1.5 -right-1.5 rounded-full border-[3px] border-white"/>
        </template>

        <SizedImage
            class="mt-3 !rounded-xl sm:!rounded-2xl !aspect-[16/8]"
            :image="course.image"
            :empty-image="noCourseCoverImage"
            width="100%"
        />
        <div class="mt-5 flex flex-grow flex-col gap-3 text-[15px]">
            <div>
                <p class="mb-0.5 font-medium text-gray-800">Теги</p>
                <div v-if="course.tags.length" class="flex flex-wrap gap-2">
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
            <div>
                <p class="mb-0.5 font-medium text-gray-800">Инструкторы</p>
                <u-avatar-group
                    :avatars="computedInstructors"
                    flex-show
                    size="30"
                    space-size="10"
                    :total="course.instructors_stats.total_count"
                />
            </div>
            <div>
                <p class="mb-0.5 font-medium text-gray-800">Студенты</p>
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
                <p class="mb-px font-medium text-gray-800">Даты</p>
                <div class="flex gap-3">
                    <div class="flex items-center gap-1">
                        <u-icon size="17" value="CalendarDays" class="relative bottom-px [&_svg]:stroke-2"/>
                        <span class="text-[13px] leading-[13px]">{{ $luxon.fromISO(course.start).toFormat('dd MMM yyyy') }}</span>
                    </div>
                    <span class="text-sm">-</span>
                    <div class="flex items-center gap-1">
                        <u-icon size="17" value="CalendarDays" class="relative bottom-px [&_svg]:stroke-2"/>
                        <span class="text-[13px] leading-[13px]">{{ $luxon.fromISO(course.end).toFormat('dd MMM yyyy') }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-5 flex justify-between">
            <u-dropdown
                v-if="isInstructor"
                v-model="controlsDropdownVisible"
                popper-class="[&_.el-popper\_\_arrow]:!left-2 !rounded-lg"
                :width="160"
                :popper-options="{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 10]
                            }
                        }
                    ]
                }"
            >
                <template #opener>
                    <u-button
                        class="w-full h-full"
                        label="Управлять"
                        size="xs"
                    />
                </template>
                <template #content="{ close }">
                    <div class="py-1.5 px-1.5">
                        <button
                            v-for="control in controls"
                            :key="control.value"
                            class="flex gap-2 items-center py-2 px-2 hover:bg-primary-300/15 rounded-lg w-full"
                            @click="close(); emit(control.value)"
                        >
                            <u-icon
                                :value="control.icon"
                                :color="control.color"
                                size="18"
                                solid
                            />
                            <p class="font-medium tracking-wide text-sm leading-[13px]">{{ control.label }}</p>
                        </button>
                    </div>
                </template>
            </u-dropdown>

            <u-button
                class="ml-auto mr-0"
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

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'edit': []
    'delete': []
    'publish': []
}>()

const controlsDropdownVisible = ref(false)

const controls = computed(() => {
    return [
        {
            value: 'edit',
            label: 'Редактировать',
            icon: 'Pencil',
            color: 'blue-500'
        },
        {
            value: 'delete',
            label: 'Удалить',
            icon: 'Trash',
            color: 'red-500'
        },
        ...props.course.status === 'draft' ?
            [{
                value: 'publish',
                label: 'Активировать',
                icon: 'RocketLaunch',
                color: 'green-500'
            }]
            : []
    ]
})


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