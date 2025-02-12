<template>
    <div class="py-16 flex flex-col items-center">
        <ULoading :size="70"/>
        <p class="mt-1 loading text-primary-500 text-[15px] font-semibold -ml-1 font-nunito">
            Загрузка
        </p>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.loading:after {
    content: '';
    position: absolute;
    animation: 1s infinite l;
}
@keyframes l {
    0% {
        content: '';
    }
    25% {
        content: '.';
    }
    50% {
        content: '..';
    }
    75% {
        content: '...';
    }
}
</style>