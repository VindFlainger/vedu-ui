<template>
    <div>
        <USimpleStepper
            v-model="slot"
            :slots="slots"
            class="mt-10"
            :next-disabled="nextDisabled"
            @step-next="handleStep"
        >
            <template #identification>
                <UInput
                    class="w-full"
                    v-model="email.value.value"
                    :errors="email.errors.value"
                    :hide-errors="!invalidIdentification"
                    type="email"
                    label="Email"
                />
                <UInput
                    class="mt-6 w-full"
                    label="Password"
                    v-model="password.value.value"
                    :errors="password.errors.value"
                    :hide-errors="!invalidIdentification"
                    type="password"
                    left-icon="Key"
                    :password-appearance="false"
                />
                <UInput
                    class="mt-6 w-full"
                    label="Repeat password"
                    v-model="repeatedPassword.value.value"
                    :errors="repeatedPassword.errors.value"
                    :hide-errors="!invalidIdentification"
                    type="password"
                    left-icon="Key"
                    :password-appearance="false"
                />
            </template>
            <template #personal_data>
                <div class="grid grid-cols-2 gap-6">
                    <UInput
                        v-model="firstName.value.value"
                        class="col-span-2"
                        :errors="firstName.errors.value"
                        label="First name"
                    />
                    <UInput
                        v-model="lastName.value.value"
                        class="col-span-2"
                        :errors="lastName.errors.value"
                        label="Last name"
                    />
                    <UInput
                        v-model.number="age.value.value"
                        class="w-full"
                        :errors="age.errors.value"
                        label="Age"
                        type="number"
                        max="100"
                        min="10"
                    />
                    <USelect
                        label="Gender"
                        :options="genderOptions"
                        v-model="gender.value.value"
                        :errors="gender.errors.value"
                    />
                    <CountrySelect
                        v-model="country.value.value"
                        class="col-span-2"
                        :errors="country.errors.value"
                    />
                </div>
            </template>
            <template #completion>
                <UInput label="Invite code" left-icon="Star" hint="With the help of an invitation code, we will automatically add you to the necessary courses and give you the appropriate privileges. You can get an invitation code from your teacher or organization.">
                </UInput>
                <div class="mt-6">
                    <UCheckbox v-model="agreement">
                        <p>
                            I agree to the <a href="https://test.com" class="text-primary-700 underline">license
                            agreement</a> and <a href="https://test.com" class="text-primary-700 underline">privacy
                            policy</a>.
                        </p>
                    </UCheckbox>
                </div>
            </template>
        </USimpleStepper>
    </div>
</template>

<script setup lang="ts">
import { number } from "yup";

const genderOptions = ref([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
])

const slots = ref([
    {
        value: "identification",
        name: "Identification",
        disabledNext: true,
    },
    {
        value: "personal_data",
        name: "Personal Data",
    },
    {
        value: "completion",
        name: "Completion",
    },
]);
const slot = ref("identification");

const { submitCount, meta, handleSubmit } = useForm({
    validationSchema: object({
        email: string().required("Email is required").email("Invalid email"),
        password: string().required("Password is required"),
        repeatedPassword: string().required("You should repeat password"),
        age: number().required("Age is required"),
        firstName: string().required(),
        lastName: string().required(),
        gender: string().required("Gender is required"),
        country: string().required("Gender is required")
    }),
});

const email = useField<string>("email");
const password = useField<string>("password");
const repeatedPassword = useField<string>("repeatedPassword");
const firstName = useField<string>("firstName");
const lastName = useField<string>("lastName");
const age = useField<string>("age");
const gender = useField<string>("gender");
const country = useField<string>("country");
const agreement = ref(false)

const identificationValid = computed(() => (email.meta.valid && password.meta.valid && repeatedPassword.meta.valid))
const personalDataValid = computed(() => (firstName.meta.valid && lastName.meta.valid && age.meta.valid && gender.meta.valid && country.meta.valid))
const completionValid = computed(() => (!email.errors.value.length && !password.errors.value && !password.errors.value))

const invalidIdentification = ref(false);
const invalidPersonalData = ref(false);
const invalidCompletion = ref(false);

const nextDisabled = computed(() => {
    if (slot.value === 'identification') return !identificationValid.value && invalidIdentification.value
    if (slot.value === 'personal_data') return !personalDataValid.value && invalidPersonalData.value
    if (slot.value === 'completion') return !agreement.value
})

const handleStep = async (target: string, move: () => void) => {
    if (target === "personal_data") {
        await Promise.all([email.validate(), password.validate(), repeatedPassword.validate()])
        if (identificationValid.value) move()
        else invalidIdentification.value = true;
    }
    if (target === "completion") {
        await Promise.all([firstName.validate(), lastName.validate(), age.validate(), gender.validate(), country.validate()])
        if (personalDataValid.value) move()
        else invalidPersonalData.value = true;
    }
};


</script>

<style scoped></style>
