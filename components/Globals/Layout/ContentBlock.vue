<template>
    <div ref="content" class="h-[calc(100vh-64px)] thinner-scrollbar overflow-y-scroll flex flex-col">
        <div id="action-bar" class="sticky top-16 bg-white z-[1000]"></div>
        <div class="py-4 flex justify-center grow bg-sky-50">
            <div class="max-sm:px-3 sm:w-[95%] lg:w-[90%] max-w-[1600px] min-h-[100%]">
                <NotFoundStub v-if="accessDenied"/>
                <NuxtPage v-else :class="[
                        {
                          'hidden': !hydratated
                        },
                        (route.meta.layoutClass)
                    ]"/>
                <ModalsBlock/>
                {{}}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route: any = useRoute()

export interface Props {
    maintenance?: boolean,
    accessDenied?: boolean,
    hydratated?: boolean
}

const props = withDefaults(defineProps<Props>(), {})


const layoutStore = useLayoutStore()
const { contentHeight, contentWidth } = storeToRefs(layoutStore)


const content = ref<HTMLElement>()


const handleResize = () => {
    contentHeight.value = content.value?.offsetHeight as number
    contentWidth.value = content.value?.offsetWidth as number
}

let observer: ResizeObserver
onMounted(() => {
    observer = new ResizeObserver(handleResize)
    observer.observe(content.value as HTMLElement)
})

onBeforeUnmount(() => {
    observer.disconnect()
})

</script>


<style scoped>

</style>