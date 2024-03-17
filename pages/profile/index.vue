<template>
    <div class="flex items-start justify-center gap-6 -my-4 p-4">
        <div class="flex flex-col gap-6">
            <div class="flex gap-6">
                <ProfileNavigationPlate class="w-min "/>
                <ProfilePersonalDataPlate class="grow"/>
            </div>
            <PlanPlate/>
        </div>

        <div class="w-full h-full basis-3/12 shrink-0 flex flex-col gap-6">
            <ProfileBillingPlate/>
            <ProfileNotifications/>
        </div>

<!--        <AddPaymentMethodModal
            model-value=""
        />-->

        <FundsModal model-value=""/>

    </div>
</template>

<script setup lang="ts">


import AddPaymentMethodModal from "~/components/Globals/Modals/AddPaymentMethodModal.vue";
import FundsModal from "~/components/Globals/Modals/FundsModal.vue";

const accountStore = useAccountStore()
const { user } = storeToRefs(accountStore)


</script>


<style scoped>

</style>