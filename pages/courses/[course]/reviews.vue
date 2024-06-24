<template>
    <div v-if="!loaded" class="flex flex-col items-center">
        <u-loading
            size="42"
        />
        <p class="text-primary-700 text-[13px] ml-0.5">
            Загрузка...
        </p>
    </div>
    <div v-else-if="!loading && reviews.length" class="h-full flex flex-col">
        <div v-if="course.reviews.review" class="mb-8">
            <p class="mb-2 font-medium text-primary-900 ml-1">
                Ваш отзыв
            </p>
            <ReviewItem
                :review="course.reviews.review"
                editable
                @edit="selectedReview = $event; showReviewModal = true"
            />
        </div>
        <div class="grow flex flex-col gap-4">
            <ReviewItem
                v-for="review in reviews"
                :key="review.user.id"
                :review="review"
            />
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
    <div v-else-if="loading" class="flex flex-col gap-4">
        <ReviewItemSkeleton
            v-for="i in perPage"
            :key="i"
        />
    </div>
    <div v-else class="h-full flex flex-col items-center justify-center">
        <u-icon value="PuzzlePiece" solid size="80" color="primary-900"/>
        <p class="text-primary-900 font-medium text-lg">
            Пока нету отзывов
        </p>
        <u-button
            v-if="isStudent"
            class="mt-3"
            label="Добавить"
            right-icon="Plus"
            icon="Plus"
            @click="showReviewModal = true"
        />
    </div>


    <AddEditReviewModal
        v-if="showReviewModal"
        :course-id="route.params.course as string"
        :review="selectedReview"
        @added="fetch"
        @close="showReviewModal = false"
    />

    <teleport to="#lesson-menu">
        <u-button
            v-if="isStudent && loaded && !course.reviews.review"
            label="Добавить"
            right-icon="Plus"
            @click="showReviewModal = true"
        />
    </teleport>
</template>

<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import { CourseAccess, CourseReview } from "~/types/courses";
import { Ref } from "vue";

import ReviewItem from "~/components/Course/Access/Reviews/ReviewItem.vue";
import ReviewItemSkeleton from "~/components/Course/Access/Reviews/ReviewItemSkeleton.vue";

const { $api, $emitter } = useNuxtApp()
const route = useRoute()

const accountStore = useAccountStore()
const courseStore = useCourseStore()
const { course } = storeToRefs(courseStore) as { course: Ref<CourseAccess> }

const selectedReview = ref<CourseReview>()
const showReviewModal = ref(false)
$emitter.on('open:add-review-modal', () => {
    showReviewModal.value = true
})


const { isInstructor, isStudent, isNewUser } = storeToRefs(accountStore)

const page = useRouteQuery('page', 1, { transform: v => Number(v) })
const perPage = useRouteQuery('per_page', 100, { transform: v => Number(v) })
const { loading, addLoading, removeLoading } = useLoading()
const total = ref(0)
const reviews = ref<CourseReview[]>([]);
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