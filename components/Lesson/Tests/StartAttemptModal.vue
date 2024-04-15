<template>
    <u-dialog
        ref="modal"
        icon="Plus"
        hide-header
        max-width="400"
        :freeze="false"
    >
        <p class="text-center text-lg font-bold">
            Attempts
        </p>
        <div class="mt-5 flex justify-between">
            <span/>
            <u-button
                label="Start Attempt"
                @click="startAttempt"
            />
        </div>

    </u-dialog>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const router = useRouter()

export interface Props {
    courseId: string
    lessonId: string
    testId: string
}

const props = withDefaults(defineProps<Props>(), {})


const { loading, addLoading, removeLoading } = useLoading()
const startAttempt = async () => {
    try {
        addLoading()
        const { attempt } = await $api.lesson.START_TEST_ATTEMPT({
            course_id: props.courseId,
            lesson_id: props.lessonId,
            test_id: props.testId
        })

        router.push({
            name: 'courses-course-lessons-lesson-tests-test-attempts-attempt',
            params: {
                course: props.courseId,
                lesson: props.lessonId,
                test: props.testId,
                attempt: attempt.id
            }
        })
    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}
</script>
