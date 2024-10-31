<template>
    <div>
        <ULabel
                v-if="label"
                :label="props.label"
                :required="required"
                :style="sizeFrames.labelStyles"
        />
        <div class="flex">
            <u-select v-model="innerCountry" :options="countries" label-name="name" class="w-[100px]">
                <template #empty>

                </template>
                <template #option="{ active, label, option }">
                    <div class="flex items-center p-2">
                        <img :src="option.flag" alt="" class="size-7" />
                        <p>
                            <span class="ml-3 text-[15px] font-medium">{{ label }}</span>
                            <span class="ml-1">(+{{ option.code }})</span>
                        </p>
                    </div>
                </template>
            </u-select>
            <UInput
                class="ml-2 grow !appearance-none [&_input]:!text-base [&_input]:!text-black"
                :modelValue="lazyPhone"
                :mask="activeCountry?.mask"
                @update:modelValue="handlePhoneInput"
            ></UInput>
        </div>
    </div>
</template>

<script setup lang="ts">
import UInput from '~/ui/UInput.vue';
import ru from '~/ui/assets/flags/ru.png';
import by from '~/ui/assets/flags/by.png';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';

export interface Props {
    label?: string;
    required?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface Phone {
    code: number;
    phone: string;
    country: string;
}

const props = withDefaults(defineProps<Props>(), {
    size: 'sm',
});

const modelValue = defineModel<string | undefined>();
const country = defineModel<string | undefined>('country');


const active = ref(false);
const innerCountry = ref('by');

watch(
    country,
    (v) => {
        innerCountry.value = v || 'by';
    },
    {
        immediate: true,
    }
);

watch(
    innerCountry,
    (v) => {
        innerCountry.value = v;
    },
    {
        immediate: true,
    }
);

const countries = ref([
    {
        name: 'Россия',
        value: 'ru',
        code: 7,
        masks: '(###) ###-##-##',
        flag: ru,
    },
    {
        name: 'Беларусь',
        value: 'by',
        code: 375,
        mask: '(##) ###-##-##',
        flag: by,
    },
]);

const activeCountry = computed(() => countries.value.find((c) => c.value === innerCountry.value));

const lazyPhone = ref('');

const handlePhoneInput = async (v: string) => {
    if (activeCountry.value) {
        console.log(modelValue)
        modelValue.value = '+' + activeCountry.value.code + v;

        try {
            if (v && v.length > 3) {
                v = parsePhoneNumber(v, activeCountry.value.value.toUpperCase() as CountryCode).formatInternational();
            }
            v = v.replace('+' + String(activeCountry.value.code), '');
        } catch (e) {}
        lazyPhone.value = v;
    }
};


const sizeFrames = computed(() => {
    switch (props.size) {
        case 'xs':
            return {
                labelStyles: { marginBottom: '3px', fontSize: '14px' },
            };
        case 'sm':
            return {
                labelStyles: { marginBottom: '4px', fontSize: '15px' },
            };
        case 'md':
            return {
                labelStyles: { marginBottom: '5px', fontSize: '16px' },
            };
        case 'lg':
            return {
                labelStyles: { marginBottom: '7px', fontSize: '16px' },
            };
        case 'xl':
            return {
                labelStyles: { marginBottom: '9px', fontSize: '16px' },
            };
    }
});

</script>
