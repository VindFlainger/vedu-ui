<template>
    <div
        class="fixed right-0 top-0 z-[1000] flex h-14 items-center bg-gray-100 pl-4 pr-10 left-0"
    >
        <div class="ml-auto mr-0 flex items-center">
            <router-link to="auth">Auth</router-link>
            <UIcon value="MagnifyingGlass" size="27" stroke-width="1" />
            <UIcon value="Bell" size="27" stroke-width="1" class="ml-6" />
            <img
                class="ml-6 h-10 w-10"
                src="~/assets/images/previews/boy-large.png"
                alt=""
            />
        </div>
    </div>
</template>

<script setup lang="ts">

const layoutStore = useLayoutStore()

const { collapsed } = storeToRefs(layoutStore)
</script>
