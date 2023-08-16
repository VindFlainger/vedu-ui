<template>
    <div>
        <UInput
            class="w-full"
            v-model="email.value.value"
            :errors="email.errors.value"
            :hide-errors="!submitCount"
            type="email"
            label="Email"
            :error-state="invalid"
            @focus="invalid = false"
        />
        <UInput
            class="mt-6 w-full"
            label="Password"
            v-model="password.value.value"
            :errors="password.errors.value"
            :hide-errors="!submitCount"
            type="password"
            left-icon="Key"
            :error-state="invalid"
            @focus="invalid = false"
        />
        <div class="mt-4 flex justify-between">
            <UCheckbox label="Remember me" v-model="remember" size="md" label-class="text-sm" />
            <button class="text-xs font-light duration-75 hover:text-primary-700">
                Forgot password ?
            </button>
        </div>
        <div class="mt-7 rounded-xl border border-red-500 p-2 text-red-500" v-if="invalid">
            <div class="flex items-center">
                <UIcon value="ExclamationCircle" color="red-500"/>
                <p class="ml-3 text-sm">
                    Incorrect authorization data, check the data and try again.
                </p>
            </div>
        </div>
        <div class="mt-3 flex justify-end">
            <UButton
                class="mt-8 w-40"
                rounded="full"
                size="xl"
                font-weight="400"
                @click="handleLogin"
                :disabled="submitCount && !meta.valid || invalid"
                :loading="pending"
            >
                Login
            </UButton>
        </div>
    </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const { setAuth } = useAccountStore()

const { submitCount, meta, handleSubmit } = useForm({
    validationSchema: object({
        email: string().required('Email is required').email('Invalid email'),
        password: string().required('Password is required'),
    }),
})

const email = useField<string>('email')
const password = useField<string>('password')
const remember = ref(false)
const invalid = ref(false)


// prettier-ignore
const { data, error, execute: login, pending, messages, code } = $api.Auth.LOGIN_STUDENT({
    immediate: false,
    lazy: true,
    watch: false,
    body: {
        password: password.value,
        email: email.value,
        remember,
    },
})

const handleLogin = handleSubmit(async () => {
    await login()
    if (data.value) await setAuth(data.value.refresh_token, data.value.live_time)
    else if (error.value?.statusCode === 401) {
        password.value.value = ''
        email.value.value = ''
        invalid.value = true
        submitCount.value = 0
    }
})
</script>
