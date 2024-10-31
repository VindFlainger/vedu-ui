<template>
    <p
        v-if="props.label"
        class="font-medium text-base flex items-center"
        :style="{ color: _textColor, fontSize: _fontSize }"
    >
        {{ props.label }}
        <span class="text-red-500 font-bold inline-block ml-px" v-if="required">*</span>
        <UTooltip v-if="description" :content="description" placement="top" >
            <UIcon value="QuestionMarkCircle" size="16" :color="questionIndicatorColor" class="ml-[2px] saturate-150 brightness-[90%]" solid/>
        </UTooltip>
    </p>
</template>

<script setup lang="ts">
import UIcon from "~/ui/UIcon.vue";
import { useColor } from "~/ui/composables/useColor";
import { useSize } from "./composables/useSize";

export interface Props {
    label?: string,
    required?: boolean,
    description?: string,
    questionIndicatorColor?: string,
    textColor?: string
    fontSize?: string | number
}

const props = withDefaults(defineProps<Props>(), {
    questionIndicatorColor: 'primary-700',
    textColor: 'black',
    fontSize: 16
})

const { color: questionIndicatorColor } = useColor(() => props.questionIndicatorColor)
const { color: _textColor } = useColor(() => props.textColor)
const { size: _fontSize } = useSize(() => props.fontSize)


</script>

<style scoped>

</style>