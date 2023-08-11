<template>
    <div class="flex gap-2">
        <UButton loading>Saved</UButton>
        <UButton disabled>Analytics</UButton>
        <UDialog :modelValue="test"></UDialog>
    </div>
</template>

<script setup lang="ts">
import UButton from '~/ui/UButton.vue'
import UDialog from "~/ui/UDialog.vue";

const test = ref(true)
</script>
