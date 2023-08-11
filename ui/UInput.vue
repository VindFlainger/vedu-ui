<template>
    <div v-bind="{ class: attrs.class }" :class="{'prevent-select': !selection}">
        <p
            class="font-medium"
            v-if="props.label"
            :style="labelStyles"
            :class="labelClass"
        >
            {{ props.label }}
        </p>
        <ElInput
            v-bind="{ ...attrs, class: inputClass }"
            :style="styles"
            class="u-input [&>div]:rounded-full [&>div]:!shadow-[0_0_0_1px_#49BBBD] [&_input]:text-base"
            :type="passwordVisible?'text': type as string"
        >
            <template #prefix>
                <UIcon :value="leftIcon" v-if="leftIcon"/>
                <UIcon value="Envelope" v-else-if="type === 'email'"/>
                <slot name="prefix" v-else
                ></slot>
            </template>
            <template #suffix>
                <UIcon :value="rightIcon" v-if="rightIcon"/>
                <UIcon
                    :value="passwordVisible ? 'Eye' : 'EyeSlash'"
                    v-else-if="type === 'password' && passwordAppearance"
                    @click.stop="passwordVisible = !passwordVisible"
                    tag="button"
                />
                <slot
                    name="suffix"
                    v-else
                ></slot>
            </template>
        </ElInput>
    </div>
</template>

<script setup lang="ts">
import UIcon from '~/ui/UIcon.vue'


defineOptions({
    inheritAttrs: false,

})

const slots = defineSlots<{
    prefix?(): any
    suffix?(): any
}>()


export interface Props {
    label?: string
    inputClass?: string
    labelClass?: string
    type?: 'text' | 'email' | 'password'
    passwordAppearance?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    leftIcon?: string
    rightIcon?: string
    selection?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    inputClass: '',
    type: 'text',
    size: 'md',
    passwordAppearance: true,
    selection: false
})

const attrs = useAttrs()

const height = computed(() => {
    switch (props.size) {
        case 'xs':
            return 32
        case 'sm':
            return 40
        case 'md':
            return 48
        case 'lg':
            return 56
        case 'xl':
            return 64
    }
})

const isPrefixed = computed(() => slots.prefix || props.leftIcon || props.type === 'email')
const isSuffixed = computed(() => slots.suffix || props.rightIcon || (props.type === 'password' && props.passwordAppearance))

const padding = computed(() => {
    switch (props.size) {
        case 'xs':
            return `0 ${isSuffixed ? '1px' : '2px'} 0 ${isPrefixed ? '1px' : '2px'}`
        case 'sm':
            return `0 ${isSuffixed ? '2px' : '4px'} 0 ${isPrefixed ? '2px' : '4px'}`
        case 'md':
            return `0 ${isSuffixed ? '3px' : '6px'} 0 ${isPrefixed ? '3px' : '6px'}`
        case 'lg':
            return `0 ${isSuffixed ? '4px' : '8px'} 0 ${isPrefixed ? '4px' : '8px'}`
        case 'xl':
            return `0 ${isSuffixed ? '5px' : '10px'} 0 ${isPrefixed ? '5px' : '10px'}`
    }
})

const paddingContent = computed(() => {
    switch (props.size) {
        case 'xs':
            return '1px 8px'
        case 'sm':
            return '1px 12px'
        case 'md':
            return '1px 16px'
        case 'lg':
            return '1px 20px'
        case 'xl':
            return '1px 24px'
    }
})

const labelStyles = computed(() => {
    switch (props.size) {
        case 'xs':
            return { marginBottom: '3px' }
        case 'sm':
            return { marginBottom: '5px' }
        case 'md':
            return { marginBottom: '6px' }
        case 'lg':
            return { marginBottom: '10px' }
        case 'xl':
            return { marginBottom: '12px' }
    }
})

const inputClasses = computed(() => `${height.value} ${props.inputClass}`)

const styles = computed(() => ({
    '--u-input-padding': padding.value,
    '--u-input-padding-content': paddingContent.value,
    height: `${height.value}px`,
}))

const passwordVisible = ref(false)
</script>

<style scoped lang="scss">
.u-input :deep(input) {
    padding: var(--u-input-padding);
}

.u-input :deep(> div) {
    padding: var(--u-input-padding-content);
}
</style>
