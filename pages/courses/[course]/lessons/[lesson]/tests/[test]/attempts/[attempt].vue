<template>
    <div>
        <div v-if="isInstructor"></div>
        <TestAttemptStudent v-else />
    </div>
</template>

<script setup lang="ts">
import TestAttemptStudent from "~/components/Lesson/Tests/Attempt/TestAttemptStudent.vue";

const accountStore = useAccountStore()
const { isInstructor } = storeToRefs(accountStore)
</script>

