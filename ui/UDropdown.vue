<template>
    <ElDropdown
        :trigger="props.trigger"
        ref="dropdown"
        placement="bottom-start"
    >
        <slot name="opener" :toggle="toggle">
            <UButton
                :label="label"

                @click="toggle"
            />
        </slot>
        <template #dropdown>
            <div class="w-16">
                <slot name="content">
                    <el-dropdown-menu>
                        <el-dropdown-item v-for="item in items">
                            <slot v-bind="item">
                                {{ item.label }}
                            </slot>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </slot>
            </div>
        </template>
    </ElDropdown>
</template>

<script setup lang="ts">
import UButton from '~/ui/UButton.vue'
import { DropdownInstance } from 'element-plus'
import { Props as ButtonProps } from '~/ui/UButton.vue'

export interface Props {
    label?: string
    items?: any[]
    trigger?: 'hover' | 'click'
    width?: number,
    buttonProps?: ButtonProps
}

const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    trigger: 'click',
    width: 80,
})

const dropdown = ref<DropdownInstance>()

const toggle = () => {
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
