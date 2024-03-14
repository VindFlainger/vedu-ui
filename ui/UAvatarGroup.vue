<template>
    <div
        :style="[
            variables
        ]"
        ref="root"
        class="flex -space-x-[var(--u-avatar-group-space-size)]"
    >
        <div
            v-for="(avatar, i) in avatars"
            :key="i"
            :class="{
                'hidden': i >= showCount
            }"
        >
            <UTooltip :hide-after="0">
                <UAvatar
                    class="relative shadow-[0_0_0_1px_white] hover:!z-[9999] hover:shadow-[0_0_0_1px_white,0_0_2px_1px_var(--u-avatar-group-hover-color)]
                     hover:scale-105 cursor-pointer duration-75"
                    :first-name="avatar.firstName"
                    :last-name="avatar.lastName"
                    :image="avatar.image"
                    :color="avatar.color"
                    :size="size"
                    :style="{
                    zIndex: 100+i,
                }"
                />
                <template #content>
                    <div class="flex flex-col items-center justify-center">
                        <span>{{ avatar.firstName }}</span>
                        <span> {{ avatar.lastName }} </span>
                    </div>
                </template>
            </UTooltip>
        </div>
        <div>
            <UAvatar
                v-if="(avatars.length > showCount) || (total > avatars.length)"
                class="relative shadow-[0_0_0_1px_white] cursor-pointer duration-75 [&_span]:relative [&_span]:right-px"
                first-name="+"
                :shortcut="`+${hiddenElements > 99 ? 99 : hiddenElements }`"
                color="gray-400"
                :size="size"
                :style="{
                    zIndex: 100+avatars.length,
                }"
            />
        </div>

    </div>
</template>

<script setup lang="ts">
import UAvatar from "./UAvatar.vue";
import { ref, computed, watch, onMounted } from 'vue'
import { useSize } from "./composables/useSize";
import { useColor } from "./composables/useColor";
import UTooltip from "./UTooltip.vue";

export interface Props {
    avatars: {
        image?: string,
        firstName?: string,
        lastName?: string,
        color?: string,
        size?: string | number
    }[],
    maxShow?: number,
    /* could impact performance */
    flexShow?: boolean,
    size?: string | number,
    hoverColor?: string,
    spaceSize?: string | number,
    total?: number
}

const props = withDefaults(defineProps<Props>(), {
    avatars: () => [],
    maxShow: 5,
    size: 24,
    spaceSize: 8,
    hoverColor: 'primary-700'
})

const root = ref(null)

const { size, number: sizeNumber } = useSize(props.size)
const { size: spaceSize, number: spaceNumber } = useSize(props.spaceSize)
const { color: hoverColor } = useColor(props.hoverColor)

const variables = computed(() => ({
    '--u-avatar-group-hover-color': hoverColor.value,
    '--u-avatar-group-space-size': spaceSize.value
}))

const maxFit = ref(0)
let observer = null
const manageFlexShow = () => {
    if (props.flexShow && !observer && root) {
        observer = new ResizeObserver(() => {
            if (root.value.clientWidth) {
                maxFit.value = Math.floor(root.value.clientWidth / (sizeNumber.value - spaceNumber.value))
            }
        })
        observer.observe(root.value)
    } else if (observer) {
        observer.disconnect()
        observer = null
    }
}

const showCount = computed(() => props.flexShow ? ((props.maxShow <= maxFit.value) ? props.maxShow : maxFit.value) : props.maxShow)

const hiddenElements = computed(() => props.total ? props.total - props.avatars.length : props.avatars.length - showCount.value)

watch(() => props.flexShow, manageFlexShow)

onMounted(() => {
    manageFlexShow()
})


</script>

<style scoped>

</style>