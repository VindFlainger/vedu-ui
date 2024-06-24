<template>
    <div class="relative flex gap-5 p-5 border border-gray-200 shadow-[0_0_3px_#e5e7eb] rounded-2xl bg-white">
        <nuxt-link
            :to="{
                name: 'courses-course-lessons-lesson',
                params: {
                    course: courseId,
                    lesson: lesson.id
                }
            }"
        >
            <SizedImage
                :width="200"
                :height="120"
                :image="lesson.image"
                :empty-image="noLesson"
            />
        </nuxt-link>

        <div>
            <nuxt-link
                :to="{
                name: 'courses-course-lessons-lesson',
                params: {
                    course: courseId,
                    lesson: lesson.id
                }
            }">
                <p class="font-bold text-gray-900">
                    {{ lesson.name }}
                </p>
            </nuxt-link>
            <p class="mt-0.5 text-[15px] line-clamp-4" v-html="lesson.content"/>
        </div>

        <div v-if="isInstructor" class="!absolute top-1.5 right-1.5 flex gap-2">
            <u-button
                icon="Pencil"
                icon-style
                color="blue-500"
                @click="emit('edit')"
            />
            <u-button
                icon="Trash"
                icon-style
                color="red-500"
                @click="$emitter.emit('open:confirm-delete', {
                    title: $notifications.DELETE_LESSON_REQUEST.title(lesson.name),
                    text: $notifications.DELETE_LESSON_REQUEST.message,
                    cb: () => emit('delete')
                })"
            />
            <u-button
                class="ml-2 lesson-drag [&_.u-button-icon-style-icon]:!rounded-md"
                icon="ArrowsPointingOut"
                icon-style
                color="primary-700"
                @click="emit('edit')"
                :icon-props="{
                    strokeWidth: '3px'
                }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { CourseLessonPreview } from "~/types/courses";
import SizedImage from "~/components/Globals/Elements/SizedImage.vue";
import noLesson from "~/assets/images/no-image/no-lesson.png"

const accountStore = useAccountStore()
const { isInstructor } = storeToRefs(accountStore)

export interface Props {
    lesson: CourseLessonPreview,
    courseId: string
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
    'delete': [],
    'edit': []
}>()
</script>