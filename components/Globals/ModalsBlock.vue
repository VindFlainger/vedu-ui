<template>
    <FundsModal
        :model-value="true"
        v-if="activeModals.find(x => x.modal === 'funds-modal')"
        v-bind="activeModals.find(x => x.modal === 'funds-modal')?.data"
        @close="closeModal('funds-modal')"
    />
    <AddPaymentMethodModal
        v-if="activeModals.find(x => x.modal === 'payment-modal')"
        v-bind="activeModals.find(x => x.modal === 'payment-modal')?.data"
        @close="closeModal('payment-modal')"
    />
    <ConfirmDeleteModal
        v-if="activeModals.find(x => x.modal === 'confirm-delete')"
        v-bind="activeModals.find(x => x.modal === 'confirm-delete')?.data"
        @close="closeModal('confirm-delete')"
    />
</template>

<script setup lang="ts">
import ConfirmDeleteModal from "~/components/Globals/Modals/ConfirmDeleteModal.vue";

const { $emitter } = useNuxtApp()

const activeModals = ref<{ modal: string, data?: any }[]>([])

const closeModal = (modalName: string) => {
    activeModals.value = activeModals.value.filter(x => x.modal !== modalName)
}

const openModal = (modalName: string, data: any) => {
    activeModals.value.push({
        modal: modalName,
        data
    })
}

const startListeningForEvents = () => {
    $emitter.on('open:funds-modal', (v) => {
        openModal('funds-modal', v)
    })

    $emitter.on('close:funds-modal', () => closeModal('funds-modal'))


    $emitter.on('open:payment-modal', (v) => {
        openModal('payment-modal', v)
    })

    $emitter.on('close:payment-modal', () => closeModal('payment-modal'))


    $emitter.on('open:plans-modal', (v) => {
        openModal('plans-modal', v)
    })

    $emitter.on('close:plans-modal', () => closeModal('plans-modal'))

    $emitter.on('open:confirm-delete', (v) => {
        openModal('confirm-delete', v)
    })

    $emitter.on('close:confirm-delete', () => closeModal('confirm-delete'))
}

startListeningForEvents()

</script>

<style scoped>

</style>