<template>
    <UModal
        :model-value="modelValue"
        title="Account Recovery"
        @close="close"
        max-width="460"
    >
        <div>
            <div v-if="!route.query.recovery_session">
                <div v-if="!successSent">
                    <UInput
                        v-model="email.value.value"
                        :errors="recoveryEmailSubmits?email.errors.value:[]"
                        label="Email"
                        size="md"
                        rounded="full"
                        color="primary-700"
                        type="email"
                    />
                    <p class="text-sm text-gray-500 mt-2 ml-2">
                        An email will be sent to your email address with the steps to restore access. Follow them to
                        recover
                        access to your account.
                    </p>
                    <ErrorsCard class="mt-4" :errors="errors"/>
                    <div class="mt-6">
                        <UButton
                            :loading="recoveryEmailLoading"
                            label="Send Email"
                            @click="handleRecoveryEmail"
                        />
                    </div>
                </div>
                <div v-else class="flex flex-col items-center py-6">
                    <UIcon value="ShieldCheck" color="primary-700" size="100"></UIcon>
                    <p class="text-center max-w-[250px] text-sm mt-2 text-gray-600 font-medium">Recovery instructions
                        have been sent to the email address.</p>
                    <UButton class="mt-6" label="Home" size="sm" @click="close"/>
                </div>
            </div>
            <div v-else>
                <div class="flex items-center gap-[6px] mt-2">
                    <UIcon value="InformationCircle" size="20" color="gray-500"/>
                    <p class="text-gray-500 text-sm">
                        Specify the new authorization creds. You will be able to use these creds for authorization in
                        the future.
                    </p>
                </div>
                <UInput
                    class="w-full mt-4"
                    v-model="password.value.value"
                    :errors="changePasswordSubmits?password.errors.value:[]"
                    :password-appearance="false"
                    size="md"
                    rounded="full"
                    color="primary-700"
                    type="password"
                    left-icon="Key"
                    label="New Password"
                    required
                />
                <div v-if="password.value.value && !passwordChecks.every(check => check.status)"
                     class="mt-6 border p-1 rounded-lg border-red-500">
                    <ul v-for="check in passwordChecks">
                        <li :class="[check.status?'text-green-500':'text-red-500']">
                            <p class="flex">
                                <UIcon v-if="check.status" value="CheckCircle" color="green-500" size="16"
                                       class="relative top-px"/>
                                <UIcon v-else value="ExclamationCircle" color="red-500" size="16"
                                       class="relative top-px"/>
                                <span class="ml-1 text-sm">{{ check.label }}</span>
                            </p>
                        </li>
                    </ul>
                </div>
                <UInput
                    class="mt-4 w-full"
                    v-model="repeatedPassword.value.value"
                    :errors="changePasswordSubmits?repeatedPassword.errors.value:[]"
                    :password-appearance="false"
                    type="password"
                    label="Repeat password"
                    size="md"
                    rounded="full"
                    color="primary-700"
                    left-icon="Key"
                    required
                />
                <ErrorsCard :errors="errors"/>
                <div class="mt-6">
                    <UButton label="Change Password" @click="handleChangePassword"/>
                </div>
            </div>
        </div>
    </UModal>
</template>

<script setup lang="ts">
const route = useRoute()
const { $api } = useNuxtApp()

export interface Props {
    modelValue: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits()

const errors = ref(null)
const successSent = ref(false)


const close = () => {
    emit('update:modelValue', false)
}

const { handleSubmit: _handleRecoveryEmail, submitCount: recoveryEmailSubmits } = useForm({
    validationSchema: object({
        email: string().required('Email is required').email('Invalid email')
    })
})
const email = useField<string>("email");
const recoveryEmailLoading = ref(false)
const handleRecoveryEmail = _handleRecoveryEmail(async () => {
    recoveryEmailLoading.value = true
    const { data, error } = await $api.auth.RECOVERY_EMAIL({
        body: { email: email.value.value }
    })
    recoveryEmailLoading.value = false
    if (data.value?.success) successSent.value = true
    else if (error.value?.data) errors.value = error.value?.data
})

const { handleSubmit: _handleChangePassword, submitCount: changePasswordSubmits } = useForm({
    validationSchema: object({
        password: string().required("Password is required")
            .test(
                'password-test',
                'The password entered is too simple',
                () => passwordChecks.value.every(check => check.status)
            ),
        repeatedPassword: string().required("You should repeat password")
            .test(
                'repeated-passport-test',
                'Passwords don\'t match',
                () => repeatedPassword.value.value === password.value.value,
            )
        ,
    })
})
const password = useField<string>("password");
const repeatedPassword = useField<string>("repeatedPassword");
const changePasswordLoading = ref(false)
const handleChangePassword = _handleChangePassword(async () => {
    changePasswordLoading.value = true
    const { data, error } = await $api.Auth.CHANGE_PASSWORD()
    changePasswordLoading.value = false
    if (data.value?.success) close()
    else if (error.value?.data) errors.value = error.value?.data
})

const passwordChecks = computed(() => {
    return [
        {
            label: 'Contain at least 8 characters',
            status: password.value.value?.length > 8
        },
        {
            label: 'Contain at least one special symbol [!@#$%^&*()_+]',
            status: /[!@#$%^&*()_+]/.test(password.value.value)
        },
        {
            label: 'Contains at least one uppercase letter',
            status: password.value.value
                ?.split('')
                ?.some(x => x === x.toUpperCase() && x.toLowerCase() !== x.toUpperCase())
        },
    ]
})

</script>


<style scoped>

</style>