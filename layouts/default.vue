<template>
    <div>
        <HeaderBar/>
        <div class="min-h-[calc(100vh-56px)] flex flex-col">
            <div id="action-bar" class="sticky top-14 bg-white z-50"></div>
            <div class="py-4 flex justify-center grow">
                <div class="max-sm:px-3 sm:w-[90%] lg:w-[80%] max-w-[1600px] min-h-[100%]">
                    <NuxtPage :class="{'hidden': !hydratated}">
                        <div>

                        </div>
                        <slot>

                        </slot>
                    </NuxtPage>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    titleTemplate: title => `Vedu! | ${title}`
})

const hydratated = ref(false)
onMounted(()=> {
    hydratated.value = true
})
</script>