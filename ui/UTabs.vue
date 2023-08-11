<template>
    <div class="inline-block relative">
        <div class="flex">
            <div
                v-for="(tab) in tabs"
                :key="tab.label"
                class="group relative py-2 duration-75 after:absolute after:left-0 after:top-[calc(100%+1px)] after:h-[1px] after:w-full after:animate-[expand_.2s_ease-in-out] after:bg-gray-300 after:content-['']"
                style="box-sizing: border-box"
                :class="{ active: tab.value === modelValue }"
                :style="{ width: `${tabWidth}px` }"
                @click="emits('update:modelValue', tab.value)"
            >
                <slot name="label">
                    <div class="flex justify-center">
                        <UElIcon
                            v-if="tab.icon"
                            class="mr-2 p-[2px] !text-gray-600 duration-75 group-[.active]:!text-black"
                            :value="tab.icon"
                        />
                        <p
                            class="font-medium text-gray-600 group-[.active]:text-black"
                        >
                            {{ tab.label }}
                        </p>
                    </div>
                </slot>
            </div>
        </div>
        <div
            v-if="activeIndex !== -1"
            class="absolute h-[2px] bg-black duration-75"
            :style="{width: `${100/(tabs?.length)}%`, left: `${(100/(tabs?.length) * (activeIndex))}%`}"
        />
    </div>
</template>

<script setup lang="ts">
import UElIcon from '~/ui/UElIcon.vue'

interface Tab {
    icon?: string;
    label: string;
    value?: string | number;
}

export interface Props {
    tabs?: Tab[]
    modelValue?: string | number
    tabWidth?: string | number
}

const emits = defineEmits<{
    'update:modelValue': [modelValue: Props['modelValue']]
}>()

const props = withDefaults(defineProps<Props>(), {
    tabs: () => [],
    tabWidth: 274,
})


const activeIndex = computed(()=>{
    return props.tabs.findIndex(tab => tab.value === props.modelValue)
})

</script>
