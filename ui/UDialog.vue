<template>
    <div
        v-if="!hidden"
        class="modal"
        @click="handleClose()"
    >
        <transition
            name="fade"
        >
            <div
                v-if="showContent"
                class="content rounded-2xl overflow-hidden max-sm:!w-[90%]"
                :style="styles"
                @click.stop
            >
                <div v-if="!hideHeader" class="relative prevent-select flex items-center h-[60px] z-20" :style="stylesHeader">
                    <div class="flex" :class="{'-ml-2': icon}">
                        <UIcon v-if="icon" :value="icon" color="white" class="z-10 relative mr-[7px]"/>
                        <p class="font-bold text-lg text-white tracking-wider pr-2 !pb-0 relative z-10 !py-0">
                            {{ title }}
                        </p>
                    </div>
                    <div class="u-dialog-bg invert"/>
                    <UIcon
                        class="absolute top-[10px] right-[10px] z-50 cursor-pointer hover:scale-110 duration-300"
                        value="XMark"
                        color="white"
                        @click="handleClose()"
                    />
                </div>
                <div class="max-h-[calc(100vh-100px)] flex flex-col z-10">
                    <div
                        class="overflow-y-auto max-h-full pretty_scrollbar"
                        :style="stylesBody"
                        :class="{'-mt-3': !hideHeader}"
                    >
                        <slot :close="handleClose"></slot>
                    </div>
                    <div
                        v-if="$slots.footer"
                        class="border-t border-dashed border-gray-400 !py-4 bg-gray-50 mt-px"
                        :style="stylesBody"
                    >
                        <slot name="footer" :close="handleClose"/>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { useSize } from "~/ui/composables/useSize";

export interface Props {
    alignCenter?: boolean,
    maxWidth?: number | string,
    width?: number | string,
    padding?: string,
    title?: string,
    icon?: string,
    modelValue: boolean,
    hideHeader?: boolean
    freeze?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    alignCenter: true,
    maxWidth: 450,
    width: '80%',
    padding: '24px',
})

const emit = defineEmits<{
    'close': [],
    [key: string]: [v?: any]
}>()

const { size: maxWidth } = useSize(props.maxWidth)
const { size: width } = useSize(props.width)

const styles = computed(() => ({
    'maxWidth': maxWidth.value,
    'width': width.value
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


const showContent = ref(false)
const hidden = ref(false)

const handleClose = ($emit?: string, $data?: any, force?: boolean) => {
    if (!props.freeze || force){
        showContent.value = false
        setTimeout(()=> {
            hidden.value = true
            if ($emit) emit($emit, $data)
            else emit('close')
        }, 150)
    }
}

const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape')  handleClose()
}

const duplicated = ref(false)

onMounted(() => {
    if (document.body.classList.contains('u-model-parent-hidden')) duplicated.value = true
    document.body.classList.add('u-model-parent-hidden')
    document.addEventListener('keydown', handleEsc)
    showContent.value = true
})

onUnmounted(() => {
    if (!duplicated.value) document.body.classList.remove('u-model-parent-hidden')
    document.removeEventListener('keydown', handleEsc)
})

defineExpose({
    close: handleClose
})

</script>

<style scoped>
.modal {
    position: fixed;
    display: flex;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2000;
}

.content {
    margin: auto;
    background: #FFF;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translate(0, -5%);
}

.fade-enter-active, .fade-leave-active {
    transition: 0.15s ease-out;
}

.u-dialog-bg {
    position: absolute;
    height: 80px;
    width: 100%;
    top: 0;
    left: 0;
    background: url("/ui/assets/images/layered-waves-haikei1.svg") 100% 100% / cover;
}

</style>