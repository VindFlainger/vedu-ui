<template>
    <UModal
        :model-value="modelValue"
        title="Funding Balance"
        @close="close"
        max-width="400"
    >
        <div class="pt-4">
            <div class="flex justify-center">
                <div class="relative w-[315px] h-[184px] rounded-2xl bg-[linear-gradient(177.23deg,_#3A49F9_-13.49%,_#9C2CF3_109.75%)] overflow-hidden">
                    <div class="absolute top-[30px] left-[30px]">
                        <p class="text-sm text-white/50">
                            Fund Limit
                        </p>
                        <p class="mt-2 text-[28px] text-white leading-6">
                            {{creditCard.fund_limit ? `${useNotateThousands(creditCard.fund_limit)} BYN` : `∞ BYN`}}
                        </p>
                    </div>
                    <div class="absolute bottom-[25px] left-[30px] text-sm text-white">
                        {{ creditCard.number }}
                    </div>
                    <div class="absolute bottom-[25px] right-[30px] text-sm text-white">
                        {{ creditCard.expires }}
                    </div>
                    <div class="absolute top-[25px] right-[30px]">
                        <img class="w-[45px] h-[35px]" src="~/assets/images/cards/mastercard.png" alt="">
                    </div>
                    <img class="absolute -bottom-16 -left-16 z-10" src="~/assets/images/cards/bottom-ellipse.png" alt="">
                    <img class="absolute -top-14 -right-14 z-10" src="~/assets/images/cards/top-ellipse.png" alt="">
                </div>
            </div>
            <div class="mt-8">
                <p class="text-gray-800 font-bold">Presets:</p>
                <div class="flex gap-2.5 flex-wrap justify-center mt-2">
                    <button
                        v-for="preset in presets"
                        :key="preset"
                        class="min-w-24 w-1/4 p-1.5 bg-primary-700 border-2 border-primary-800 rounded-xl text-center
                            text-sm font-medium text-white leading-4 hover:bg-primary-700/90 hover:scale-105 duration-150 transition-transform shadow select-none"
                        :class="{
                            '!bg-gray-200 !border-gray-300 !text-gray-400 cursor-not-allowed !scale-100': preset > creditCard.fund_limit,
                            '!outline !outline-2 !outline-offset-2 !outline-pink-500 !bg-pink-400 !border-pink-500 !scale-100': preset === selectedPreset
                        }"
                        :disabled="preset > creditCard.fund_limit"
                        @click="selectedPreset = preset"
                    >
                        {{ useNotateThousands(preset) }} BYN
                    </button>
                </div>
                <div class="mt-2 py-3 text-center font-bold text-sm text-gray-800">
                   -OR-
                </div>
                <div>
                    <p class="text-gray-800 font-bold">Custom:</p>
                    <div>
                        <u-input
                            v-model="customAmount"
                            type="number"
                            class="mt-2"
                            @input="selectedPreset = null"
                        />
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex justify-between">
                <u-button
                    label="Fund"
                    :disabled="submitDisabled"
                    @click="submit"
                />
                <u-button
                    class="font-bold"
                    font-weight="600"
                    label="Cancel"
                    text
                    color="red-500"
                />
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
export interface Props {
    modelValue: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits()

const presets = ref([50, 100, 200, 500, 1000])
const selectedPreset = ref<number | null>(null)

const customAmount = ref<string | null>(null)


const creditCard = {
    number: '#### #### #### 4444',
    expires: '12/22',
    cvv: '232',
    fund_limit: 912
}


const submitDisabled = computed(() => {
   return !selectedPreset.value && !customAmount.value
})

const submit = () => {

}


const close = () => {
    emit('update:modelValue', false)
}

</script>