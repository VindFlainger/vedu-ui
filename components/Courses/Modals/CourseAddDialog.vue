<template>
    <u-dialog
        ref="modal"
        :max-width="1100"
        :title="`${ course ? 'Редактировать': 'Создать' } Курс`"
        :icon="course ? 'Pencil' : 'Plus'"
        @close="emit('close')"
    >
        <div class="grid grid-cols-5 gap-16">
            <div class="flex flex-col gap-4 col-span-2">
                <UInput
                    v-model="name"
                    label="Имя курса"
                    required
                    placeholder="Имя"
                />
                <div>
                    <ULabel
                        class="mb-[6px]"
                        label="Тип курса"
                        required
                    />
                    <UCheckboxGroup
                        v-model="type"
                        :options="typeOptions"
                        :multiple="false"
                    />
                </div>
                <u-input
                    v-if="type === 'paid'"
                    v-model="coursePrice"
                    type="number"
                    label="Стоимость курса"
                >
                    <template #prefix>
                        <div class="ml-1">BYN</div>
                    </template>
                </u-input>


                <div>
                    <u-label label="Категория курса"/>
                    <div class="mt-1.5">
                        <div class="flex gap-1.5 items-center cursor-pointer" @click="showCategoriesDialog = true">
                            <u-button
                                class="shrink-0"
                                icon-style
                                icon="Plus"
                                size="sm"
                            />

                            <div class="flex items-center text-[15px]">
                                <span class="leading-4">{{ selectedCategory ? 'Изменить' : 'Выбрать' }}</span>
                                <span v-if="selectedCategory"
                                      class="text-sm font-medium ml-2 leading-[14px] relative top-px">
                                    ({{ selectedCategory?.name }} выбрано)
                                </span>
                            </div>
                        </div>

                    </div>
                </div>


                <UDateInput
                    v-model="startDate"
                    label="Дата начала"
                    placeholder="Дата"
                />
                <UDateInput
                    v-model="endDate"
                    label="Дата окончания"
                    placeholder="Дата"
                    :min-date="startDate"
                    :disabled="!startDate"
                />

                <div>
                    <u-label
                        class="mb-1"
                        label="Теги"
                    />
                    <div class="flex gap-3">
                        <u-input
                            v-model.trim="lazyTagName"
                            placeholder="Имя тега"
                        />
                        <u-button
                            icon-style
                            icon="Plus"
                            size="md"
                            :disabled="!lazyTagName || tags.includes(lazyTagName.toLowerCase())"
                            @click="tags.push(lazyTagName.toLowerCase()); lazyTagName = ''"
                        />
                    </div>
                    <div class="mt-4 border-2 border-dashed border-gray-400 p-3 rounded-lg flex flex-wrap gap-2">
                        <p v-if="!tags.length" class="py-[3px] text-gray-500 text-[13px] font-medium text-center w-full">
                            Теги не добавлены
                        </p>
                        <template v-else>
                            <u-tag
                                v-for="tag in tags"
                                clearable
                                :value="tag"
                                @clear="tags = tags.filter(v => v !== tag)"
                            />
                        </template>
                    </div>
                </div>

            </div>
            <div class="flex flex-col gap-4 col-span-3">
                <div>
                    <ULabel
                        class="mb-[6px]"
                        label="Краткая информация"
                        required
                    />
                    <RichTextEditor
                        v-model="about"
                        class="mt-2"
                        height="200"
                        placeholder="Описание курса (опишите суть курса, основные навыки и используемые технологии)"
                    />
                </div>
                <div>
                    <ULabel class="mb-[6px]" label="Изображение"/>
                    <DragDropFileUpload
                        v-model:loading="loadingImages"
                        v-model="image"
                        class="mt-"
                        relation="course-cover"
                    />
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex justify-end gap-3">
                <u-button
                    text
                    color="red-500"
                    label="Отмена"
                />
                <u-button
                    :loading="loading"
                    :label="course ? 'Сохранить' : 'Создать'"
                    :disabled="addCourseDisabled"
                    @click="addCourse"
                />
            </div>
        </template>
    </u-dialog>

    <PickCategoryDialog
        v-if="showCategoriesDialog"
        v-model="selectedCategory"
        :categories="categories"
        @close="showCategoriesDialog = false"
    />
</template>

<script setup lang="ts">
import { CoursesCourse } from "~/types/courses";
import { Category, useGlobalStore } from "~/stores/Global";

const globalStore = useGlobalStore()
const { $api } = useNuxtApp()

const { categories } = storeToRefs(globalStore)
const modal = ref<any>()

export interface Props {
    course?: CoursesCourse
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
    'close': []
    'added': []
}>()

const typeOptions = [
    {
        value: 'public',
        label: 'Публичный'
    },
    {
        value: 'private',
        label: 'Приватный'
    },
    {
        value: 'paid',
        label: 'Платный'
    }
]

const showCategoriesDialog = ref(false)

const name = ref('')
const type = ref('public')
const selectedCategory = ref<Omit<Category, 'children'>>()
const startDate = ref()
const endDate = ref()
const about = ref()
const loadingImages = ref(0)
const image = ref()
const coursePrice = ref()
const tags = ref<string[]>([])

const lazyTagName = ref('')

const initData = () => {
    if (props.course) {
        name.value = props.course.name
    }
}

const addCourseDisabled = computed(() => {
    return !(name.value && type.value && selectedCategory.value && about.value && image.value)
})

const { loading, addLoading, removeLoading } = useLoading()
const addCourse = async () => {
    try {
        addLoading()

        const res = await $api.courses.CREATE_COURSE({
            name: name.value,
            type: type.value,
            about: about.value,
            start: startDate.value,
            end: endDate.value,
            price: coursePrice.value,
            image: image.value.id,
            category: (selectedCategory.value as Omit<Category, 'children'>).id,
            tags: tags.value
        })

        emit('added')
        modal.value.close()


    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}

initData()

</script>