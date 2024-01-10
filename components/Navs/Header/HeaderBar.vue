<template>
    <div class="sticky right-0 top-0 z-[9999] flex h-16 items-center bg-gray-100 pl-4 pr-10 left-0">
        <nuxt-link :to="{name: 'dashboard'}">
            <img
                class="ml-6 h-10"
                src="~/assets/images/big-logo.png"
            />
        </nuxt-link>
        <nuxt-link :to="{name: 'questions'}">Questions</nuxt-link>
        <button @click="account.clearAuth()">Log Out</button>
        <div class="ml-auto mr-0 flex items-center">
            <UIcon value="MagnifyingGlass" size="27" stroke-width="1"/>
            <UIcon value="Bell" size="27" stroke-width="1" class="ml-6"/>
            <img
                class="ml-6 h-10 w-10"
                src="~/assets/images/previews/boy-large.png"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const account = useAccountStore()
</script>
