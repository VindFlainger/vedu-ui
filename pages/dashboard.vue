<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
    roles: ['public', 'student', 'instructor'],
})

useSeoMeta({
    title: () => 'Dashboard'
})
</script>

