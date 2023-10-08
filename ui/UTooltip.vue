<template>
    <ElTooltip popper-class="u-tooltip">
        <slot>

        </slot>
    </ElTooltip>
</template>

<script setup lang="ts">

</script>

<style scoped>
.u-tooltip :deep(.el-popper__arrow){
    display: block;
}

.u-tooltip :deep(.el-popper){
    @apply !overflow-x-auto
}
</style>