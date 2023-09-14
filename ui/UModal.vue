<template>
    <client-only>
        <ElDialog
            v-bind="$attrs"
            class="u-modal !rounded-2xl overflow-hidden"
            modal-class="u-modal-dialog"
            :style="styles"
            :width="width as string"
            :align-center="!!alignCenter"
        >
            <template #header>
                <div class="relative prevent-select">
                    <p class="font-medium text-lg pr-2 !pb-0 relative z-10" :style="stylesHeader">
                        {{ title }}
                    </p>
                    <div class="u-modal-dialog__bg"/>
                </div>
            </template>
            <template #default>
                <div :style="stylesBody">
                    <slot></slot>
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
    title?: string
}

const props = withDefaults(defineProps<Props>(), {
    alignCenter: true,
    maxWidth: 450,
    width: '80%',
    padding: '24px'
})

const { size: maxActiveWidth } = useSize(props.maxWidth)

const styles = computed(() => ({
    'maxWidth': maxActiveWidth.value
}))

const stylesBody = computed(() => ({
    'padding': props.padding
}))

const stylesHeader = computed(() => ({
    'padding': props.padding
}))


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
    color: black !important;
    transition-duration: 0.3s;
}

:global(.u-modal-dialog .el-dialog__headerbtn:hover .el-dialog__close){
    color: rgb(73 187 189) !important;
}

:global(.u-modal-dialog .el-dialog__headerbtn){
    z-index: 10;
}

:global(.el-dialog__body){
    padding: 0;
    font-size: 16px;
    color: black;
}

:global(.el-dialog__header){
    padding: 0;
}

:global(.u-modal-dialog__bg){
    position: absolute;
    height: 80px;
    width: calc(100% + 16px);
    top: -8px;
    right: -16px;
    background: url("/ui/assets/images/layered-waves-haikei.svg");
    opacity: 0.4;
}
</style>