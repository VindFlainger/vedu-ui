<template>
    <div>
        <div
            class="relative py-6 border-2 border-gray-400 border-dashed rounded-lg flex items-center justify-center select-none"
            ref="fileZone"
            @drop.prevent="handleDrop"
            @dragover.prevent
        >
            <template v-if="!multiple">
                <div
                    v-if="computedValue"
                    class="relative flex items-center p-4 h-[160px] group rounded-lg overflow-hidden"
                >
                    <img class="object-cover rounded-lg max-h-full" :src="(computedValue as AnyFile).image" alt="">
                    <div
                        :class="{
                        'opacity-0': ['success', 'preview'].includes((computedValue as AnyFile).status),
                        'hover:bg-black/60': !readonly
                    }"
                        class="flex items-center justify-center absolute inset-0 bg-black/50 group-hover:opacity-100 duration-150 "
                    >
                        <ULoading
                            v-if="(computedValue as AnyFile).status === 'pending'"
                            size="40"
                        />
                        <div
                            v-else-if="(computedValue as AnyFile).status === 'error'"
                            class="flex flex-col items-center justify-center gap-2"
                        >
                            <UIcon
                                class="group-hover:hidden"
                                value="ExclamationTriangle"
                                size="36"
                                color="red-600"
                            />
                            <UButton
                                class="hidden group-hover:block"
                                icon-style
                                icon="ArrowPath"
                                text-color="primary-600"
                                color="primary-600"
                                @click="handleReupload((computedValue as AnyFile).id)"
                            />
                        </div>
                        <UButton
                            v-else-if="['success', 'preview'].includes((computedValue as AnyFile).status) && !readonly"
                            icon-style
                            icon="XMark"
                            text-color="red-600"
                            color="red-600"
                            @click="handleDelete()"
                        />
                    </div>
                </div>
                <div v-else class="flex flex-col items-center text-center">
                    <UIcon value="CloudArrowDown" size="40"/>
                    <p class="font-bold">Перетащите</p>
                    <p class="text-sm text-gray-400 after:content-[''] after:">
                        или
                    </p>
                    <UButton class="mt-0.5" label="Выберите изображение" @click="handleOpen" size="xs"/>
                </div>
                <input ref="fileInput" type="file" class="hidden" @change="handleChange">
            </template>
        </div>
        <!--        <div v-if="multiple" class="flex flex-wrap gap-5 py-2 px-1 mt-2">
                    <div v-for="file in computedFiles">
                        <img class="object-cover rounded-lg" :src="file.original.src" alt="" style="aspect-ratio: 16/12">
                    </div>
                </div>-->
    </div>
</template>

<script setup lang="ts">
import upload from "~/api/upload";
import { v4 } from "uuid";
import { AnyFile } from "~/types/global";

export interface UploadFile {
    id: string
    [key: string]: string
}

export interface Props {
    multiple?: boolean
    modelValue?: UploadFile[] | UploadFile | null,
    previewValue?: string | string[]
    loading: number
    readonly: boolean
    relation: string
}

const props = withDefaults(defineProps<Props>(), {
    multiple: false,
    loading: 0,
})


const emit = defineEmits<{
    'update:modelValue': [v: Props['modelValue']]
    'update:loading': [v: Props['loading']]
    'preview-removed': []
}>()

const fileInput = ref<any>(null)
const fileZone = ref<any>(null)

const uploadingFiles = ref<any[]>([])

const computedValue = computed(() => {
    if (props.multiple) {
        return [
            ...uploadingFiles.value,
            ...Array.isArray(props.modelValue) ?
                (props.modelValue as UploadFile[]).map(file => ({
                    ...file,
                    status: 'success'
                })) : []
        ]
    } else {
        return props.modelValue ? {
            ...props.modelValue,
            status: 'success'
        } : uploadingFiles.value[0] || (props.previewValue ? {
            image: props.previewValue,
            status: 'preview'
        } : null)
    }
})


const handleOpen = () => {
    fileInput.value.click()
}

const handleDrop = (e: any) => {
    handleUpload(e.dataTransfer.files)
}

const handleChange = () => {
    handleUpload(fileInput.value.files)
    fileInput.value.value = null
}

const handleUpload = async (fileList: FileList) => {
    const ids: string[] = []
    try {
        emit('update:loading', props.loading + 1)

        uploadingFiles.value.push(...[...fileList].map(file => {
            const id = v4()
            ids.push(id)
            return {
                status: 'pending',
                name: file.name,
                id,
                image: URL.createObjectURL(file)
            }
        }))

        const formData = new FormData();

        [...fileList].map(file => {
            formData.append('images', file)
            formData.append('target', props.relation)
        })


        const files = await upload.UPLOAD_IMAGES(formData)

        if (props.multiple) {
            emit('update:modelValue', [...Array.isArray(props.modelValue) ? props.modelValue : [], ...files.map((file: any) => ({
                id: file.id,
                image: file.original.url
            }))])
        } else {
            emit('update:modelValue', {
                id: files[0].id,
                image: files[0].original.url
            })
        }

        uploadingFiles.value = uploadingFiles.value.filter(filter => !ids.includes(filter.id))
    } catch (e) {
        uploadingFiles.value = uploadingFiles.value.map(filter => !ids.includes(filter.id) ? filter : {
            ...filter,
            status: 'error'
        })
    } finally {
        emit('update:loading', props.loading - 1)
    }
}

const handleReupload = (id: string) => {

}

const handleDelete = (ids?: string[]) => {
    if (props.previewValue) emit('preview-removed')
    if (ids && Array.isArray(props.modelValue)) {
        emit('update:modelValue', props.modelValue.filter(file => !ids.includes(file.id)))
    } else {
        emit('update:modelValue', null)
    }

}

</script>