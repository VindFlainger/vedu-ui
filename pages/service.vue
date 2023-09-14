<template>
    <div class="p-10">
        <div>
            <p class="font-bold text-2xl">
                Inputs
            </p>
            <div class="mt-4">
                <UInput class="w-[300px]"></UInput>
                <UInput class="w-[300px] mt-6" placeholder="Placeholder"></UInput>
                <UInput class="w-[300px] mt-6" label="Label"></UInput>
                <UInput class="w-[300px] mt-6" label="Label" required></UInput>
                <UInput class="w-[300px] mt-6" right-icon="Users" left-icon="Users"></UInput>
                <UInput class="w-[300px] mt-6" type="email" label="Email input"></UInput>
                <UInput class="w-[300px] mt-6" type="password" label="Password input"></UInput>
                <UInput class="w-[300px] mt-6" type="number" label="Number input"></UInput>
                <UInput class="w-[300px] mt-6" label="Error Input" :errors="['My Error']"></UInput>
                <UInput class="w-[300px] mt-6" label="Many Errors Input" :errors="['My Error1', 'My Error2']" :errors-count="2"></UInput>
                <UInput class="w-[300px] mt-6" size="sm" label="SM INPUT"></UInput>
                <UInput class="w-[300px] mt-6" size="xs" label="XS INPUT"></UInput>
                <UInput class="w-[300px] mt-6" size="lg" label="LG INPUT"></UInput>
                <UInput class="w-[300px] mt-6" size="xl" label="XL INPUT"></UInput>
            </div>
            <p class="font-bold text-2xl mt-10">
                Selects
            </p>
            <div class="mt-4">
                <USelect class="w-[300px] mt-6"></USelect>
                <USelect class="w-[300px] mt-6" :options="[{label: 'Option', value: 'option'}]" label="Select with options"></USelect>
                <USelect class="w-[300px] mt-6" :options="[{label: 'Option', value: 'option'}]" label="Select with options" required></USelect>
                <USelect class="w-[300px] mt-6" :options="[{label: 'Option', value: 'option'}]" label="Select with options (hide checkboxstyle)" hide-checkbox-style></USelect>
                <USelect class="w-[300px] mt-6" :options="[{label: 'Option', value: 'option', img}]" label="Select with images" hide-checkbox-style></USelect>
                <USelect class="w-[300px] mt-6" :options="[{label: 'Option', value: 'option', img}]" v-model="option" label="Select with images" hide-checkbox-style></USelect>
            </div>
            <p class="font-bold text-2xl mt-10">
                Buttons
            </p>
            <div class="mt-4">
               <UButton class="w-[200px] mt-6 block" label="Button"></UButton>
               <UButton class="w-[200px] mt-6 block" label="Button Disabled" disabled></UButton>
               <UButton class="w-[200px] mt-6 block" label="Button Loading" loading></UButton>
               <UButton class="w-[200px] mt-6 block" label="Button Icons" icon="Users"></UButton>
               <UButton class="w-[200px] mt-6 block !text-primary-700" label="Button Plain" plain></UButton>
               <UButton class="w-[200px] mt-6 block" label="Button SM" size="sm"></UButton>
               <UButton class="w-[200px] mt-6 block" label="Button LG" size="lg"></UButton>
               <UButton class="w-[200px] mt-6 block" label="Button XL" size="xl"></UButton>
            </div>
            <p class="font-bold text-2xl mt-10">
                Checkboxes
            </p>
            <div class="mt-4">
                <UCheckbox class="w-[300px] mt-6 block" label="Checkbox"></UCheckbox>
                <UCheckbox class="w-[300px] mt-6 block" label="Checkbox Checkbox Checkbox Checkbox Checkbox Checkbox Checkbox Checkbox Checkbox Checkbox Checkbox Checkbox Checkbox Checkbox"></UCheckbox>
                <UCheckbox class="w-[300px] mt-6 block" label="Checkbox Checked" v-model="checked"></UCheckbox>
                <UCheckbox class="w-[300px] mt-6 block" label="Checkbox Solid" v-model="checked" solid></UCheckbox>
            </div>
            <p class="font-bold text-2xl mt-10">
                Switchers
            </p>
            <div class="mt-4">
                <USwitch class="w-[300px] mt-6 block" v-model="option1" :items="[{value: 'option1', label: 'Option 1'}, {value: 'option2', label: 'Option 2'}]"></USwitch>
                <USwitch class="w-[500px] mt-6 block" v-model="option1" :items="[{value: 'option1', label: 'Option 1'}, {value: 'option2', label: 'Option 2'}, {value: 'option3', label: 'Option 3'}]"></USwitch>
                <USwitch class="w-[300px] mt-6 block" v-model="option1" :items="[{value: 'option1', label: 'Option 1'}, {value: 'option2', label: 'Option 2'}]" size="sm"></USwitch>
            </div>
            <p class="font-bold text-2xl mt-10">
                Paths
            </p>
            <div class="mt-4">
               <UPath :items="[{value: 'c', name: 'C'}, {value: 'directory', name: 'Directory'}, {value: 'img.png', name: 'img.png'}]"></UPath>
               <UPath :items="[{value: 'c', name: 'C'}, {value: 'directory', name: 'Directory'}, {value: 'img.png', name: 'img.png'}]" model-value="directory"></UPath>
            </div>
            <p class="font-bold text-2xl mt-10">
                Dialogs
            </p>
            <div class="mt-4">
                <UButton class="w-[200px] mt-6 block" label="Open" @click="dialog = true"></UButton>
                <ActionRecoveryModal v-model="dialog"></ActionRecoveryModal>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import img from '~/ui/assets/flags/de.png'
definePageMeta({
    layout: 'empty'
})

const option = ref('option')
const option1 = ref('option1')
const checked = ref(true)
const dialog = ref(false)
</script>

<style scoped>

</style>