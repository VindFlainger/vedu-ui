<template>
    <div>
        <header class="h-20  bg-black"></header>
        <div class="px-20 py-20">
            <div>
                <p class="font-bold text-title capitalize">{{tab}}</p>
                <div class="mt-12">
                    <USwitch :tabs="tabs" v-model="tab"/>
                </div>
            </div>
            <div class="pt-12">
                <NuxtPage/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import USwitch from '~/ui/UTabs.vue'

const tab = ref('booking')

const tabs = ref([
    {
        icon: 'User',
        label: 'Profile',
        value: 'profile'
    },
    {
        icon: 'Calendar',
        label: 'Booking',
        value: 'booking'
    }
])



</script>
