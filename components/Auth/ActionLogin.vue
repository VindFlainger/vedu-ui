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
                @enter="handleLogin"
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
                    size="lg"
                    font-weight="400"
                    :loading="loading"
                    :disabled="(submitCount && !meta.valid) || invalid"
                    @click="handleLogin"
                >
                    Login
                </UButton>
            </div>
        </div>
        <client-only>
            <ActionRecoveryModal
                v-model="forgotPasswordModal"
            />
        </client-only>
    </div>
</template>

<script setup lang="ts">

const { $api } = useNuxtApp()
const { setAuth } = useAccountStore()
const route = useRoute()
const router = useRouter()

export interface Props {
    email?: string,
    password?: string
}

const props = withDefaults(defineProps<Props>(), {})

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

const { loading, addLoading, removeLoading } = useLoading()
const handleLogin = handleSubmit(async () => {
    try {
        addLoading()
        const res = await $api.auth.SIGN_IN({
            password: password.value.value,
            email: email.value.value,
            remember: remember.value,
        })
        if (res) {
            await setAuth(res.refresh_token, remember.value)
            router.replace({ name: 'dashboard' })
        }
    } catch (e) {
        password.value.value = ''
        email.value.value = ''
        invalid.value = true
        submitCount.value = 0
    } finally {
        removeLoading()
    }
})

onMounted(() => {
    forgotPasswordModal.value = !!route.query.recovery_session
    if (props.email) email.value.value = props.email
    if (props.password) password.value.value = props.password
})

</script>
