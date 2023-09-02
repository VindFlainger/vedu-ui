<template>
    <div class="flex h-screen items-center justify-center">
        <div class="grid h-full max-h-[850px] w-full max-w-[1440px] grid-cols-1 md:grid-cols-5 lg:grid-cols-2 p-9">
            <div class="h-full relative max-md:hidden max-lg:col-span-2">
                <img class="xl:block hidden h-full rounded-3xl object-cover" src="~/assets/images/login.png"/>
                <img class="absolute xl:hidden block h-full w-full rounded-3xl object-cover" src="~/assets/images/login-vertical.jpg"/>
            </div>
            <div class="flex flex-col justify-center md:px-6 lg:px-12 xl:px-20 max-lg:col-span-3">
                <div>
                    <div class="flex flex-col items-center">
                        <p>Welcome to Vedu!</p>
                        <USwitch :items="actions" v-model="action" size="md"/>
                        <USwitch
                            v-if="action === 'register'"
                            :items="roles"
                            v-model="role"
                            size="md"
                        />
                    </div>
                    <div>
                        <LazyActionLogin v-if="action === 'login'" class="mt-4"/>
                        <LazyActionRegisterStudent
                            v-if="action === 'register' && role === 'student'"
                            class="mt-4"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import USwitch from '~/ui/USwitch.vue'

definePageMeta({
    layout: 'empty',
})

const actions = [
    {
        label: 'Login',
        value: 'login',
    },
    {
        label: 'Register',
        value: 'register',
    },
]
const action = ref('login')

const roles = [
    {
        label: 'Student',
        value: 'student',
    },
    {
        label: 'Instructor',
        value: 'instructor',
    },
]
const role = ref('student')

const email = ref('')
</script>

<style scoped></style>
