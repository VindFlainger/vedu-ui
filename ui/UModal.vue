<template>
    <client-only>
        <ElDialog
            v-bind="$attrs"
            class="u-modal !rounded-2xl overflow-hidden max-sm:!w-11/12"
            modal-class="u-modal-dialog"
            :style="styles"
            :width="width as string"
            :align-center="!!alignCenter"
            :model-value="modelValue"
            @update:model-value="emit('update:modelValue', $event)"
        >
            <template #header>
                <div class="relative prevent-select flex items-center h-[60px] py-2 z-20" :style="stylesHeader">
                    <div class="flex" :class="{'-ml-2': icon}">
                        <UIcon v-if="icon" :value="icon" color="white" class="z-10 relative mr-[7px]"/>
                        <p class="font-bold text-lg text-white tracking-wider pr-2 !pb-0 relative z-10 !py-0">
                            {{ title }}
                        </p>
                    </div>
                    <div class="u-modal-dialog__bg invert"/>
                </div>
            </template>
            <template #default>
                <div class="max-h-[calc(100vh-100px)] flex flex-col z-10">
                    <div class="overflow-y-auto max-h-full pretty_scrollbar -mt-3" :style="stylesBody">
                        <slot :close="handleClose"/>
                    </div>
                    <div
                        v-if="$slots.footer"
                        class="border-t border-dashed border-gray-400 !py-4 bg-gray-50 mt-px"
                        :style="stylesBody"
                    >
                        <slot name="footer" :close="handleClose"/>
                    </div>
                </div>
            </template>
        </ElDialog>
    </client-only>
</template>

<script setup lang="ts">
import { useSize } from "~/ui/composables/useSize";

defineOptions({
    inheritAttrs: false
})

export interface Props {
    alignCenter?: boolean,
    maxWidth?: number | string,
    width?: number | string,
    padding?: string,
    title?: string,
    icon?: string,
    modelValue: boolean
}

const props = withDefaults(defineProps<Props>(), {
    alignCenter: true,
    maxWidth: 450,
    width: '80%',
    padding: '24px'
})

const emit = defineEmits<{
    'update:modelValue': [v: boolean]
}>()

const { size: maxActiveWidth } = useSize(props.maxWidth)

const styles = computed(() => ({
    'maxWidth': maxActiveWidth.value
}))

const stylesBody = computed(() => ({
    'padding': props.padding
}))

const stylesHeader = computed(() => ({
    'padding': props.padding,
}))

const stylesFooter = computed(() => ({
    'padding': props.padding
}))

const handleClose = () => {
    emit('update:modelValue', false)
}


watch(() => props.modelValue, (value, oldValue) => {
    if (value) document.body.classList.add('u-model-parent-hidden')
    else document.body.classList.remove('u-model-parent-hidden')
}, { immediate: true })
</script>

<style scoped lang="scss">
:global(.u-modal-dialog .el-dialog__headerbtn) {
    height: 35px;
    width: 35px;
    right: 4px;
    top: 10px;
    font-size: 20px;
}

:global(.el-dialog__close) {
    color: white !important;
    transition-duration: 0.3s;
}

:global(.u-modal-dialog .el-dialog__headerbtn:hover .el-dialog__close) {
    transform: scale(1.2);
}

:global(.u-modal-dialog .el-dialog__headerbtn) {
    z-index: 100;
}

:global(.el-dialog__body) {
    padding: 0;
    font-size: 16px;
    color: black;
}

:global(.el-dialog__header) {
    padding: 0;
}

:global(.u-modal-dialog__bg) {
    position: absolute;
    height: 80px;
    width: calc(100% + 16px);
    top: -8px;
    right: -16px;
    background: url("/ui/assets/images/layered-waves-haikei.svg");
}
</style>