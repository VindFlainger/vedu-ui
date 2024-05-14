<template>
    <div>
        <div
            class="relative py-6 border-2 border-gray-400 border-dashed rounded-lg flex items-center justify-center select-none"
            ref="fileZone"
            @drop.prevent="handleDrop"
            @dragover.prevent
        >
            <div
                v-if="computedFiles.length && !multiple"
                class="relative flex items-center p-4 h-[160px] group rounded-lg overflow-hidden"
            >
                <img class="object-cover rounded-lg max-h-full" :src="computedFiles[0].image" alt="">
                <div
                    :class="{
                        'opacity-0': computedFiles[0].status === 'success',
                        'hover:bg-black/60': !readonly
                    }"
                    class="flex items-center justify-center absolute inset-0 bg-black/50 group-hover:opacity-100 duration-150 "
                >
                    <ULoading
                        v-if="computedFiles[0].status === 'pending'"
                        size="40"
                    />
                    <div
                        v-else-if="computedFiles[0].status === 'error'"
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
                            plain
                            text-color="primary-600"
                            color="primary-600"
                            @click="handleReupload(computedFiles[0].id)"
                        />
                    </div>
                    <UButton
                        v-else-if="computedFiles[0].status === 'success' && !readonly"
                        icon-style
                        icon="XMark"
                        plain
                        text-color="red-600"
                        color="red-600"
                        @click="handleDelete(computedFiles[0].id)"
                    />
                </div>
            </div>
            <input ref="fileInput" type="file" class="hidden" @change="handleChange">
            <div v-if="multiple || !computedFiles.length" class="flex flex-col items-center text-center">
                <UIcon value="CloudArrowDown" size="40"/>
                <p class="font-bold">Drag and Drop</p>
                <p class="text-sm text-gray-400 after:content-[''] after:">
                    or
                </p>
                <UButton class="mt-0.5" label="Browse Files" @click="handleOpen" size="xs"/>
            </div>
        </div>
        <div v-if="multiple" class="flex flex-wrap gap-5 py-2 px-1 mt-2">
            <div v-for="file in computedFiles">
                <img class="object-cover rounded-lg" :src="file.original.src" alt="" style="aspect-ratio: 16/12">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import upload from "~/api/upload";
import { v4 } from "uuid";

export interface Props {
    multiple?: boolean
    files: {
        name: string
        id: string
        [key: string]: string
    }[],
    loading: number
    readonly: boolean
    relation: string
}

const props = withDefaults(defineProps<Props>(), {
    multiple: false,
    loading: 0,
    files: () => []
})

const emit = defineEmits<{
    'update:files': [v: Props['files']]
    'update:loading': [v: Props['loading']]
}>()

const fileInput = ref<any>(null)
const fileZone = ref<any>(null)

const uploadingFiles = ref<any[]>([])

const computedFiles = computed(() => {
    return [
        ...uploadingFiles.value,
        ...props.files.map(file => ({
            ...file,
            status: 'success',
        }))
    ]
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
        emit('update:files', [...props.files, ...files.map((file: any) => ({
            name: file.name,
            id: file.id,
            image: file.original.url
        }))])
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

const handleDelete = (ids: string[]) => {
    emit('update:files', props.files.filter(file => !ids.includes(file.id)))
}

</script>

<!--

<template>
    <div>
        <div
            class="relative py-6 border-2 border-gray-400 border-dashed rounded-lg flex items-center justify-center select-none"
            ref="fileZone"
            @drop.prevent="handleDrop"
            @dragover.prevent
        >
            <div v-if="computedFiles.length && !multiple" class="relative h-[160px] group rounded-lg overflow-hidden">
                <img class="object-cover rounded-lg max-h-full" :src="computedFiles[0].src" alt="">
                <div
                    :class="{'opacity-0': computedFiles[0].status === 'success'}"
                    class="flex items-center justify-center absolute inset-0 group-hover:opacity-100 bg-black/50 hover:bg-black/60 duration-150 "
                >
                    <ULoading
                        v-if="computedFiles[0].status === 'pending'"
                        size="40"
                    />
                    <div v-else-if="computedFiles[0].status === 'error'" class="flex flex-col items-center justify-center gap-2">
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
                            plain
                            text-color="primary-600"
                            color="primary-600"
                            @click="handleReupload(computedFiles[0].id)"
                        />
                    </div>
                    <UButton
                        v-else-if="computedFiles[0].status === 'success'"
                        icon-style
                        icon="XMark"
                        plain
                        text-color="red-600"
                        color="red-600"
                        @click="handleDelete(computedFiles[0].id)"
                    />
                </div>
                <p v-if="!images"></p>
            </div>
            <input ref="fileInput" type="file" class="hidden" @change="handleChange">
            <div v-if="multiple || !computedFiles.length" class="flex flex-col items-center text-center" >
                <UIcon value="CloudArrowDown" size="40"/>
                <p class="font-bold">Drag and Drop</p>
                <p class="text-sm text-gray-400 after:content-[''] after:">
                    or
                </p>
                <UButton class="mt-0.5" label="Browse Files"  @click="handleOpen" size="xs"/>
            </div>
        </div>
        <div v-if="multiple" class="grid grid-cols-4 gap-3 py-2 px-1 mt-2">
            <div v-for="file in computedFiles">
                <img class="object-cover rounded-lg" :src="file.src" alt="" style="aspect-ratio: 16/12">
                <p v-if="!images"></p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import upload from "~/api/upload";
import { v4 } from "uuid";

export interface Props {
    images?: boolean,
    multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    images: false,
    multiple: false
})

const fileInput = ref<any>(null)
const fileZone = ref<any>(null)

const files = ref<any[]>([])

const computedFiles = computed(()=>{
    return files.value.map(file => ({
        ...file,
        src: URL.createObjectURL(file.file)
    }))
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
    files.value.push(...[...fileList].map(file => {
        const id = v4()
        ids.push(id)
        return {
            file,
            status: 'pending',
            id
        }
    }))

    const formData = new FormData();

    [...fileList].map(file => {
        formData.append('images', file)
    })

    formData.append('target', 'course-cover')

    try {
        await upload.UPLOAD_IMAGES(formData)
        files.value = files.value.map(file => ({...file, status: 'success'}))
    } catch (e){
        console.log(e)
        files.value = files.value.map(file => ({...file, status: 'error'}))
    }
}

const handleReupload = (id: string) => {

}

const handleDelete = (id: string) => {
    files.value = files.value.filter(file => file.id !== id)
}

</script>

<style scoped>

</style>-->
