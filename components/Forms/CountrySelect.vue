<template>
    <USelect :options="countries" label="Country" hide-checkbox-style/>
</template>

<script setup lang="ts">
import by from '~/assets/flags/by.png'
import pl from '~/assets/flags/pl.png'

const countries = ref([
    {
        img: by,
        value: 'by',
        label: 'Belarus',
    },
    {
        img: pl,
        value: 'pl',
        label: 'Poland',
    },
])
</script>
