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
            <div :style="styles">
                <slot name="content" :close="dropdown?.handleClose">
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
import { useSize } from "~/ui/composables/useSize";


export type Props = {
    label?: string
    items?: any[]
    trigger?: 'hover' | 'click'
    width?: number,
    buttonProps?: ButtonProps,
}

const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    trigger: 'click',
    width: 300,
})

const dropdown = ref<DropdownInstance>()

const toggle = () => {
    dropdown.value?.handleOpen()
}

const { size: width } = useSize(props.width)

/*const cache = ref({x: 0, y: 0})
const handleChange = (v: boolean) => {
    if (v) cache.value = {x: window.scrollX, y: window.scrollY}
    window.scrollTo({left: cache.value.x, top: cache.value.y})
}*/

const styles = computed(() => ({
    width: width.value
}))
</script>

<style>
.popper {
    @apply relative -top-1.5 -mt-2 !border-none !shadow-none;
}
</style>
