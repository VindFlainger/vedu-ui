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
                    <div class="flex gap-6">
                        <u-input
                            v-model="firstName.value.value"
                            class="max-w-[300px] flex-grow"
                            label="Имя"
                            info-line
                        />
                        <u-input
                            v-model="lastName.value.value"
                            class="max-w-[300px] flex-grow"
                            label="Фамилия"
                            info-line
                        />
                        <u-date-input
                            v-model="birthDate.value.value"
                            class="!max-w-[300px] flex-grow"
                            label="Дата рождения"
                            info-line
                            position="left"
                        />
                    </div>
                    <div class="flex gap-6">
                        <u-input
                            v-model="email.value.value"
                            class="max-w-[250px] flex-grow"
                            label="Электронная почта"
                            type="email"
                        />
                        <u-input-phone label="Мобильный телефон" v-model="phone.value.value" />
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
                <div class="flex gap-x-12">
                    <!-- <UInput label="Страна" info-line /> -->
                    <div>
                        <u-label label="Страна" :font-size="15" :description="countryDescription" />
                        <div class="mt-[7px] flex gap-3">
                            <button
                                v-for="flag in flags"
                                :key="flag.value"
                                class="rounded-full border-2 border-transparent"
                                :class="{
                                    'border-white outline !outline-2 !outline-primary-800':
                                        country.value.value === flag.value,
                                }"
                                @click="country.value.value = flag.value"
                            >
                                <img :src="flag.flag" alt="flag.name" class="size-8" />
                            </button>
                        </div>
                    </div>
                    <u-select
                        v-model="address.value.value"
                        :remote="searchForCompletion"
                        return-object
                        filterable
                        class="max-w-[450px] flex-grow"
                        label="Адрес"
                        @update:model-value="handleAddressChange"
                    />
                </div>
                <div class="mt-10 grid grid-cols-2 gap-x-8 gap-y-5">
                    <u-input v-model="region.value.value" label="Регион" />
                    <u-input v-model="settlement.value.value" label="Город" />
                    <u-input v-model="street.value.value" label="Улица" />
                    <u-input v-model="house.value.value" label="Дом" />
                    <u-input v-model="unit.value.value" label="Блок / подъезд" />
                    <u-input v-model="room.value.value" label="Квартира / комната" />
                    <u-input v-model="postalCode.value.value" label="Почтовый индекс" />
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
import type { PersonalData, UserProfile } from '~/types/account';

import pl from '~/assets/flags/pl.png';
import ua from '~/assets/flags/ua.png';
import type { GeoAddress } from '~/types/completion';

const { $api } = useNuxtApp();

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
    { name: 'Украина', value: 'ua', flag: ua },
    { name: 'Польша', value: 'pl', flag: pl },
]);

const countryDescription = 'Измение страны повлияет на другие настройки, изменяйте страну с осторожностью';

const { meta, values } = useForm({
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

const firstName = useField<string>('first_name');
const lastName = useField<string>('last_name');
const birthDate = useField<string>('birth_date');
const email = useField<string>('email');
const phone = useField<string>('phone_number');

const country = useField<string>('country');
const region = useField<string>('region');
const settlement = useField<string>('settlement');
const street = useField<string>('street');
const house = useField<string>('house');
const unit = useField<string>('unit');
const room = useField<string>('room');
const postalCode = useField<string>('postal_code');

const address = useField<GeoAddress | { value: string, label: string }>('address');

const userData = ref<PersonalData>(user.value.personal_data);

firstName.value.value = user.value.personal_data.first_name;
lastName.value.value = user.value.personal_data.last_name;
birthDate.value.value = user.value.personal_data.birth_date;
email.value.value = user.value.personal_data.email;
phone.value.value = user.value.personal_data.phone_number || '';

const initValues = () => {
    firstName.value.value = user.value.personal_data.first_name;
    lastName.value.value = user.value.personal_data.last_name;
    birthDate.value.value = user.value.personal_data.birth_date;
    email.value.value = user.value.personal_data.email;
    phone.value.value = user.value.personal_data.phone_number || '';

    country.value.value = user.value.personal_data.country || '';
    region.value.value = user.value.personal_data.address.region || '';
    settlement.value.value = user.value.personal_data.address.settlement || '';
    street.value.value = user.value.personal_data.address.street || '';
    house.value.value = user.value.personal_data.address.house || '';
    unit.value.value = user.value.personal_data.address.unit || '';
    room.value.value = user.value.personal_data.address.room || '';
    postalCode.value.value = user.value.personal_data.address.postal_code || '';

    address.value.value = {
        label: [region.value.value,  settlement.value.value, street.value.value, house.value.value, room.value.value].filter(v => v).join(', '),
        value: [region.value.value,  settlement.value.value, street.value.value, house.value.value, room.value.value].filter(v => v).join(', ')
    }
};

initValues()

const countryList: Record<string, string> = {
    pl: 'Польшая',
    ua: 'Украина',
};

const searchForCompletion = async (v: string) => {
    const res = await $api.completion.GET_ADDRESS_COMPLETION({
        query: v,
        country: countryList[country.value.value],
    });

    return res.suggestions.map((item) => ({
        ...item.data,
        value: [item.data.country, item.data.region_with_type,  item.data.city, item.data.street, item.data.house, (item.data.flat || item.data.room)].filter(v => v).join(', '),
        label: item.value,
    }));
};

const handleAddressChange = (v: GeoAddress) => {
    region.value.value = v.region_with_type || '';
    settlement.value.value = v.city || v.settlement || '';
    street.value.value = v.street || '';
    house.value.value = v.house || '';
    unit.value.value = v.block || '';
    room.value.value = v.flat || v.room || '';
    postalCode.value.value = v.postal_code || '';
};

</script>
