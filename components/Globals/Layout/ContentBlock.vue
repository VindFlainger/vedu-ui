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
        <div id="action-bar" class="sticky top-0 right-0 left-0 z-[1000]"/>

        <div class="flex grow justify-center">
            <div class="h-full max-sm:px-3 max-w-[1600px] w-[calc(100%-12px)] sm:w-[95%] lg:w-[90%]">
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


const { contentHeight, contentWidth, headerHeight, contentScrolled } = storeToRefs(layoutStore)


const content = ref<HTMLElement>()

const checkScrolled = (e: Event) => {
    (e.target as HTMLElement).scrollTop > 0 ? contentScrolled.value = true : contentScrolled.value = false
}

const handleResize = () => {
    contentHeight.value = content.value?.offsetHeight as number
    contentWidth.value = content.value?.offsetWidth as number
}

let observer: ResizeObserver
onMounted(() => {
    observer = new ResizeObserver(handleResize)
    observer.observe(content.value as HTMLElement)
    content.value!.addEventListener('scroll', checkScrolled)
})

onBeforeUnmount(() => {
    observer.disconnect()
    content.value!.removeEventListener('scroll', checkScrolled)
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