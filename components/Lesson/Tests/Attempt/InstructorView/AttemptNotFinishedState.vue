<template>
    <div class="w-full flex justify-center">
        <div class="sm:w-[60%]  bg-white border border-gray-200 rounded-2xl">
            <div class="p-9 pb-0 flex flex-col items-center">
                <p class="font-medium text-center text-lg">
                    Данный тест еще не завершен!
                </p>
                <p class="mt-3 text-[13px] text-gray-600 text-center">
                    Вы не можете взаимодействовать с тестом, который находится в состоянии выполнения.
                    Вы можете принудительно завершить данную попытку, чтобы получить доступ к просмотру ответом студента и
                    редактированию баллов. После принудительного завершения попытки студент потеряет возможность изменять и добавлять
                    ответы в рамках данной попытки.
                </p>
                <img src="~/assets/images/empty/still-in-progress.png" draggable="false"/>
            </div>

            <div class="flex justify-center gap-6 w-full p-4">
                <u-button
                    label="Завершить попытку"
                    color="gray-500"
                    text
                    @click="showForceFinishAttemptModal = true"
                />
                <u-button
                    label="Вернуться"
                    :left-icon-props="{'stroke-width': 3}"
                    font-weight="600"
                    @click="router.push({
                                name: 'courses-course-lessons-lesson-tests-test-attempts',
                                params: {
                                    course: route.params.course,
                                    lesson: route.params.lesson,
                                    test: route.params.test,
                                }
                            })"
                />
            </div>
        </div>
    </div>
    <ForceFinishAttemptModal
        v-if="showForceFinishAttemptModal"
        :course-id="route.params.course"
        :lesson-id="route.params.lesson"
        :test-id="route.params.test"
        :attempt-id="route.params.attempt"
        @action="fetchAttempt"
        @close="showForceFinishAttemptModal = false"
    />
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const showForceFinishAttemptModal = ref(false)

const emit = defineEmits<{
    'force-finished': []
}>()

</script>
