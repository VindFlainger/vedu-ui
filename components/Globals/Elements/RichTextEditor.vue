<template>
    <div
        class="editor [&_.ql-toolbar]:!rounded-t-lg [&_.ql-container]:!rounded-b-lg [&_.ql-container]:border [&_.ql-container]:border-t-0"
        :class="[errorState?'[&_.ql-toolbar]:!border-red-500 [&_.ql-container]:!border-red-500':'[&_.ql-toolbar]:!border-gray-400 [&_.ql-container]:!border-gray-400']"
        :style="{'--rich-text-editor-height': `${height}px`}"
    >
        <QuillEditor
            toolbar="full"
            :modules="modules"
            :content="modelValue"
            :placeholder="placeholder as string"
            content-type="html"
            @update:content="emit('update:modelValue', $event)"
        />
    </div>
</template>


<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import { QuillEditor } from "@vueup/vue-quill";
// @ts-ignore
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter"
// @ts-ignore
import ImageUploader from "quill-image-uploader/src/quill.imageUploader";

export interface Props {
    modelValue?: string,
    errorState?: boolean,
    placeholder?: string,
    height: number
}

const props = withDefaults(defineProps<Props>(), {
    height: 300
})

const emit = defineEmits<{
    'update:modelValue': [v: Props['modelValue']]
}>()


const modules = ref([
    {
        name: 'blotFormatter',
        module: BlotFormatter,
    },
    {
        name: 'imageUploader',
        module: ImageUploader,
        options: {
            upload: (file: any) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
                        );
                    }, 3500);
                });
            }
        }
    }
])


</script>


<style scoped lang="scss">
.editor :deep(.ql-editor) {
    height: var(--rich-text-editor-height);
}

.editor :deep(.ql-video) {
    @apply hidden
}

.editor :deep(.ql-editor.ql-blank::before){
    @apply not-italic text-sm
}
</style>