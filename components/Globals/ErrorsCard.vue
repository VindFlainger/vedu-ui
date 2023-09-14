<template>
    <div v-if="errors" class="border border-red-700 p-2 rounded-lg">
        <div
            v-for="error in errors"
            :key="error.message"
            class="text-red-700 text-sm flex items-center mb-2 last:mb-0"
            :title="error.message"
        >
           <UIcon
               value="ExclamationCircle"
               color="red-700"
               size="18"
           />
                <span class="ml-1 line-clamp-2">{{ error.message }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
export interface Props{
    errors?: {
        message: string,
        code: number,
        stack?: string
    }[] | null
}

const props = withDefaults(defineProps<Props>(), {
    errors: () => []
})
</script>

<style scoped>

</style>