<template>
    <div>
        <USimpleStepper :slots="slots" v-model="slot" class="mt-10">
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
                <div class="grid grid-cols-2 gap-6">
                    <UInput
                        v-model="email.value.value"
                        class="col-span-2"
                        :errors="email.errors.value"
                        :hide-errors="!submitCount"
                        label="First name"
                        :error-state="invalid"
                        @focus="invalid = false"
                    />
                    <UInput
                        v-model="email.value.value"
                        class="col-span-2"
                        :errors="email.errors.value"
                        :hide-errors="!submitCount"
                        label="Last name"
                        :error-state="invalid"
                        @focus="invalid = false"
                    />
                    <UInput
                        v-model.number="age.value.value"
                        class="w-full"
                        :errors="age.errors.value"
                        :hide-errors="!submitCount"
                        label="Age"
                        type="number"
                        max="100"
                        min="10"
                        :error-state="invalid"
                        @focus="invalid = false"
                    />
                    <USelect
                        label="Gender"
                        :options="[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                        ]"
                        v-model="gender.value.value"
                    />
                    <CountrySelect
                        class="col-span-2"
                        v-model="gender.value.value"
                    />
                </div>
            </template>
        </USimpleStepper>
    </div>
</template>

<script setup lang="ts">
import { number } from 'yup'

const slots = ref([
    {
        value: 'identification',
        name: 'Identification',
    },
    {
        value: 'personal_data',
        name: 'Personal Data',
    },
    {
        value: 'additional_data',
        name: 'Additional Data',
    },
])
const slot = ref('personal_data')

const { submitCount, meta, handleSubmit } = useForm({
    validationSchema: object({
        email: string().required('Email is required').email('Invalid email'),
        password: string().required('Password is required'),
        repeatedPassword: string().required('You should repeat password'),
        age: number().required('Age is required'),
        gender: string().required('Gender is required'),
    }),
})

const email = useField<string>('email')
const password = useField<string>('password')
const age = useField<string>('age')
const gender = useField<string>('gender')
</script>

<style scoped></style>
