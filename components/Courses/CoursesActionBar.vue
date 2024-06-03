<template>
    <div>
        <div>
            <u-button
                icon="Plus"
                icon-style
                size="md"
                label="Создать курс"
                font-size="14"
                font-weight="500"
                @click="emit('create')"
            />

        </div>

    </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    'create': []
}>()

</script>