<template>
    <div class="w-full">
        <ULabel
            :description="description"
            :label="label"
            :required="required"
            :text-color="textColor"
            :style="sizeFrames.labelStyles"
            :questionIndicatorColor="isErrorState ? errorStateColor : undefined"
        />
        <input class="w-full" type="text" ref="reference">
    </div>
    <div ref="floating" class="bg-red-800" :style="floatingStyles">
        Test
    </div>
</template>

<script setup lang="ts">
import { useFloating, autoUpdate, size } from "@floating-ui/vue";
import { useColor } from "~/ui/composables/useColor";

const reference = ref<any>(null)
const floating = ref<any>(null)

const errorStateColor = '#DC2626'

export interface Props {
    label: string,
    description: string,
    required: boolean,
    textColor: 'black',
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
}

const props = withDefaults(defineProps<Props>(), {
    size: 'sm',
})

const isErrorState = computed(() => false)

const { color: textColor } = useColor(computed(() => isErrorState.value ? errorStateColor : props.textColor))


const { floatingStyles } = useFloating(reference, floating, {
    transform: true,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [size({
        apply({rects, elements}) {
            Object.assign(elements.floating.style, {
                width: `${rects.reference.width}px`,
            });
        },
    })]
})

const sizeFrames = computed(() => {
    switch (props.size) {
        case 'xs':
            return {
                height: 32,
                paddingContent: '1px 6px',
                labelStyles: { marginBottom: '3px' },
                iconSizes: {
                    default: 24,
                    plus: 15,
                },
                iconMargin: 3
            }
        case 'sm':
            return {
                height: 36,
                paddingContent: '1px 8px',
                labelStyles: { marginBottom: '6px' },
                iconSizes: {
                    default: 24,
                    plus: 15,
                },
                iconMargin: 4
            }
        case 'md':
            return {
                height: 48,
                paddingContent: '1px 16px',
                labelStyles: { marginBottom: '6px' },
                iconSizes: {
                    default: 24,
                    plus: 13,
                },
                iconMargin: 5
            }
        case 'lg':
            return {
                height: 56,
                paddingContent: '1px 20px',
                labelStyles: { marginBottom: '10px' },
                iconSizes: {
                    default: 24,
                    plus: 15,
                },
                iconMargin: 7
            }
        case 'xl':
            return {
                height: 64,
                paddingContent: '1px 24px',
                labelStyles: { marginBottom: '12px' },
                iconSizes: {
                    default: 24,
                    plus: 15,
                },
                iconMargin: 12
            }
    }
})

const styles = computed(() => ({
    'height': `${sizeFrames.value.height}px`,
}))



</script>

<style scoped>

</style>