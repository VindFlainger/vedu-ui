<template>
    <div>
        <u-simple-stepper
            v-model="slot"
            :slots="slots"
            class="mt-6"
            :next-disabled="nextDisabled"
            :next-loading="nextLoading"
            next-label="Далее"
            back-label="Назад"
            finish-label="Создать аккаунт"
            @step-next="handleStep"
            slots-class="overflow-y-auto max-h-[calc(100vh-100px-24px-44px-140px)] p-1 pr-2 main-scrollbar"
        >
            <template #identification>
                <u-input
                    class="w-full"
                    v-model="email.value.value"
                    :errors="invalidIdentification?email.errors.value:[]"
                    :conditions="[
                        ['Пользователь с такой электронной почтой уже зарегистрирован', 'error', emailStatus === 'duplicated'],
                        ['Электронная почта не занята', 'success', emailStatus === 'available']
                    ]"
                    right-icon-button
                    size="md"
                    rounded="full"
                    color="primary-700"
                    type="email"
                    label="Эл. почта"
                    :right-icon="email.value.value && email.meta.valid?'ArrowPath':''"
                    required
                    @click:right-icon="handleCheckEmail"
                    @input="emailStatus = null"
                />
                <u-input
                    class="mt-4 w-full"
                    v-model="password.value.value"
                    :errors="invalidIdentification?password.errors.value:[]"
                    :password-appearance="false"
                    size="md"
                    rounded="full"
                    color="primary-700"
                    type="password"
                    left-icon="Key"
                    label="Пароль"
                    required
                />
                <u-transition-expand>
                    <div
                        v-if="password.value.value && passwordChecks.some(check => !check.status)"
                        class="mt-6 border p-1 rounded-lg"
                        :class="[passwordChecks.every(check => check.status)?'border-green-500':'border-red-500']"
                    >
                        <ul v-for="check in passwordChecks" :key="check.label">
                            <li :class="[check.status?'text-green-500':'text-red-500']">
                                <p class="flex">
                                    <u-icon
                                        v-if="check.status"
                                        value="CheckCircle"
                                        color="green-500"
                                        size="16"
                                        class="relative top-px"
                                    />
                                    <u-icon
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
                </u-transition-expand>
                <u-input
                    class="mt-4 w-full"
                    v-model="repeatedPassword.value.value"
                    :errors="invalidIdentification?repeatedPassword.errors.value:[]"
                    :password-appearance="false"
                    size="md"
                    rounded="full"
                    color="primary-700"
                    type="password"
                    label="Повторите пароль"
                    left-icon="Key"
                    required
                />
            </template>
            <template #personal_data>
                <div class="grid grid-cols-2 gap-4">
                    <u-input
                        class="col-span-2"
                        v-model="firstName.value.value"
                        :errors="firstName.errors.value"
                        :hide-errors="!invalidPersonalData"
                        label="Имя"
                        size="md"
                        rounded="full"
                        color="primary-700"
                        required
                    />
                    <u-input
                        class="col-span-2"
                        v-model="lastName.value.value"
                        :errors="lastName.errors.value"
                        :hide-errors="!invalidPersonalData"
                        label="Фамилия"
                        size="md"
                        rounded="full"
                        color="primary-700"
                        required
                    />
                    <u-input
                        class="w-full"
                        v-model.number="age.value.value"
                        :errors="age.errors.value"
                        :hide-errors="!invalidPersonalData"
                        label="Возраст"
                        size="md"
                        rounded="full"
                        color="primary-700"
                        type="number"
                        max="100"
                        :min="role === 'instructor'?18:6"
                        required
                    />
                    <u-select
                        v-model="gender.value.value"
                        :options="genderOptions"
                        :errors="gender.errors.value"
                        :hide-errors="!invalidPersonalData"
                        rounded="full"
                        color="primary-700"
                        label="Пол"
                        required
                        placeholder="Выбрать пол"
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
                <u-input
                    v-model="inviteCode"
                    label="Пригласительный код"
                    left-icon="Star"
                    hint="С помощью пригласительного кода мы автоматически добавим вас на необходимые курсы и предоставим вам соответствующие привилегии. Вы можете получить пригласительный код у своего преподавателя или организации."
                    size="md"
                    rounded="full"
                    color="primary-700"
                >
                </u-input>
                <div class="mt-6">
                    <u-checkbox v-model="agreement">
                        <p>
                            Я согласен с <a href="https://test.com" class="text-primary-700 underline"> лицензионным соглашением
                            </a> и <a href="https://test.com" class="text-primary-700 underline">политикой конфиденциальности</a>.
                        </p>
                    </u-checkbox>
                </div>
                <u-transition-expand>
                    <div
                        v-if="registerErrorList.length"
                        class="mt-6 flex gap-2 items-center text-sm text-red-500 border-2 border-dashed border-red-500 rounded-lg p-2 mb-4 bg-red-50"
                    >
                        <u-icon value="ExclamationCircle" color="red-500"/>
                        <ul :class="{'list-disc pl-3': registerErrorList.length > 1}">
                            <li v-for="error in registerErrorList" :key="error">
                                <span>{{ error }}</span>;
                            </li>
                        </ul>
                    </div>
                </u-transition-expand>
            </template>
        </u-simple-stepper>
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
        name: "Индентификация",
        disabledNext: true,
    },
    {
        value: "personal_data",
        name: "Персональные данные",
    },
    {
        value: "completion",
        name: "Завершение",
    },
]);
const slot = ref("identification");

const emit = defineEmits<{
    'registered': [v: { email: string, password: string }]
}>()


const genderOptions = ref([
    { label: 'Мужской', value: 'male' },
    { label: 'Женский', value: 'female' },
])


const { meta } = useForm({
    validationSchema: object({
        email: string().required("Введите эл. почту").email("Неверный формат эл. почты"),
        password: string().required("Введите пароль")
            .test(
                'password-test',
                'Введенный пароль слишком простой',
                () => passwordChecks.value.every(check => check.status)
            ),
        repeatedPassword: string().required("Вы должны повторить пароль")
            .test(
                'repeated-passport-test',
                'Пароли не совпадают',
                () => repeatedPassword.value.value === password.value.value,
            )
        ,
        age: number().required("Введите возраст"),
        firstName: string()
            .required("Введите имя")
            .min(2, 'Имя пользователя должно содержать от 2 до 20 символов')
            .max(20, 'Имя пользователя должно содержать от 2 до 20 символов')
        ,
        lastName: string()
            .required("Введите фамилию")
            .min(2, 'Фамилия пользователя должно содержать от 2 до 20 символов')
            .max(20, 'Фамилия пользователя должно содержать от 2 до 20 символов')
        ,
        gender: string().required("Введите пол"),
        country: string().required("Введите страну")
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
                title: 'Аккаунт создан',
                text: `Аккаунт ${props.role} был успешно создан. Вы будуте перенаправлены на страницу входа`
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
            label: 'Содержит минимум 8 символов (букв, цифр, спец. знаков)',
            status: password.value.value?.length > 8
        },
        {
            label: 'Содержит хотя бы один специальный символ [!@#$%^&*()_+]',
            status: /[!@#$%^&*()_+]/.test(password.value.value)
        },
        {
            label: 'Содержит хотя бы 1 символ в верхенм регистре',
            status: password.value.value
                ?.split('')
                ?.some(x => x === x.toUpperCase() && x.toLowerCase() !== x.toUpperCase())
        },
    ]
})

</script>
