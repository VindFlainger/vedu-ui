<template>
    <div class="bg-white p-6 rounded-2xl">

    </div>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()

const {user} = storeToRefs(accountStore)
</script>

<style scoped>

</style>