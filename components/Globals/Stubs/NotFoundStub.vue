<template>
    <div class="flex flex-col items-center h-full justify-center -mt-16">
        <img src="~/assets/images/not-found.jpg" alt="" class="max-w-[800px] w-full">
        <p class="font-bold text-2xl">
            Page Not Found
        </p>
        <p class="mt-3 text-center text-gray-500 text-sm">
            This page does not exist <br> You can always contact us via email <br> <a class="text-primary-700 font-medium" href="/">support@vedu.app</a>
        </p>
        <router-link to="/">
            <UButton size="sm" class="mt-4" label="Home"/>
        </router-link>
    </div>
</template>

<script setup lang="ts">

</script>


<style scoped>

</style>