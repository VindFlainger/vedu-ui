<template>
    <u-dialog
        ref="modal"
        hide-header
        icon="Plus"
        max-width="500"
        padding="18px 24px"
    >
        <p class="font-bold text-xl text-primary-900 leading-[22px]">
            {{ title }}
        </p>
        <p class="mt-1 text-gray-500 text-sm leading-[18px]">
            {{ subtitle}}
        </p>
        <el-carousel class="mt-5 border-[3px] overflow-hidden border-primary-900/50 rounded-2xl" height="250px">
            <el-carousel-item
                v-for="image in images"
                :key="image"
            >
                <img :src="image" class="h-[250px] object-cover w-full"/>
            </el-carousel-item>
        </el-carousel>
        <p class="mt-3 text-[15px] leading-[20px]" v-html="content"/>
        <p class="mt-3 text-sm text-primary-900 font-medium capitalize text-right">
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