<template>
    <USelect :options="countries" label="Страна" hide-checkbox-style placeholder="Выбрать страну"/>
</template>

<script setup lang="ts">
import by from '~/assets/flags/by.png'
import ru from '~/assets/flags/ru.png'

const countries = ref([
    {
        img: by,
        value: 'by',
        label: 'Беларусь',
    },
    {
        img: ru,
        value: 'ru',
        label: 'Россия',
    },
])
</script>
