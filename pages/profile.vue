<template>
    <div class="pb-10 pt-4">
        <div class="flex gap-8 rounded-xl">
            <nuxt-link
                v-for="link in links"
                :key="link.value"
                class="rounded-lg py-1 text-[17px] font-bold text-gray-800"
                exact-active-class="text-primary-700"
                :to="{ name: link.value }"
            >
                {{ link.label }}
            </nuxt-link>
        </div>
        <div class="mt-12 flex-grow">
            <nuxt-page />
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { $api } = useNuxtApp();

const links = [
    {
        label: 'Профиль',
        value: `profile`,
    },
    {
        label: 'Экспертиза',
        value: `profile-expertise`,
    },
    {
        label: 'Платежи',
        value: `profile-billing`,
    },
];

</script>

<style scoped></style>
