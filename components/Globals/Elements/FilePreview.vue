<template>
    <component
        :is="download ? 'a' : 'div'"
        :href="download && url"
        :download="download && name"
        class="flex flex-col items-center"
        :style="{
            width: `${iconSize + 30}px`,
        }"
    >
        <img
            :src="previewImage"
            alt=""
            :style="{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
            }"
        >
        <p v-if="!hideName" class="mt-1 line-clamp-2 text-sm text-center break-words-text leading-[16px]">
            {{ name && name.replace(/\.\w+$/, '') }}
        </p>
    </component>
</template>

<script setup lang="ts">
import doc from "~/assets/images/files/doc.png"
import jpg from "~/assets/images/files/jpg.png"
import mp3 from "~/assets/images/files/mp3.png"
import mp4 from "~/assets/images/files/mp4.png"
import pdf from "~/assets/images/files/pdf.png"
import png from "~/assets/images/files/png.png"
import ppt from "~/assets/images/files/ppt.png"
import xls from "~/assets/images/files/xls.png"

export interface Props {
    url: string,
    iconSize: number,
    name: string,
    hideName: boolean,
    download: boolean
}

const props = withDefaults(defineProps<Props>(), {
    url: "",
    iconSize: 42
})


const previewImage = computed(() => {
    const ext = props.name.match(/\.\w+$/)?.[0] || props.url.match(/\.\w+$/)?.[0]
    const formattedExt = ext ? ext.replace('.', '') : null
    if (formattedExt === 'pdf') return pdf;
    else if (formattedExt === 'doc' || formattedExt === 'docx') return doc;
    else if (formattedExt === 'jpg' || formattedExt === 'jpeg') return jpg;
    else if (formattedExt === 'mp3') return mp3;
    else if (formattedExt === 'mp4') return mp4;
    else if (formattedExt === 'png') return png;
    else if (formattedExt === 'ppt' || formattedExt === 'pptx') return ppt;
    else if (formattedExt === 'xls' || formattedExt === 'xlsx') return xls;
})

</script>

<style scoped>

</style>