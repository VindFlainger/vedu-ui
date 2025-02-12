<template>
    <div class="relative h-screen flex flex-col items-center justify-center">
        <div class="z-10">
            <img src="~/assets/images/big-logo.png" alt="" class="max-w-[500px] w-[90%] relative left-[3%]">
            <UProgress :value="value" :max="100" type="linear" class="h-4 mt-6 max-w-[500px] w-[90%]"/>
        </div>
        <div class="absolute inset-0 bg-gray-200/10">

        </div>
    </div>
</template>

<script setup lang="ts">
const value = ref(0)

const increase = () => {
    setTimeout(() => {
        value.value++
        increase()
    }, value.value**1.1)
}

onMounted(() => {
    increase()
})
</script>

<style scoped>

</style>