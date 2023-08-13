<template>
    <div>
        <p class="mb-1 text-sm font-medium text-gray-600" v-if="props.label">
            {{ props.label }}
        </p>
        <div class="flex">
            <ElDropdown
                trigger="click"
                @command="emit('update:country', $event)"
                popper-class="[&>_span]:hidden"
                :popper-options="{
                    placement: 'bottom-start',
                    modifiers: [
                    {
                      name: 'flip',
                      options: {
                        fallbackPlacements: ['top-start'], // by default, all the placements are allowed
                        rootBoundary: 'document'
                      },
                    },
                  ],
                }"
                placement="bottom-start"
                @visible-change="active = $event"
            >
                <ElButton
                    class="!h-[48px] !border-none !shadow-[0_0_0_1px_#d1d5db] min-w-[133px] hover:!bg-white focus:!bg-white focus:!outline-none"
                >
                    <div class="flex items-center group" :class="{active}">
                        <img class="h-6 w-6" :src="activeCountry.flag" alt="" />
                        <span
                            class="relative top-px ml-2 block text-base font-normal text-black"
                        >
                            +{{ activeCountry.code }}
                        </span>
                        <UIcon class="ml-4 delay-100 duration-200 group-[.active]:rotate-180" :size="16" value="ChevronDown" stroke-width="2.3" />
                    </div>
                </ElButton>
                <template #dropdown>
                    <ElDropdownMenu class="!p-0">
                        <ElDropdownItem
                            v-for="country in countries"
                            :key="country.value"
                            class="!p-0"
                            :class="[country.value === activeCountry.value?'!bg-black/10':'hover:!bg-black/5']"
                            :command="country.value"
                        >
                            <template #default>
                                <div class="flex p-4">
                                    <img
                                        class="h-6 w-6"
                                        :src="country.flag"
                                        alt=""
                                    />
                                    <span
                                        class="relative top-px ml-4 block text-base font-normal text-black"
                                    >
                                        +{{ country.code }}
                                    </span>
                                    <span
                                        class="relative top-px ml-4 block text-base font-normal text-black"
                                    >
                                        {{ country.name }}
                                    </span>
                                </div>
                            </template>
                        </ElDropdownItem>
                    </ElDropdownMenu>
                </template>
            </ElDropdown>
            <UInput
                class="ml-2 grow !appearance-none [&_input]:!text-base [&_input]:!text-black"
                type="phone"
                :modelValue="lazyPhone"
                @update:modelValue="handlePhoneInput"
            ></UInput>
        </div>
    </div>
</template>

<script setup lang="ts">
import UInput from '~/ui/UInput.vue'
import gb from '~/ui/assets/flags/gb.png'
import by from '~/ui/assets/flags/by.png'
import {CountryCode, parsePhoneNumber} from 'libphonenumber-js'
import UIcon from "~/ui/UIcon.vue";

export interface Props {
    modelValue?: string
    country: string
    label?: string
}

export interface Phone {
    code: number,
    phone: string,
    country: string
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    country: 'by',
})

const emit = defineEmits<{
    'update:modelValue': [phone: any]
    'update:country': [country: string]
}>()

const active = ref(false)

const countries = ref([
    {
        name: 'United Kingdom',
        value: 'gb',
        code: 44,
        flag: gb,
    },
    {
        name: 'Belarus',
        value: 'by',
        code: 375,
        flag: by,
    },
])

const activeCountry = computed(() =>
    countries.value.find((c) => c.value === props.country)
)

const lazyPhone = ref('')

const handlePhoneInput = async (v: string) => {
    if (activeCountry.value){
        emit('update:modelValue', '+' + activeCountry.value.code + v)

        try {
            if (v && v.length > 3) {
                v = parsePhoneNumber(v, activeCountry.value.value.toUpperCase() as CountryCode).formatInternational()
            }
            v = v.replace('+' + String(activeCountry.value.code), '')
        } catch (e){}
        lazyPhone.value  = v
    }
}

</script>