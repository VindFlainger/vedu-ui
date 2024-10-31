<template>
    <div class="pt-4 pb-10 min-h-[100%] w-full">

        <!-- TOP ACTIONS -->
        <CoursesActionBar
            v-if="fetchLoaded"
            class="pb-6"
            :search-query="searchQuery"
            @update:search-query="searchQuery = $event; handleSearch()"
            @create="showEditDialog = true"
        />

        <!-- CONTENT -->
        <template v-if="courses.length">

            <div class="relative">
                <div class="grid grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    <CoursesOverviewListItem
                        v-for="course in courses"
                        :key="course.id"
                        :course="course"
                        @publish="handlePublishCourse(course.id)"
                        @edit="handleOpenEditDialog(course.id)"
                        @delete="$emitter.emit('open:confirm-delete', {
                            title: $notifications.DELETE_COURSE_REQUEST.title(course.name),
                            text: $notifications.DELETE_COURSE_REQUEST.message,
                            cb: () => deleteCourse(course.id)
                        })"
                    />
                </div>

                <!-- LOADING OTHER -->
                <div
                    v-if="fetchLoading && courses.length"
                    class="absolute z-20 -inset-3 rounded-xl bg-gray-100/50 backdrop-blur-[1px] shadow-[0_0_15px_#f3f4f6]"
                />
            </div>

            <!-- PAGINATION -->
            <UPagination
                :count="total"
                :page="page"
                :per-page="perPage"
                @update:page="page = $event as number; fetch(true)"
                @update:per-page="perPage = $event as number; fetch(true)"
                class="mt-12"
            />
        </template>

        <!-- LOADING -->
        <PageLoader v-else-if="fetchLoading"/>

        <!-- EMPTY -->
        <CoursesOverviewEmpty v-else/>
    </div>


    <!-- DIALOGS -->
    <CourseAddDialog
        v-if="showEditDialog"
        :course="selectedCourseComputed"
        @close="handleCloseEditDialog"
        @added="fetch"
    />
</template>

<script setup lang="ts">
import { CourseBasePreview } from "~/types/courses";
import { useRouteQuery } from "@vueuse/router";
import CoursesActionBar from "~/components/Courses/CoursesActionBar.vue";

const { $api } = useNuxtApp()

definePageMeta({
    roles: ['student', 'instructor'],
})

useSeoMeta({
    title: () => 'My Courses'
})

const selectedCourse = ref<string | null>(null)
const selectedCourseComputed = computed(() =>
    courses.value.find((course) => course.id === selectedCourse.value)
)


const showEditDialog = ref(false)
const handleOpenEditDialog = (courseId?: string) => {
    showEditDialog.value = true
    if (courseId) selectedCourse.value = courseId
}
const handleCloseEditDialog = () => {
    showEditDialog.value = false
    selectedCourse.value = null
}

const page = useRouteQuery<string | number | undefined, number>('page', 1, { transform: v => Number(v) })
const perPage = useRouteQuery<string | number | undefined, number>('per_page', 30, { transform: v => Number(v) })
const searchQuery = useRouteQuery<string | undefined>('query', "")
const {
    loading: fetchLoading,
    addLoading: addFetchLoading,
    removeLoading: removeFetchLoading,
    loaded: fetchLoaded,
    setLoaded: setFetchLoaded
} = useLoading()
const total = ref(0)
const courses = ref<CourseBasePreview[]>([])
const fetch = async (moveTop = false) => {
    try {
        addFetchLoading()
        const res = await $api.courses.GET_COURSES({
            page: page.value,
            per_page: perPage.value,
            search: searchQuery.value
        }, undefined, { cancelPrevious: true })

        courses.value = res.data
        total.value = res.meta.total

        if (moveTop) window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
        console.log(err)
    } finally {
        setFetchLoaded()
        removeFetchLoading()
    }
}

const handleSearch = () => {
    page.value = 1
    perPage.value = 30
    fetch(true)
}

const {
    loading: deleteLoading,
    addLoading: addDeleteLoading,
    removeLoading: removeDeleteLoading
} = useLoading()
const deleteCourse = async (id: string) => {
    try {
        addDeleteLoading()

        const res = await $api.courses.DELETE_COURSE({
            course_id: id
        })

        fetch()
    } catch (err) {
        console.log(err)
    } finally {
        removeDeleteLoading()
    }
}



const handlePublishCourse = async (id: string) => {
    try {
        addFetchLoading()

        await $api.courses.PUBLISH_COURSE({
            course_id: id
        })

        fetch()
    } catch (err) {
        console.log(err)
    } finally {
       removeFetchLoading()
    }
}

fetch()

</script>

