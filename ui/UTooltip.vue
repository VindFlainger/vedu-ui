<template>
    <ElTooltip  popper-class="u-tooltip">
        <slot></slot>
        <template #content>
            <div :style="{
                maxWidth: `${maxWidth}px`
            }">
                <slot name="content">
                    <p v-html="content"/>
                </slot>
            </div>
        </template>
    </ElTooltip>
</template>

<script setup lang="ts">
export interface Props {
    content: string,
    maxWidth: number
}

const props = withDefaults(defineProps<Props>(), {
    maxWidth: 200
})
</script>

<style scoped>
:global(.u-tooltip .el-popper__arrow){
    display: block;
}

:global(.u-tooltip .el-popper){
    @apply !overflow-x-auto
}

</style>