<template>
    <div
        class="relative p-5 border border-gray-200 shadow-[0_0_3px_#e5e7eb] rounded-2xl"
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
        <p class="top-3 right-[22px] font-medium absolute ml-3 text-[12px] text-gray-600 capitalize inline-block">
            {{ $luxon.fromISO(review.created_at).toFormat('LLL d, yyyy') }}
        </p>
        <div class="flex justify-end mt-3 -mb-2" v-if="editable">
            <u-button
                label="Изменить"
                size="xs"
                @click="emit('edit', review)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { CourseReview } from "~/types/courses";

export interface Props {
    review: CourseReview
    editable?: boolean
}

const { $luxon } = useNuxtApp()
const accountStore = useAccountStore()

const { user } = storeToRefs(accountStore)

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
    (e: 'edit', v: CourseReview): void
}>()
</script>
