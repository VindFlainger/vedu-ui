<template>
    <div class="relative rounded-lg overflow-hidden bg-gray-100">
        <div
            v-if="type==='increase'"
            class="absolute bottom-0 top-0 bg-gray-100 duration-300 ease-linear w-full"
            :style="[{'left': `${progress-100}%`}, styles]"
        />
        <div
            v-else-if="type === 'linear'"
            class="absolute bottom-0 top-0 bg-gray-100 duration-300 ease-linear w-full progress-linear invert"
            :style="[{'left': `${progress-100}%`}]"
        >
        </div>
    </div>
</template>

<script setup lang="ts">
export interface Props {
    value?: number,
    max?: number,
    type?: 'linear' | 'increase'
}

const props = withDefaults(defineProps<Props>(), {
    max: 100,
    value: 0,
    type: 'linear'
})

const progress = computed(() => {
    const progress = (props.value / props.max) * 100
    return progress > 100 ? 100 : progress
})

const styles = computed(()=>({
    'background': `linear-gradient(113deg, rgba(26, 214, 26, 1) ${100-progress.value}%, rgba(223, 224, 24, 1) ${143-progress.value}%, rgba(241, 12, 113, 1) ${200-progress.value}%)`
}))


</script>

<style scoped>
.progress-linear {
    background: url("@/ui/assets/images/stacked-peaks-haikei.svg") 0 0 / auto 100%;
}
</style>