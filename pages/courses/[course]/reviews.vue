<template>
    <div v-if="loaded" class="h-full flex flex-col">
        <div class="grow flex flex-col gap-4">
            <div
                class="relative p-5 border border-gray-200 shadow-[0_0_3px_#e5e7eb] rounded-2xl"
                v-for="review in reviews"
                :key="review.user.id"
            >
                <div class="flex gap-2 items-center">
                    <u-avatar
                        :image="review.user.avatar?.original"
                        :first-name="review.user.personal_data.first_name"
                        :last-name="review.user.personal_data.last_name"
                        size="32"
                    />
                    <p>
                        {{
                            [review.user.personal_data.first_name, review.user.personal_data.last_name].filter(x => x).join(' ')
                        }}
                    </p>
                </div>
                <div class="mt-3 flex gap-0.5">
                    <u-icon
                        v-for="i in 5"
                        value="Star"
                        solid
                        :color="i <= review.amount ? 'yellow-500' : 'gray-300'"
                    />
                </div>
                <p class="mt-3 text-[15px]">
                    {{ review.text }}
                </p>
                <p class="top-3 right-3 font-medium absolute ml-3 text-[12px] text-gray-600 capitalize inline-block">
                    {{ $luxon.fromISO(review.created_at).toFormat('LLL d, yyyy') }} </p>
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
import { CourseReview } from "~/types/courses";

const { $api, $luxon } = useNuxtApp()
const route = useRoute()


const page = useRouteQuery('page', 1, { transform: v => Number(v) })
const perPage = useRouteQuery('per_page', 100, { transform: v => Number(v) })
const { loading, addLoading, removeLoading } = useLoading()
const total = ref(0)
const reviews = ref<CourseReview[] | null>(null);
const loaded = ref(false)

const fetch = async () => {
    try {
        addLoading()
        const res = await $api.courses.GET_COURSE_REVIEWS({
            course_id: route.params.course as string,
            page: page.value,
            per_page: perPage.value
        })


        reviews.value = res.data
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