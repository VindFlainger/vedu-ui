<template>
    <div v-if="fetchLoading" class="flex flex-col items-center">
        <u-loading
            size="42"
        />
        <p class="text-primary-700 text-[13px] ml-0.5">
            Loading...
        </p>
    </div>
    <div v-else-if="tokens.length" class="grid gap-4 grid-cols-3">
        <div
            class="p-3 border border-primary-900 border-gray-200 rounded-2xl"
            v-for="token in tokens"
            :key="token.token"
        >
            <p>
                <span class="text-primary-900 font-medium">Токен:</span> {{token.token}}
            </p>
            <p>
                <span class="text-primary-900 font-medium">Статус:</span>
                <span
                    class="ml-[3px] font-medium"
                    :class="{
                        'text-red-500': token.expires < new Date().toISOString(),
                        'text-green-500': (!token.expires || token.expires >= new Date().toISOString())
                    }"
                >
                    {{ (!token.expires || token.expires > new Date().toISOString()) ? 'Активен' : 'Не активен'}}
                </span>
            </p>
            <p>
              <span class="text-primary-900 font-medium">Тип токена:</span> {{ token.type === 'single' ? 'Одноразовый' : 'Многоразовый' }}
            </p>
            <div class="flex justify-end mt-2">
                <u-button
                    label="Копировать ссылку"
                    @click="copyLocation(token.token)"
                />
            </div>
        </div>
    </div>
    <div class="flex flex-col items-center select-none" v-else>
        <u-icon
            value="FaceFrown"
            size="40"
            color="primary-700"
            stroke-width="2"
        />
        <p class="text-center text-primary-700 font-bold text-[17px]">
            Токены доступа <br> не найдены
        </p>
        <u-button
            class="mt-3"
            label="Создать"
            @click="showAddAccessModal = true"
        />
    </div>
    <AddAccessModal
        v-if="showAddAccessModal"
        :course-id="route.params.course"
        @close="showAddAccessModal = false; $event ? fetch() : null"
    />
</template>


<script setup lang="ts">
import { CourseAccessToken } from "~/types/courses";

const { $emitter, $api, $copy, $notifications } = useNuxtApp()
const intercomStore = useIntercomStore()
const route = useRoute()

const showAddAccessModal = ref(false)
$emitter.on('open:add-access-modal', () => {
    showAddAccessModal.value = true
})


const tokens = ref<CourseAccessToken[]>([])
const { loading: fetchLoading, addLoading: addFetchLoading, removeLoading: removeFetchLoading } = useLoading()
const fetch = async () => {
    try {
        addFetchLoading()

        const res = await $api.courses.GET_COURSE_ACCESS_TOKENS({
            course_id: route.params.course as string
        })
        tokens.value = res

    } catch (err) {
        console.log(err)
    } finally {
        removeFetchLoading()
    }
}

const copyLocation = (token: string) => {
    $copy(`${window.location.origin}/courses/${route.params.course}/access?token=${token}`)
    intercomStore.addNotification({
        type: 'success',
        title: $notifications.ACCESS_TOKEN_LINK_COPIED.title,
        text: $notifications.ACCESS_TOKEN_LINK_COPIED.message
    })
}

fetch()

</script>
