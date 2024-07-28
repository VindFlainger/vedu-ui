<template>
    <u-dialog
        ref="modal"
        hide-header
        icon="Plus"
        max-width="500"
        padding="18px 24px"
    >
        <p class="text-xl font-extrabold text-primary-900 leading-[22px] font-nunito">
            {{ title }}
        </p>
        <p class="mt-3 text-gray-500 text-[15px] leading-[18px]">
            {{ subtitle }}
        </p>
        <el-carousel class="mt-5 overflow-hidden rounded-2xl border-[3px] border-primary-900/50" height="250px">
            <el-carousel-item
                v-for="image in images"
                :key="image"
            >
                <img :src="image" class="w-full object-cover h-[250px]"/>
            </el-carousel-item>
        </el-carousel>
        <p class="mt-3 text-[15px] leading-[20px]" v-html="content"/>
        <p class="mt-3 text-right text-sm font-medium capitalize text-gray-400 font-nunito">
            Опубликовано: {{ $luxon.fromISO(createdAt).toFormat('LLL d, yyyy') }}
        </p>
    </u-dialog>
</template>

<script setup lang="ts">
export interface Props {
    title: string
    subtitle: string
    content: string
    images?: string[]
    createdAt: string
}

const props = withDefaults(defineProps<Props>(), {
    images: () => []
})
</script>

<style scoped>

</style>