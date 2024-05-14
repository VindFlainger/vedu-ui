<template>
    <USelect :options="countries" label="Страна" hide-checkbox-style placeholder="Выбрать страну"/>
</template>

<script setup lang="ts">
import by from '~/assets/flags/by.png'
import pl from '~/assets/flags/pl.png'

const countries = ref([
    {
        img: by,
        value: 'by',
        label: 'Беларусь',
    },
    {
        img: pl,
        value: 'pl',
        label: 'Польша',
    },
])
</script>
