<template>
    <div class="flex gap-6">
        <ProfileNavigationPlate class="w-min"/>
        <ProfilePersonalDataPlate class="grow"/>
        <div class="basis-3/12 shrink-0 flex flex-col gap-6">
            <ProfileBillingPlate/>
        </div>
    </div>
</template>

<script setup lang="ts">


const accountStore = useAccountStore()

const { user } = storeToRefs(accountStore)

</script>


<style scoped>

</style>