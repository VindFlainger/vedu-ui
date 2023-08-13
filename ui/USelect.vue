<template>
    <div v-bind="{ class: attrs.class }">
        <p class="mb-1 text-sm font-medium text-gray-600" v-if="props.label">
            {{ props.label }}
        </p>
        <ElSelect
            v-bind="{ ...attrs, class: inputClass }"
            class="[&>div>div>div]:!shadow-[0_0_0_1px_#d1d5db] [&_input]:h-[46px] w-full focus:!outline-none select"
        />
    </div>
</template>

<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
})

export interface Props {
    label?: string
    inputClass?: string
}

const props = withDefaults(defineProps<Props>(), {
    inputClass: '',
})

const attrs = useAttrs()
</script>

<style scoped lang="scss">
.select :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #d1d5db !important;
}

.el-select :deep(.el-input.is-focus .el-input__wrapper) {
    box-shadow: 0 0 0 1px #d1d5db !important;
}

.select :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px #d1d5db !important;
}
</style>