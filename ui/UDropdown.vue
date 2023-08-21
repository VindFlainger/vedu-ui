<template>
    <ElDropdown
        :trigger="props.trigger"
        ref="dropdown"
        popper-class="popper"
        placement="bottom-start"
    >
        <slot>
            <UButton
                :label="label"
                preset="outline"
                @click="toggle"
                :style="{ width: `${props.width}px` }"
            />
        </slot>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="item in items">
                    <slot v-bind="item">
                        {{ item.label }}
                    </slot>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </ElDropdown>
</template>

<script setup lang="ts">
import UButton from '~/ui/UButton.vue'
import { DropdownInstance } from 'element-plus'

export interface Props {
    label?: string
    items?: any[]
    trigger?: 'hover' | 'click'
    width?: number
}

const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    trigger: 'click',
    width: 80,
})

const dropdown = ref<DropdownInstance>()

const toggle = () => {
    console.log('here')
    dropdown.value?.handleOpen()
}
</script>

<style>
.popper {
    @apply relative -top-1.5 -mt-2 !border-none !shadow-none;
}

.el-popper__arrow {
    @apply hidden;
}
</style>
