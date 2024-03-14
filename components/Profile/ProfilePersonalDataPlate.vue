<template>

    <div class="bg-white p-6 rounded-2xl">
        <p class="font-medium text-lg">
            Personal Data
        </p>
        <div class="mt-5 grid grid-cols-2 gap-x-7 gap-y-3">
            <u-input
                v-model="lazyPersonalData.first_name"
                label="First Name"
                required
            />
            <u-input
                v-model="lazyPersonalData.last_name"
                label="Last Name"
                required
            />
            <u-input
                v-model="lazyPersonalData.age"
                type="number"
                label="Age"
                max="100"
                min="0"
                required
            />
        </div>
        <div class="mt-8 grid grid-cols-2 gap-x-7 gap-y-3">
            <u-input
                v-model="lazyPersonalData.email"
                label="Email"
                type="email"
                required
            />
            <u-select
                v-model="lazyPersonalData.country"
                return-object
                label="Country"
                required
                left-icon="GlobeAlt"
                :options="countries"
                value-name="code"
                label-name="name"
            />
            <u-select
                v-model="lazyPersonalData.gender"
                label="Gender"
                required
                left-icon="User"
                :options="genders"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import countries from "~/config/countries";
import genders from "~/config/genders";

const accountStore = useAccountStore()

const { user } = storeToRefs(accountStore)

const lazyPersonalData = ref({
    first_name: "",
    last_name: "",
    gender: "",
    age: 0,
    country: {
        code: "",
        name: ""
    },
    email: ""
})

lazyPersonalData.value = { ...user.value.personal_data }


</script>

<style scoped>

</style>