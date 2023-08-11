<template>
    <div>
        <UInput
            class="mt-4 w-full"
            label="Email"
            v-model="test"
            type="email"
        />
        {{test}}
        <UInput
            class="mt-6 w-full"
            label="Password"
            v-model="password.value.value"
            type="password"
            left-icon="Key"
        />
        <div class="flex justify-between mt-4">
            <UCheckbox label="Remember me" v-model="remember" size="md" label-class="text-sm"/>
            <button class="text-xs font-light hover:text-primary-700 duration-75">Forgot password ?</button>
        </div>
        <div class="flex justify-end mt-3">
            <UButton class="mt-8 w-40" rounded="full" size="xl" font-weight="400">Login</UButton>
        </div>
    </div>
</template>


<script setup lang="ts">
import UInput from "~/ui/UInput.vue";
import UButton from "~/ui/UButton.vue";
import UCheckbox from "~/ui/UCheckbox.vue";
import { useField, useForm } from "vee-validate";
import yup from 'yup'

const email = useField('email')
const password = useField('password')

const test = ref('dssdsd')

const {} = useForm({
    validationSchema: yup.object({
        email: yup.string().email()
    })
})



const remember = ref(false)

</script>