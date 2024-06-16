<template>
    <div class="py-8">
        <div>

        </div>
        <div class="bg-white p-5 rounded-2xl">
            <div class="flex justify-between">
                <u-button
                    :label="`Категории (${selectedCategories.length})`"
                    icon-style
                    icon="Plus"
                    @click="showCategoriesDialog = true"
                />
                <u-input
                    class="max-w-[320px] w-full"
                    placeholder="Поиск по названию, тегам и описанию"
                    left-icon="MagnifyingGlass"
                />
            </div>
        </div>
        <div class="mt-4 grid grid-cols-4 gap-5">
            <FoundCourseItem
                v-for="course in courses"
                :key="course.id"
                :course="course"
            />
        </div>


    </div>

    <PickCategoryDialog
        v-if="showCategoriesDialog"
        v-model="selectedCategories"
        multiple
        :categories="categories"
        @close="showCategoriesDialog = false"
    />
</template>

<script setup lang="ts">
import { FoundCourse } from '~/types/courses'
import FoundCourseItem from '~/components/Courses/FindCourses/FoundCourseItem.vue'
import { definePageMeta, useGlobalStore } from "#imports";

definePageMeta({
    roles: ['public', 'student', 'instructor'],
})

useSeoMeta({
    title: () => 'Courses'
})

const globalStore = useGlobalStore()
const { $api } = useNuxtApp()

const { categories } = storeToRefs(globalStore)

const showCategoriesDialog = ref(false)
const selectedCategories = ref<string[]>([])

const courses = ref<FoundCourse[]>([])
const total = ref(0)
const { loading, addLoading, removeLoading } = useLoading()
const fetchCourses = async () => {
    try {
        addLoading()
        const res = await $api.courses.FIND_COURSES({
            page: 1,
            per_page: 15,
            categories: selectedCategories.value
        })
        courses.value = res.data
    } catch (err) {
    } finally {
        removeLoading()
    }
}

watch(selectedCategories, fetchCourses)

fetchCourses()
</script>