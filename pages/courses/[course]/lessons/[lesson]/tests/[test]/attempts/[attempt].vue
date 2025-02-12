<template>
    <TestAttemptInstructor v-if="isInstructor"/>
    <TestAttemptStudent v-else />
</template>

<script setup lang="ts">
import TestAttemptStudent from "~/components/Lesson/Tests/Attempt/TestAttemptStudent.vue";
import TestAttemptInstructor from "~/components/Lesson/Tests/Attempt/TestAttemptInstructor.vue";

const accountStore = useAccountStore()
const { isInstructor } = storeToRefs(accountStore)
</script>

