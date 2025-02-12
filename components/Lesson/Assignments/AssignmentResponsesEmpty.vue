<template>
    <div>
        <div class="w-36 h-5 skeleton-loader rounded-md mb-2"/>
        <div class="flex flex-col gap-2">
            <div
                v-for="i in 2"
                :key="i"
                class="p-4 border border-gray-200 rounded-2xl"
            >
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 skeleton-loader rounded-full"/>
                    <div
                        class="skeleton-loader h-3 rounded-md w-full"
                        :style="{maxWidth: `${Math.random() * (150-60+1)+60}px`}"
                    />
                    <div
                        class="skeleton-loader h-3 rounded-md w-full"
                        :style="{maxWidth: `${Math.random() * (120-60+1)+60}px`}"
                    />
                </div>
                <div class="ml-5 mt-3 flex gap-3">
                    <div class="h-16 w-12 skeleton-loader rounded-md"/>
                    <div class="h-16 w-12 skeleton-loader rounded-md"/>
                    <div class="h-16 w-12 skeleton-loader rounded-md"/>
                </div>
                <div class="mt-3 flex justify-end">
                    <div class="w-[90px] h-[30px] skeleton-loader rounded-xl"/>
                </div>
            </div>
        </div>
        <div class="mt-5 w-36 h-5 skeleton-loader rounded-md mb-2"/>
        <div class="flex flex-col gap-2">
            <div
                v-for="i in 2"
                :key="i"
                class="p-4 border border-gray-200 rounded-2xl"
            >
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 skeleton-loader rounded-full"/>
                    <div
                        class="skeleton-loader h-3 rounded-md w-full"
                        :style="{maxWidth: `${Math.random() * (150-60+1)+60}px`}"
                    />
                    <div
                        class="skeleton-loader h-3 rounded-md w-full"
                        :style="{maxWidth: `${Math.random() * (120-60+1)+60}px`}"
                    />
                </div>
                <div class="ml-5 mt-3 flex gap-3">
                    <div class="h-16 w-12 skeleton-loader rounded-md"/>
                    <div class="h-16 w-12 skeleton-loader rounded-md"/>
                    <div class="h-16 w-12 skeleton-loader rounded-md"/>
                </div>
                <div class="mt-3 flex justify-end">
                    <div class="w-[90px] h-[30px] skeleton-loader rounded-xl"/>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

</script>


<style scoped>

</style>