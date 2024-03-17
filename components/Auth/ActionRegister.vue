<template>
    <div>
        <USimpleStepper
            v-model="slot"
            :slots="slots"
            class="mt-6"
            :next-disabled="nextDisabled"
            :next-loading="nextLoading"
            @step-next="handleStep"
            slots-class="overflow-y-auto max-h-[calc(100vh-100px-24px-44px-140px)] p-1 pr-2 main-scrollbar"
        >
            <template #identification>
                <UInput
                    class="w-full"
                    v-model="email.value.value"
                    :errors="invalidIdentification?email.errors.value:[]"
                    :conditions="[
                        ['The user with this email is already registered', 'error', emailStatus === 'duplicated'],
                        ['Email is available', 'success', emailStatus === 'available']
                    ]"
                    right-icon-button
                    size="md"
                    rounded="full"
                    color="primary-700"
                    type="email"
                    label="Email"
                    :right-icon="email.value.value && email.meta.valid?'ArrowPath':''"
                    required
                    @click:right-icon="handleCheckEmail"
                    @input="emailStatus = null"
                />
                <UInput
                    class="mt-4 w-full"
                    v-model="password.value.value"
                    :errors="invalidIdentification?password.errors.value:[]"
                    :password-appearance="false"
                    size="md"
                    rounded="full"
                    color="primary-700"
                    type="password"
                    left-icon="Key"
                    label="Password"
                    required
                />
                <UTransitionExpand>
                    <div
                        v-if="password.value.value && passwordChecks.some(check => !check.status)"
                        class="mt-6 border p-1 rounded-lg"
                        :class="[passwordChecks.every(check => check.status)?'border-green-500':'border-red-500']"
                    >
                        <ul v-for="check in passwordChecks" :key="check.label">
                            <li :class="[check.status?'text-green-500':'text-red-500']">
                                <p class="flex">
                                    <UIcon
                                        v-if="check.status"
                                        value="CheckCircle"
                                        color="green-500"
                                        size="16"
                                        class="relative top-px"
                                    />
                                    <UIcon
                                        v-else
                                        value="ExclamationCircle"
                                        color="red-500"
                                        size="16"
                                        class="relative top-px"
                                    />
                                    <span class="ml-1 text-sm">{{ check.label }}</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </UTransitionExpand>
                <UInput
                    class="mt-4 w-full"
                    v-model="repeatedPassword.value.value"
                    :errors="invalidIdentification?repeatedPassword.errors.value:[]"
                    :password-appearance="false"
                    size="md"
                    rounded="full"
                    color="primary-700"
                    type="password"
                    label="Repeat password"
                    left-icon="Key"
                    required
                />
            </template>
            <template #personal_data>
                <div class="grid grid-cols-2 gap-4">
                    <UInput
                        class="col-span-2"
                        v-model="firstName.value.value"
                        :errors="firstName.errors.value"
                        :hide-errors="!invalidPersonalData"
                        label="First name"
                        size="md"
                        rounded="full"
                        color="primary-700"
                        required
                    />
                    <UInput
                        class="col-span-2"
                        v-model="lastName.value.value"
                        :errors="lastName.errors.value"
                        :hide-errors="!invalidPersonalData"
                        label="Last name"
                        size="md"
                        rounded="full"
                        color="primary-700"
                        required
                    />
                    <UInput
                        class="w-full"
                        v-model.number="age.value.value"
                        :errors="age.errors.value"
                        :hide-errors="!invalidPersonalData"
                        label="Age"
                        size="md"
                        rounded="full"
                        color="primary-700"
                        type="number"
                        max="100"
                        :min="role === 'instructor'?18:6"
                        required
                    />
                    <USelect
                        v-model="gender.value.value"
                        :options="genderOptions"
                        :errors="gender.errors.value"
                        :hide-errors="!invalidPersonalData"
                        rounded="full"
                        color="primary-700"
                        label="Gender"
                        required
                        size="md"
                    />
                    <CountrySelect
                        v-model="country.value.value"
                        :errors="country.errors.value"
                        :hide-errors="!invalidPersonalData"
                        class="col-span-2"
                        size="md"
                        rounded="full"
                        color="primary-700"
                        required
                    />
                </div>
            </template>
            <template #completion>
                <UInput
                    v-model="inviteCode"
                    label="Invite code"
                    left-icon="Star"
                    hint="With the help of an invitation code, we will automatically add you to the necessary courses
                        and give you the appropriate privileges. You can get an invitation code from your teacher or organization."
                    size="md"
                    rounded="full"
                    color="primary-700"
                >
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
                <UTransitionExpand>
                    <div
                        v-if="registerErrorList.length"
                        class="mt-6 flex gap-2 items-center text-sm text-red-500 border-2 border-dashed border-red-500 rounded-lg p-2 mb-4 bg-red-50"
                    >
                        <UIcon value="ExclamationCircle" color="red-500"/>
                        <ul :class="{'list-disc pl-3': registerErrorList.length > 1}">
                            <li v-for="error in registerErrorList" :key="error">
                                <span>{{ error }}</span>;
                            </li>
                        </ul>
                    </div>
                </UTransitionExpand>
            </template>
        </USimpleStepper>
    </div>
</template>

<script setup lang="ts">
import { number } from "yup";

const { $api } = useNuxtApp()
const intercomStore = useIntercomStore()

export interface Props {
    role: string
}

const props = withDefaults(defineProps<Props>(), {})




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

const emit = defineEmits<{
    'registered': [v: { email: string, password: string }]
}>()


const genderOptions = ref([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
])


const { meta } = useForm({
    validationSchema: object({
        email: string().required("Email is required").email("Invalid email"),
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
        age: number().required("Age is required"),
        firstName: string()
            .required("First name is required")
            .min(2, 'First name must contain from 2 to 20 characters')
            .max(20, 'First name must contain from 2 to 20 characters')
        ,
        lastName: string()
            .required("Last name is required")
            .min(2, 'Last name must contain from 2 to 20 characters')
            .max(20, 'Last name must contain from 2 to 20 characters')
        ,
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
const inviteCode = ref('')
const agreement = ref(false)

const identificationValid = computed(() => (email.meta.valid && password.meta.valid && repeatedPassword.meta.valid))
const personalDataValid = computed(() => (firstName.meta.valid && lastName.meta.valid && age.meta.valid && gender.meta.valid && country.meta.valid))

const invalidIdentification = ref(false);
const invalidPersonalData = ref(false);

const nextDisabled = computed(() => {
    if (slot.value === 'identification') return !identificationValid.value && invalidIdentification.value
    if (slot.value === 'personal_data') return !personalDataValid.value && invalidPersonalData.value
    if (slot.value === 'completion') return !agreement.value
})
const nextLoading = computed(() => {
    if (slot.value === 'completion') return registerLoading.value
})

const { errors: registerErrors, errorList: registerErrorList } = useRequestErrors()
const registerLoading = ref(false)
const register = async () => {
    try {
        registerLoading.value = true
        const res = await $api.auth.SIGN_UP({
            email: email.value.value,
            password: password.value.value,
            first_name: firstName.value.value,
            last_name: lastName.value.value,
            age: age.value.value,
            country: country.value.value,
            gender: gender.value.value,
            invite_code: inviteCode.value,
            role: props.role
        })
        if (res.user_id) {
            intercomStore.addNotification({
                type: 'success',
                title: 'Account created',
                text: `The ${props.role}\'s account was successfully created. You are redirected to the sign in page`
            })
            emit('registered', { email: email.value.value, password: password.value.value })
        }
    } catch (e: any) {
        registerErrors.value = e.data
    } finally {
        registerLoading.value = false
    }
}


const handleStep = async (target: string, move: () => void) => {
    registerErrors.value = null
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
    if (target === 'finish') {
        await register()
    }
};

const emailStatus = ref<null | 'duplicated' | 'available'>(null)
const handleCheckEmail = async () => {
    try {
        const res = await $api.auth.CHECK_EMAIL({ email: email.value.value })
        emailStatus.value = res ? 'duplicated' : 'available'
    } catch (e) {

    }
}

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
