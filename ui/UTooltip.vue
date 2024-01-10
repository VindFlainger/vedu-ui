<template>
    <ElTooltip popper-class="u-tooltip">
        <slot></slot>
        <template #content>
            <slot name="content"></slot>
        </template>
    </ElTooltip>
</template>

<script setup lang="ts">

</script>

<style scoped>
:global(.u-tooltip .el-popper__arrow){
    display: block;
}

:global(.u-tooltip .el-popper){
    @apply !overflow-x-auto
}

</style>