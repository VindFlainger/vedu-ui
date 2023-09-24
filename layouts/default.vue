<template>
    <div>
        <HeaderBar/>
        <div class="pt-16 flex justify-center min-h-screen">
            <div class="max-sm:px-3 sm:w-[90%] lg:w-[80%] max-w-[1600px] min-h-[100%]">
                <div v-show="!hydratated">
                    Loading
                </div>
                <NuxtPage :class="{'hidden': !hydratated}"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    titleTemplate: title => `Vedu | ${title}`
})

const hydratated = ref(false)
onMounted(()=> {
    hydratated.value = true
})
</script>