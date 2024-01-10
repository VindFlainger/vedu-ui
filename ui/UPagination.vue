<template>
    <client-only>
        <div class="flex items-center rounded-lg" v-bind="$attrs">
            <USelect
                class="w-[58px] [&_input]:text-center"
                :options="perPageOptions"
                :model-value="perPage"
                placeholder=" "
                size="xs"
                label-name="value"
                color="primary-700"
                @update:model-value="handlePerPageChange"
            />
            <p class="text-gray-500 text-sm ml-4">
                Showing {{ from }} to {{ to }} of {{ count }}
            </p>
            <div class="mr-0 ml-auto flex items-center gap-2">
                <UButton icon-style icon="ArrowLeft" @click="handlePageChange(-1)"></UButton>
                <UInput
                    v-model.number="lazyPage"
                    :number-appearance="false"
                    :min="min"
                    :max="max"
                    input-class="[&_input]:!text-center"
                    class="w-12 text-center"
                    size="xs"
                    type="number"
                    color="primary-700"
                    @change-number="emit('update:page', lazyPage > 0?lazyPage.value:1)"
                />
                <UButton icon-style icon="ArrowRight" @click="handlePageChange(1)"></UButton>
            </div>
        </div>
    </client-only>
</template>

<script setup lang="ts">
defineOptions({
    inheritAttrs: false
})

export interface Props {
    page?: number,
    perPage?: number,
    count?: number
}

const props = withDefaults(defineProps<Props>(), {
    page: 1,
    perPage: 15,
    count: 0
})


const emit = defineEmits<{
    'update:page': [v: Props['page']],
    'update:perPage': [v: Props['perPage']],
    'update:count': [v: Props['count']],
}>()

const from = computed(() => (props.page - 1) * props.perPage)
const to = computed(() => (props.page * props.perPage) > props.count ? props.count : props.page * props.perPage)
const min = computed(()=> 1)
const max = computed(()=> Math.ceil(props.count / props.perPage) || 1)

const lazyPage = ref(props.page)
watch(() => props.page, v => lazyPage.value = v)

const handlePageChange = (i: 1 | -1) => {
    const newPage = props.page + i
    if (newPage <= max.value && newPage >= min.value) emit('update:page', newPage)
}

const perPageOptions = ref([
    {
        value: 15
    },
    {
        value: 30
    },
    {
        value: 50
    }
])

const handlePerPageChange = (v: number) => {
    emit('update:page', 1)
    emit('update:perPage', v)
}


</script>