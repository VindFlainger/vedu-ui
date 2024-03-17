<template>
    <UModal
        :model-value="modelValue"
        title="Add Payment Method"
        @close="close"
        max-width="560"
    >
        <div class="pt-4">
            <div class="flex justify-center">
                <div class="relative w-[315px] h-[184px] rounded-2xl bg-[linear-gradient(177.23deg,_#3A49F9_-13.49%,_#9C2CF3_109.75%)] overflow-hidden">
                    <div class="absolute top-[30px] left-[30px]">
                        <p class="text-sm text-white/50">
                            Fund Limit
                        </p>
                        <p class="mt-2 text-[28px] text-white leading-6">
                            {{fundLimit.value.value ? `${useNotateThousands(fundLimit.value.value)} BYN` : `∞ BYN`}}
                        </p>
                    </div>
                    <div class="absolute bottom-[25px] left-[30px] text-sm text-white">
                        {{ numberMask }}
                    </div>
                    <div class="absolute bottom-[25px] right-[30px] text-sm text-white">
                        {{ expiresMask }}
                    </div>
                    <div class="absolute top-[25px] right-[30px]">
                        <img class="w-[45px] h-[35px]" src="~/assets/images/cards/mastercard.png" alt="">
                    </div>
                    <img class="absolute -bottom-16 -left-16 z-10" src="~/assets/images/cards/bottom-ellipse.png" alt="">
                    <img class="absolute -top-14 -right-14 z-10" src="~/assets/images/cards/top-ellipse.png" alt="">
                </div>
            </div>
            <div class="mt-5 grid grid-cols-2 gap-y-1 gap-x-5">
                <u-input
                    v-model="number.value.value"
                    :errors="number.errors.value"
                    :hide-errors="!number.meta.validated"
                    label="Number"
                    placeholder="#### #### #### ####"
                    mask="#### #### #### ####"
                    required
                    info-line
                    @input="number.meta.validated = false"
                />
                <u-input
                    v-model="expires.value.value"
                    :errors="expires.errors.value"
                    :hide-errors="!expires.meta.validated"
                    label="Expires"
                    mask="##/##"
                    placeholder="##/##"
                    required
                    info-line
                    @input="expires.meta.validated = false"
                />
                <u-input
                    v-model="cvv.value.value"
                    :errors="cvv.errors.value"
                    :hide-errors="!cvv.meta.validated"
                    label="CVV"
                    type="password"
                    placeholder="###"
                    required
                    info-line
                    @input="cvv.meta.validated = false"
                />
                <u-input
                    v-model="fundLimit.value.value"
                    :errors="fundLimit.errors.value"
                    :hide-errors="!fundLimit.meta.validated"
                    type="number"
                    min="1"
                    max="9999"
                    label="Fund Limit"
                    placeholder="999"
                    description="Maximum amount of money that can be debited from the card"
                    info-line
                    @input="fundLimit.meta.validated = false"
                />
            </div>
        </div>
        <template #footer>
            <div class="flex justify-between">
                <u-button
                    label="Save"
                    :disabled="submitDisabled"
                    @click="submit"
                />
                <u-button
                    label="Cancel"
                    text
                    color="red-500"
                />
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { number } from "yup";

const route = useRoute()

export interface Props {
    modelValue: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits()

const { meta } = useForm({
    validationSchema: object({
        number: string().required("Card number is required").min(19, 'Invalid card number'),
        expires: string().required("Card expires is required").min(5, 'Invalid card expires date'),
        cvv: string().required("cvv code is required").min(3, 'Invalid cvv code')
    }),
});

const number = useField<string>("number");
const expires = useField<string>("expires");
const cvv = useField<string>("cvv");
const fundLimit = useField<string>("fundLimit");

const numberMask = computed(()=> {
    return (number.value.value || "") + '#### #### #### ####'.slice(number.value.value?.length)
})

const expiresMask = computed(()=> {
    return (expires.value.value || "") + '##/##'.slice(expires.value.value?.length)
})

const submitDisabled = computed(() => {
    return !number.meta.valid || !expires.meta.valid || !cvv.meta.valid || !fundLimit.meta.valid
})

const submit = () => {
    number.validate()
}


const close = () => {
    emit('update:modelValue', false)
}

</script>