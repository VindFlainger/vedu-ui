<template>
    <div>
        <ULabel
                v-if="label"
                :label="props.label"
                :required="required"
                :style="sizeFrames.labelStyles"
        />
        <div class="flex">
            <u-select v-model="innerCountry" :options="countries" label-name="name" class="w-[110px]">
                <template #selected="{ selected }">
                    <div class="flex items-center">
                        <img class="size-6" :src="selected.flag" alt="">
                        <p class="flex-grow text-center">+{{ selected.code}}</p>
                    </div>
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
                v-model="lazyPhone"
                class="ml-2 grow !appearance-none [&_input]:!text-base [&_input]:!text-black"
                :mask="activeCountry?.mask"
            ></UInput>
        </div>
    </div>
</template>

<script setup lang="ts">
import UInput from '~/ui/UInput.vue';
import ua from '~/ui/assets/flags/ua.png';
import pl from '~/ui/assets/flags/pl.png';


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


const innerCountry = ref('pl');
const lazyPhone = ref('');


watch(
    country,
    (v) => {
        innerCountry.value = v || 'pl';
    },
    {
        immediate: true,
    }
);

watch(
    innerCountry,
    (v) => {
        country.value = v;
        lazyPhone.value = ''
    },
    {
        immediate: true,
    }
);

const countries = ref([
	{
		name: 'Польша',
		value: 'pl',
		code: 48,
		mask: '(##) ###-###-###',
		flag: pl,
	},
	{
		name: 'Украина',
		value: 'ua',
		code: 380,
		mask: '(###) ###-###-###',
		flag: ua,
	},
]);

const activeCountry = computed(() => countries.value.find((c) => c.value === innerCountry.value));



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
