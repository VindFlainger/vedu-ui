<template>
    <div class="flex">
        <div class="w-[548px]">
            <div>
                <p class="text-xl font-bold">Personal information</p>
                <div class="grid grid-cols-2 gap-8 mt-8">
                    <UInput label="First name" />
                    <UInput label="Last name" />
                    <UInput label="Address" class="col-span-2"/>
                    <UInput label="Zip code" />
                    <USelect label="Country" />
                    <USelect label="City" />
                </div>
            </div>
            <div class="mt-12">
                <p class="text-xl font-bold">Contact information</p>
                <div class="grid grid-cols-1 gap-8 mt-8">
                    <UInput
                        label="Email address"
                        type="email"
                    />
                    <UInputPhone label="Phone number" v-model:country="country" v-model="phone"/>
                </div>
            </div>
            <div class="mt-12">
                <p class="text-xl font-bold">Company information</p>
                <div class="grid grid-cols-1 gap-8 mt-8">
                    <UInput label="Company name" />
                </div>
            </div>
            <div class="mt-12">
                <p class="text-xl font-bold">Company information</p>
                <div class="grid grid-cols-1 gap-8 mt-8">
                    <UInput label="Company name" />
                </div>
            </div>
            <div class="mt-12">
                <p class="text-xl font-bold">Company information</p>
                <div class="grid grid-cols-1 gap-8 mt-8">
                    <UInput label="Company name" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import UInput from '~/ui/UInput.vue'
import USelect from '~/ui/USelect.vue'
import {definePageMeta} from "#imports";
import UInputPhone from "~/ui/UInputPhone.vue";


definePageMeta({

})

const country = ref('by')
const phone = ref('')


</script>

<style scoped></style>
