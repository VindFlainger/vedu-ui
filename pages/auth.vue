<template>
    <div class="flex h-screen items-center justify-center">
        <div class="grid h-full max-h-[850px] w-full max-w-[1240px] grid-cols-1 md:grid-cols-5 lg:grid-cols-2 p-9 overflow-y-hidden">
            <div class="h-full relative max-md:hidden max-lg:col-span-2">
                <img class="absolute h-full w-full rounded-3xl object-cover" src="~/assets/images/login-vertical.jpg"/>
            </div>
            <div class="flex flex-col justify-center md:px-6 lg:px-12 xl:px-14 max-lg:col-span-3">
                <div>
                    <div class="flex flex-col items-center">
                        <USwitch
                            v-model="action"
                            :items="actions"
                            size="sm"
                        />
                        <USwitch
                            class="mt-4"
                            v-if="action === 'register'"
                            v-model="role"
                            :items="roles"
                            size="sm"
                        />
                    </div>
                    <div class="px-1">
                        <LazyActionLogin
                            v-if="action === 'login'"
                            v-bind="registerData"
                            class="mt-4"
                        />
                        <LazyActionRegister
                            v-if="action === 'register'"
                            :key="role"
                            :role="role"
                            class="mt-4"
                            @registered="handleRegistered"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import USwitch from '~/ui/USwitch.vue'
import { useRouteQuery } from "@vueuse/router";

definePageMeta({
    layout: 'empty'
})

const actions = [
    {
        label: 'Войти',
        value: 'login',
    },
    {
        label: 'Регистрация',
        value: 'register',
    },
]
const action = useRouteQuery('action', 'login')


const roles = [
    {
        label: 'Студент',
        value: 'student',
    },
    {
        label: 'Преповадатель',
        value: 'instructor',
    },
]
const role = ref('student')

const registerData = ref()
const handleRegistered = (v: any) => {
    registerData.value = v
    action.value = 'login'
}

</script>

