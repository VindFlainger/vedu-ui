<template>
    <div class="w-full">
        <div class="flex gap-12">
            <SizedAvatar :avatar="user.avatar" rounded :size="200" :frame-width="256" />
            <div class="w-full max-w-[1200px]">
                <p class="mb-3 flex items-center gap-1.5 font-nunito text-lg font-extrabold text-primary-700">
                    <u-icon class="relative bottom-px" value="User" solid color="primary-700" :size="20" />
                    Персональные данные
                </p>
                <div>
                    <div class="flex gap-5">
                        <u-input v-model="firstName.value.value" class="flex-grow max-w-[300px]" label="Имя" info-line />
                        <u-input v-model="lastName.value.value" class="flex-grow max-w-[300px]" label="Фамилия" info-line />
                        <u-date-input
                            v-model="birthDate.value.value"
                            class="!max-w-[300px]"
                            label="Дата рождения"
                            info-line
                            position="left"
                        />
                    </div>
                    <div class="flex gap-5">
                        <u-input label="Email address" type="email" />
                        <u-input-phone label="Phone number" v-model:country="country.value.value" v-model="phone.value.value" />
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-8">
            <div>
                <p class="mb-3 flex items-center gap-1.5 font-nunito text-lg font-extrabold text-primary-700">
                    <u-icon class="relative bottom-px" value="GlobeAlt" solid color="primary-700" :size="20" />
                    Контактные данные
                </p>
                <div class="grid grid-cols-2 gap-x-7">
                    <!-- <UInput label="Страна" info-line /> -->
                    <div>
                        <u-label label="Страна" :font-size="15" :description="countryDescription" />
                        <div class="mt-[7px] flex gap-3">
                            <button
                                v-for="flag in flags"
                                :key="flag.value"
                                class="rounded-full border-2 border-transparent"
                                :class="{
                                    '!border-white outline outline-2 outline-primary-800':
                                        user.personal_data.country === flag.value,
                                }"
                            >
                                <img :src="flag.flag" alt="flag.name" class="size-8" />
                            </button>
                        </div>
                    </div>
                    <UInput label="Регион" info-line />
                    <USelect label="Город/населенный пункт" info-line />
                    <USelect label="Улица" info-line />
                    <USelect label="Дом" info-line />
                    <USelect label="Квартира" info-line />
                </div>
            </div>
        </div>
        <div class="mt-8 flex justify-end gap-3">
            <u-button label="Отмена" size="sm" />
            <u-button label="Сохранить изменения" size="sm" />
        </div>
    </div>
</template>

<script setup lang="ts">
import UInput from '~/ui/UInput.vue';
import USelect from '~/ui/USelect.vue';
import { definePageMeta } from '#imports';
import { PersonalData, UserProfile } from 'types/account';
import ru from '~/assets/flags/ru.png';
import by from '~/assets/flags/by.png';

definePageMeta({
    layout: 'default',
});

const accountStore = useAccountStore();

const { user } = storeToRefs(accountStore) as { user: Ref<UserProfile> };

const flags = ref<
    {
        name: string;
        value: string;
        flag: string;
    }[]
>([
    { name: 'Россия', value: 'ru', flag: ru },
    { name: 'Беларусь', value: 'by', flag: by },
]);

const countryDescription = 'Измение страны повлияет на другие настройки, изменяйте страну с осторожностью';

const { meta } = useForm({
    validationSchema: object({
        firstName: string()
            .required('Введите имя')
            .min(2, 'Имя пользователя должно содержать от 2 до 20 символов')
            .max(20, 'Имя пользователя должно содержать от 2 до 20 символов'),
        lastName: string()
            .required('Введите фамилию')
            .min(2, 'Фамилия пользователя должно содержать от 2 до 20 символов')
            .max(20, 'Фамилия пользователя должно содержать от 2 до 20 символов'),
        birthDate: string().required('Выберите дату рождения'),
    }),
});

const firstName = useField<string>('firstName');
const lastName = useField<string>('lastName');
const birthDate = useField<string>('birthDate');

const country = useField<string>('country');
const email = useField<string>('email');
const phone = useField<string>('phone');

// const address = useField<string>("firstName");
// const lastName = useField<string>("lastName");
// const age = useField<string>("age");
// const gender = useField<string>("gender");
// const country = useField<string>("country");
// const inviteCode = ref('')
// const agreement = ref(false)

const lazyUserData = ref<PersonalData>(user.value.personal_data);

firstName.value.value = user.value.personal_data.first_name;
lastName.value.value = user.value.personal_data.last_name;
birthDate.value.value = user.value.personal_data.birth_date;

const changesDone = computed(() => {
    return;
    lazyUserData.value.first_name !== firstName.value.value ||
        lazyUserData.value.last_name !== lastName.value.value ||
        lazyUserData.value.birth_date !== birthDate.value.value;
});

const countries = [];
</script>

<style scoped></style>
