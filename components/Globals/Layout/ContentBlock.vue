<template>
    <div
        id="layout-content"
        ref="content"
        class="layout-content pt-[114px] h-[calc(100vh)] thinner-scrollbar overflow-y-scroll flex flex-col"
        :style="{
            marginTop: `-${headerHeight}px`,
            paddingTop: `${headerHeight}px`,
            '--topbarHeight': `${headerHeight}px`
        }"
    >
        <div id="action-bar" class="sticky bg-white z-[1000] top-0"></div>
        <div class="flex justify-center grow">
            <div class="max-sm:px-3 sm:w-[95%] lg:w-[90%] max-w-[1600px] h-full">
                <NotFoundStub v-if="accessDenied"/>
                <NuxtPage v-else :class="[
                        {
                          'hidden': !hydratated
                        },
                        (route.meta.layoutClass)
                    ]"/>
                <ModalsBlock/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route: any = useRoute()
const layoutStore = useLayoutStore()


export interface Props {
    maintenance?: boolean,
    accessDenied?: boolean,
    hydratated?: boolean
}

const props = withDefaults(defineProps<Props>(), {})


const { contentHeight, contentWidth, headerHeight } = storeToRefs(layoutStore)


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

#layout-content::-webkit-scrollbar{
    width: 4px;
    background: transparent;
}

#layout-content::-webkit-scrollbar-track {
    margin-top: var(--topbarHeight)
}

#layout-content::-webkit-scrollbar-thumb {
    margin-top: 114px;
    width: 8px;
    background: #b2b5bb;
    border-radius: 9999px;
}
</style>