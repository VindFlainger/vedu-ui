<template>
    <transition
            name="bar-expand"
    >
        <div
                v-show="isSideBar"
                class="h-full bg-blue-200 duration-500"
                :class="[isSideBarCollapsed?'w-20':'w-96']"
        >
        </div>
    </transition>
</template>

<script setup lang="ts">
import {useLayoutStore} from "~/store/Layout";

const {isSideBar, isSideBarCollapsed} = storeToRefs(useLayoutStore())


</script>

<style scoped>
.bar-expand-enter-active, .bar-expand-leave-active {
    transition: .4s;
}

.bar-expand-enter-from, .bar-expand-leave-to {
    width: 0;
}

</style>