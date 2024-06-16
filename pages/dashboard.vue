<template>
    <div class="flex flex-col items-center h-full justify-center">
        <div class="flex flex-col items-center">
            <u-icon
                value="CodeBracket"
                stroke-width="2.5"
                size="80"
                color="primary-900"
            />
            <p class="mt-3 font-medium text-lg text-primary-900 text-center">
                Данный раздел еще в разработке
            </p>
        </div>
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

