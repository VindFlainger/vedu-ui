<template>
    <div>
        <USimpleStepper :slots="slots" v-model="slot" skipping>
            <template #identification>
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
                    :password-appearance="false"
                    @focus="invalid = false"
                />
                <UInput
                    class="mt-6 w-full"
                    label="Repeat password"
                    v-model="password.value.value"
                    :errors="password.errors.value"
                    :hide-errors="!submitCount"
                    type="password"
                    left-icon="Key"
                    :error-state="invalid"
                    :password-appearance="false"
                    @focus="invalid = false"
                />
            </template>
            <template #personal_data> 
                <UInput
                    class="w-full"
                    v-model="email.value.value"
                    :errors="email.errors.value"
                    :hide-errors="!submitCount"
                    label="First name"
                    :error-state="invalid"
                    @focus="invalid = false"
                />
                <UInput
                    class="w-full mt-6"
                    v-model="email.value.value"
                    :errors="email.errors.value"
                    :hide-errors="!submitCount"
                    label="First name"
                    :error-state="invalid"
                    @focus="invalid = false"
                />
            </template>
        </USimpleStepper>
    </div>
</template>

<script setup lang="ts">
const slots = ref([
    {
        value: 'identification',
        name: 'Identification',
    },
    {
        value: 'personal_data',
        name: 'Personal Data'
    },
    {
        value: 'additional_data',
        name: 'Additional Data'
    },
])
const slot = ref('personal_data')

const { submitCount, meta, handleSubmit } = useForm({
    validationSchema: object({
        email: string().required('Email is required').email('Invalid email'),
        password: string().required('Password is required'),
        repeatedPassword: string().required('You should repeat password'),
    }),
})

const email = useField<string>('email')
const password = useField<string>('password')
</script>

<style scoped></style>
