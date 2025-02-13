<template>
    <USelect :options="countries" label="Страна" hide-checkbox-style placeholder="Выбрать страну"/>
</template>

<script setup lang="ts">
import ua from '~/assets/flags/ua.png'
import pl from '~/assets/flags/pl.png'

const countries = ref([
    {
        img: pl,
        value: 'pl',
        label: 'Польша',
    },
    {
        img: ua,
        value: 'ua',
        label: 'Украина',
    },
])
</script>
