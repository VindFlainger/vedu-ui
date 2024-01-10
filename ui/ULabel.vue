<template>
    <p
        v-if="props.label"
        class="font-medium text-base flex items-center"
        :style="{ color: textColor }"
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

export interface Props {
    label?: string,
    required?: boolean,
    description?: string,
    questionIndicatorColor?: string,
    textColor?: string
}

const props = withDefaults(defineProps<Props>(), {
    questionIndicatorColor: 'primary-800',
    textColor: 'black',
})

const { color: questionIndicatorColor } = useColor(props.questionIndicatorColor)
const { color } = useColor(props.textColor)

</script>

<style scoped>

</style>