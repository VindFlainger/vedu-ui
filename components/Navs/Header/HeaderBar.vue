<template>
    <div
        class="sticky top-0 right-0 left-0 z-[1000]
            px-4 md:px-8 xl:px-16 py-4 2xl:px-32 2xl:py-8 mr-2"
        ref="header"
        :class="{
             '!py-2 sm:!py-4 !px-3 sm:!px-6 xl:!px-12 2xl:!px-24 2xl:!py-4': scrolled
        }"
    >
        <div
            class="flex w-full items-center max-lg:justify-between"
            :class="{
                'rounded-[24px] bg-gray-100 py-3 px-4 border-[6px] border-white outline  outline-1 outline-gray-300': scrolled
            }"
        >

            <nuxt-link
                class="max-lg:hidden"
                :to="{name: 'home'}"
            >
                <img
                    class="ml-6 h-9"
                    src="~/assets/images/big-logo.png"
                />
            </nuxt-link>


            <u-button
                icon-style
                icon="Bars3"
                stroke-width="2"
                class="lg:hidden"
                size="lg"
                @click="router.push({
                    name: 'notifications'
                })"
            />

            <nuxt-link
                class="ml-3 lg:hidden"
                :to="{name: 'home'}"
            >
                <img
                    class="h-7"
                    src="~/assets/images/big-logo.png"
                />
            </nuxt-link>


            <!-- TABS -->
            <div
                class="hidden lg:flex mr-6 ml-auto bg-[#F9F9F9] py-4 2xl:py-6 px-4 2xl:px-6 rounded-full"
                :class="{
                    'bg-white !py-2 2xl:!py-2.5 !px-3 2xl:!px-4': scrolled
                }"
            >
                <nuxt-link
                    class="relative flex items-center px-6 text-lg font-semibold font-nunito hover:text-primary-500"
                    v-for="link in activeLinks"
                    :key="link.pathName"
                    :to="{ name: link.pathName }"
                    active-class="!text-primary-700"
                >
                    {{ link.label }}
                </nuxt-link>
            </div>


            <!-- ACTIONS -->
            <div v-if="user" class="max-lg:mr-0 max-lg:ml-auto flex items-center">
                <u-button
                    icon-style
                    icon="Bell"
                    stroke-width="2"
                    class="ml-3 lg:ml-4"
                    size="lg"
                    @click="router.push({
                    name: 'notifications'
                })"
                />
                <SizedAvatar
                    :avatar="user.avatar"
                    class="ml-3 lg:ml-4"
                    rounded
                    :size="$getBreakpointValue({
                    base: 36,
                    lg: 40
                })"
                    src="~/assets/images/previews/boy-large.png"
                />
            </div>
            <div v-else class="ml-10">
                <u-button
                    label="Регистрация"
                    size="xl"
                    font-weight="700"
                />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const layoutStore = useLayoutStore()
const router = useRouter()

const { isInstructor, isStudent, user } = storeToRefs(accountStore)

const { headerHeight } = storeToRefs(layoutStore)

const newUsersLinks = [
    {
        label: 'Home',
        pathName: 'home'
    },
    {
        label: 'News',
        pathName: 'news'
    },
    {
        label: 'Courses',
        pathName: 'find-courses'
    }
]

const studentLinks = [
    {
        label: 'Статистика',
        pathName: 'dashboard'
    },
    {
        label: 'Новости',
        pathName: 'news'
    },
    {
        label: 'Поиск курсов',
        pathName: 'find-courses'
    },
    {
        label: 'Мои курсы',
        pathName: 'courses'
    }
]

const instructorLinks = [
    {
        label: 'Статистика',
        pathName: 'dashboard'
    },
    {
        label: 'Новости',
        pathName: 'news'
    },
    {
        label: 'База вопросов',
        pathName: 'questions'
    },
    {
        label: 'Мои курсы',
        pathName: 'courses'
    }
]

const activeLinks = computed(() => {
    if (isInstructor.value) return instructorLinks
    else if (isStudent.value) return studentLinks
    else return newUsersLinks
})


const scrolled = ref(false)
let content = document.querySelector('#layout-content')

const checkScrolled = (e: Event) => {
    (e.target as HTMLElement).scrollTop > 0 ? scrolled.value = true : scrolled.value = false
}

let observer: ResizeObserver | null = null
const header = ref<HTMLElement | null>(null)


const handleResize = () => {
    if (header.value) {
        headerHeight.value = header.value.clientHeight
    }
}

onMounted(() => {
    if (content) content.addEventListener('scroll', checkScrolled)
    observer = new ResizeObserver(handleResize)
    handleResize()
    if (header.value) observer.observe(header.value)
})

onBeforeUnmount(() => {
    if (content) content.removeEventListener('scroll', checkScrolled)
    if (observer) observer.disconnect()
})

</script>
