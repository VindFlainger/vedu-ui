<template>
    <div>
        <UInput
            class="mt-4 w-full"
            v-model="email.value.value"
            :errors="email.errors.value"
            :hide-errors="!submitCount"
            type="email"
            label="Email"
        />
        <UInput
            class="mt-6 w-full"
            label="Password"
            v-model="password.value.value"
            :errors="password.errors.value"
            :hide-errors="!submitCount"
            type="password"
            left-icon="Key"
        />
        <div class="mt-4 flex justify-between">
            <UCheckbox label="Remember me" v-model="remember" size="md" label-class="text-sm" />
            <button class="text-xs font-light duration-75 hover:text-primary-700">
                Forgot password ?
            </button>
        </div>
        <div class="mt-3 flex justify-end">
            <UButton
                class="mt-8 w-40"
                rounded="full"
                size="xl"
                font-weight="400"
                @click="handleLogin"
                :disabled="submitCount && !meta.valid"
                :loading="pending"
            >
                Login
            </UButton>
        </div>
        <button @click="login">Test</button>
        {{ error }}
    </div>
</template>

<script setup lang="ts">
import UInput from '~/ui/UInput.vue'
import UButton from '~/ui/UButton.vue'
import UCheckbox from '~/ui/UCheckbox.vue'
import { useField, useForm } from 'vee-validate'
import { string, object } from 'yup'

const { $api } = useNuxtApp()

const { submitCount, meta, handleSubmit } = useForm({
    validationSchema: object({
        email: string().required('Email is required').email('Invalid email'),
        password: string().required('Password is required'),
    }),
})

const email = useField<string>('email')
const password = useField<string>('password')
const remember = ref(false)

// prettier-ignore
const { data, error, execute: login, pending, messages, code } = $api.Auth.LOGIN_STUDENT({
    immediate: false,
    lazy: true,
    watch: false,
    query: {
        password: password.value,
        email: email.value,
        remember
    }
})

const handleLogin = handleSubmit(async () => {
    await login()
})
</script>
