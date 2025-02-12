<template>
    <div v-if="loaded" class="h-full flex flex-col">
        <u-input
            v-model="search"
            class="w-[300px]"
            placeholder="Искать по имени"
            @input="page = 1; fetch()"
        />
        <div v-if="!loading" class="grow mt-4 flex flex-wrap content-start gap-2">
            <div
                v-for="courseStudent in courseStudents"
                :key="courseStudent"
            >
                <u-tooltip
                    placement="top"
                    offset="7"
                    hide-after="0"
                    max-width="350"
                    :content="[courseStudent.student.personal_data.first_name, courseStudent.student.personal_data.last_name].filter(x => x).join(' ')"
                >
                    <u-avatar
                        class="shadow-[0_0_3px_gray]"
                        :size="46"
                        :first-name="courseStudent.student.personal_data.first_name"
                        :last-name="courseStudent.student.personal_data.last_name"
                        :image="courseStudent.student?.avatar?.original"
                    />
                </u-tooltip>

            </div>
        </div>
        <div v-else class="grow mt-4 flex content-start flex-wrap gap-2">
            <div
                v-for="i in 100"
                :key="i"
                class="rounded-full w-[46px] h-[46px] skeleton-loader"
            >
            </div>
        </div>
        <u-pagination
            class="mt-4"
            v-model:page="page"
            v-model:per-page="perPage"
            :count="total"
            @update:page="fetch"
            @update:per-page="page = 1; fetch()"
        />
    </div>
    <div v-else class="flex flex-col items-center">
        <u-loading
            size="42"
        />
        <p class="text-primary-700 text-[13px] ml-0.5">
            Загрузка...
        </p>
    </div>
</template>

<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import { CourseStudent } from "~/types/courses";

const { $api } = useNuxtApp()
const route = useRoute()


const search = useRouteQuery('search', '')
const page = useRouteQuery('page', 1, { transform: v => Number(v) })
const perPage = useRouteQuery('per_page', 100, { transform: v => Number(v) })
const { loading, addLoading, removeLoading } = useLoading()
const total = ref(0)
const courseStudents = ref<CourseStudent[] | null>(null);
const loaded = ref(false)

const fetch = async () => {
    try {
        addLoading()
        const res = await $api.courses.GET_COURSE_STUDENTS({
            course_id: route.params.course as string,
            page: page.value,
            per_page: perPage.value,
            search: search.value
        })


        courseStudents.value = res.data
        total.value = res.meta.total
        page.value = res.meta.page
        perPage.value = res.meta.per_page
        loaded.value = true
    } finally {
        removeLoading()
    }

}

fetch()
</script>