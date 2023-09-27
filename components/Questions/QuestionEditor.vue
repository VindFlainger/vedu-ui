<template>
    <div class="editor">
        <QuillEditor toolbar="full" :modules="modules"/>
    </div>
</template>


<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { QuillEditor } from "@vueup/vue-quill";
// @ts-ignore
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter"


const modules = ref({
    name: 'blotFormatter',
    module: BlotFormatter,
})

</script>


<style scoped>
.editor :deep(.ql-editor) {
    @apply h-[300px]
}

.editor :deep(.ql-toolbar) {
    @apply rounded-t-lg
}

.editor :deep(.ql-container) {
    @apply rounded-b-lg
}

.editor :deep(.ql-video) {
    @apply hidden
}
</style>