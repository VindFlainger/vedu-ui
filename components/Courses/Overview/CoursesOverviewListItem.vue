<template>
    <div
        class="relative flex flex-col rounded-xl bg-gray-100 px-3 py-3.5"
        :class="{
            '!rounded-tr-0': course.status === 'draft',
        }"
    >
        <SizedImage
            class="!aspect-[16/9] !rounded-xl"
            :image="course.image"
            :empty-image="noCourseCoverImage"
            width="100%"
        />

        <p class="text-md mt-3 line-clamp-2 font-nunito font-extrabold leading-6 text-gray-800 sm:leading-5">
            {{ course.name }}
        </p>

        <template v-if="course.status === 'draft'">
            <u-tag
                class="!absolute -top-3 right-0 !rounded-br-[1px]"
                value="Черновик"
                size="xs"
                color="gray-500"
                solid
            />
        </template>

        <div class="mt-3 flex flex-grow flex-col gap-3">
            <div>
                <p class="mb-1 font-bold text-gray-800 text-sm">Теги</p>
                <div v-if="course.tags.length" class="flex flex-wrap gap-2">
                    <u-tag
                        v-for="tag in course.tags.slice(0, 4)"
                        :key="tag"
                        :value="tag"
                        size="sm"
                        font-size="12"
                        class="shrink-0 whitespace-nowrap"
                    />
                    <u-tag
                        v-if="course.tags.length > 4"
                        :value="`+${course.tags.length - 4}`"
                        size="sm"
                        font-size="12"
                        class="shrink-0 whitespace-nowrap"
                    />
                </div>
                <div v-else>
                    <u-tag value="Курс не имеет тегов" size="sm" font-size="12" color="gray-400" />
                </div>
            </div>

            <div>
                <p class="mb-1 font-bold text-gray-800 text-sm">Инструкторы</p>
                <u-avatar-group
                    :avatars="computedInstructors"
                    flex-show
                    size="30"
                    space-size="10"
                    :total="course.instructors_stats.total_count"
                />
            </div>

            <div>
                <p class="mb-1 font-bold text-gray-800 text-sm">Студенты</p>
                <u-avatar-group
                    v-if="course.students_stats.total_count"
                    :avatars="computedStudents"
                    flex-show
                    size="30"
                    space-size="10"
                    :total="course.students_stats.total_count"
                />
                <div v-else class=" text-[13px] text-gray-500">Еще не добавлены</div>
            </div>
            
            <div v-if="course.start">
                <p class="mb-1 font-bold text-gray-800 text-sm">Даты</p>
                <div class="flex gap-3">
                    <div class="flex items-center gap-1">
                        <u-icon size="17" value="CalendarDays" class="relative bottom-px [&_svg]:stroke-2" />
                        <span class="text-[13px] leading-[13px]">
                            {{ $luxon.fromISO(course.start).toFormat('dd MMM yyyy') }}
                        </span>
                    </div>
                    <span class="text-sm">-</span>
                    <div class="flex items-center gap-1">
                        <u-icon size="17" value="CalendarDays" class="relative bottom-px [&_svg]:stroke-2" />
                        <span class="text-[13px] leading-[13px]">
                            {{ $luxon.fromISO(course.end).toFormat('dd MMM yyyy') }}
                        </span>
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
                                offset: [0, 10],
                            },
                        },
                    ],
                }"
            >
                <template #opener>
                    <u-button class="h-full w-full" label="Управлять" size="xs" />
                </template>
                <template #content="{ close }">
                    <div class="px-1.5 py-1.5">
                        <button
                            v-for="control in controls"
                            :key="control.value"
                            class="flex w-full items-center gap-2 rounded-lg px-2 py-2 hover:bg-primary-300/15"
                            @click="
                                close();
                                emit(control.value);
                            "
                        >
                            <u-icon :value="control.icon" :color="control.color" size="18" solid />
                            <p class="text-sm font-medium leading-[13px] tracking-wide">{{ control.label }}</p>
                        </button>
                    </div>
                </template>
            </u-dropdown>

            <u-button
                class="ml-auto mr-0"
                label="Открыть"
                size="xs"
                @click="
                    router.push({
                        name: 'courses-course',
                        params: {
                            course: course.id,
                        },
                    })
                "
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { CourseBasePreview } from '~/types/courses';
import noCourseCoverImage from '~/assets/images/no-image/no-course-cover.png';

const router = useRouter();

const accountStore = useAccountStore();

const { isInstructor } = storeToRefs(accountStore);

export interface Props {
    course: CourseBasePreview;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
    edit: [];
    delete: [];
    publish: [];
}>();

const controlsDropdownVisible = ref(false);

const controls = computed(() => {
    return [
        {
            value: 'edit',
            label: 'Редактировать',
            icon: 'Pencil',
            color: 'blue-500',
        },
        {
            value: 'delete',
            label: 'Удалить',
            icon: 'Trash',
            color: 'red-500',
        },
        ...(props.course.status === 'draft'
            ? [
                  {
                      value: 'publish',
                      label: 'Активировать',
                      icon: 'RocketLaunch',
                      color: 'green-500',
                  },
              ]
            : []),
    ];
});

const computedStudents = computed(() =>
    props.course.students_stats.preview.map((student) => ({
        firstName: student.personal_data.first_name,
        lastName: student.personal_data.last_name,
        image: student.avatar?.original,
    }))
);

const computedInstructors = computed(() =>
    props.course.instructors_stats.preview.map((instructor) => ({
        firstName: instructor.personal_data.first_name,
        lastName: instructor.personal_data.last_name,
        image: instructor.avatar?.original,
    }))
);
</script>
