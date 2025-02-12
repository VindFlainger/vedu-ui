<template>
    <div v-if="loaded">
        <div v-if="isInstructor" class="flex pb-6 -mt-3 ">
            <u-button
                class="ml-auto mr-0"
                label="Добавить материал"
                @click="showMaterialModal = true"
            />
        </div>
        <div v-if="materials" class="flex flex-wrap gap-x-5 gap-y-8">
            <MaterialItem
                v-for="material in materials"
                :key="material.id"
                :material="material"
                @delete="handleDelete(material.id)"
                @edit="handleShowEdit(material)"
            />
        </div>
    </div>
    <div v-else class="flex flex-col items-center">
        <u-loading
            size="42"
        />
        <p class="text-primary-700 text-[13px] ml-0.5">
            Загрузка...
        </p>
    </div>

    <AddMaterialModal
        v-if="showMaterialModal"
        :edit="!!selectedMaterial"
        :description="selectedMaterial?.description"
        :file="selectedMaterial?.file"
        :course-id="route.params.course"
        :lesson-id="route.params.lesson"
        :material-id="selectedMaterial?.id"
        @close="showMaterialModal = false; selectedMaterial = null"
        @material-added="handleAdd"
        @material-edited="handleEdit"
    />
</template>

<script setup lang="ts">
import { LessonMaterial } from '~/types/lesson'
const { $api } = useNuxtApp()
const route = useRoute()
const accountStore = useAccountStore()

const { isInstructor } = storeToRefs(accountStore)

const materials = ref<LessonMaterial[] | null>(null)
const showMaterialModal = ref(false)
const loaded = ref(false)
const { loading, addLoading, removeLoading } = useLoading()
const fetch = async () => {
    try {
        addLoading()
        const res = await $api.lesson.GET_LESSON_MATERIALS({
            course_id: route.params.course as string,
            lesson_id: route.params.lesson as string
        })
        materials.value = res
        loaded.value = true
    } catch (err) {
        console.log(err)
    } finally {
        removeLoading()
    }
}

const selectedMaterial = ref<null | LessonMaterial>(null)
const handleShowEdit = (material: LessonMaterial) => {
    selectedMaterial.value = material
    showMaterialModal.value = true
}

const handleDelete = async (id: string) => {
    try {
        if (materials.value) materials.value = materials.value.filter(material => material.id !== id)
        await $api.lesson.DELETE_LESSON_MATERIAL({
            course_id: route.params.course as string,
            lesson_id: route.params.lesson as string,
            material_id: id
        })
    } catch (err){
        console.log(err)
    } finally {

    }
}

const handleAdd = (material: LessonMaterial) => {
    if (materials.value) materials.value.unshift(material)
}

const handleEdit = (material: LessonMaterial) => {
    if (materials.value) materials.value = materials.value.map(v => v.id === material.id ? material : v)
}


fetch()
</script>

