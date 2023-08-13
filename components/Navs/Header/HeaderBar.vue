<template>
    <div
        class="fixed right-0 top-0 z-[1000] flex h-14 items-center bg-gray-100 pl-4 pr-10"
        :class="[collapsed?'left-16':'left-60']"
    >
        <div
            @click="collapsed = !collapsed"
        >
            <UIcon value="ArrowLeftOnRectangle" v-if="!collapsed" />
            <UIcon value="ArrowRightOnRectangle" v-else />
        </div>
        <div class="ml-auto mr-0 flex items-center">
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
import UIcon from '~/ui/UIcon.vue'
import { useLayoutStore } from '~/store/Layout'

const layoutStore = useLayoutStore()

const { collapsed } = storeToRefs(layoutStore)
</script>
