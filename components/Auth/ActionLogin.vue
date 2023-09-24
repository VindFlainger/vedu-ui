<template>
    <div>
        <div>
            <UInput
                class="w-full"
                v-model="email.value.value"
                :errors="email.errors.value"
                :hide-errors="!submitCount"
                size="md"
                rounded="full"
                color="primary-700"
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
                size="md"
                rounded="full"
                color="primary-700"
                type="password"
                left-icon="Key"
                :error-state="invalid"
                @focus="invalid = false"
            />
            <div class="mt-4 flex justify-between">
                <UCheckbox label="Remember me" v-model="remember" size="md" label-class="text-sm"/>
                <button class="text-xs font-light duration-75 hover:text-primary-700" @click="forgotPasswordModal=true">
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
                    :disabled="(submitCount && !meta.valid) || invalid"
                >
                    Login
                </UButton>
            </div>
        </div>
        <ActionRecoveryModal
            v-model="forgotPasswordModal"
        />
    </div>
</template>

<script setup lang="ts">

const { $api } = useNuxtApp()
const { setAuth } = useAccountStore()
const route = useRoute()

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
const forgotPasswordModal = ref(false)


const handleLogin = handleSubmit(async () => {
    const { data, error, } = await $api.Auth.LOGIN_STUDENT({
        body: {
            password: password.value,
            email: email.value,
            remember,
        },
    })
    if (data.value) await setAuth(data.value.refresh_token, data.value.live_time)
    else if (error.value?.statusCode === 401) {
        password.value.value = ''
        email.value.value = ''
        invalid.value = true
        submitCount.value = 0
    }
})

onMounted(()=> forgotPasswordModal.value = !!route.query.recovery_session)

</script>
