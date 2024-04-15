<template>
    <div class="sticky right-0 top-0 z-[1000] flex h-16 items-center bg-primary-700 pl-4 pr-10 left-0">
        <nuxt-link :to="{name: 'home'}">
            <img
                class="ml-6 h-9"
                src="~/assets/images/big-logo.png"
            />
        </nuxt-link>
        <div class="flex ml-auto mr-6 h-full">
            <nuxt-link
                class="font-medium text-white hover:bg-primary-800 h-full flex items-center px-6"
                v-for="link in activeLinks"
                :key="link.pathName"
                :to="{ name: link.pathName }"
            >
                {{link.label}}
            </nuxt-link>
        </div>
<!--        <nuxt-link :to="{name: 'questions'}">Questions</nuxt-link>
        <button @click="account.clearAuth()">Log Out</button>-->
        <div class="flex items-center">
            <UIcon value="Bell" size="27" stroke-width="2" class="ml-6" color="white"/>
            <img
                class="ml-6 h-10 w-10"
                src="~/assets/images/previews/boy-large.png"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()

const {isInstructor, isStudent, isNewUser} = storeToRefs(accountStore)

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
        label: 'Dashboard',
        pathName: 'dashboard'
    },
    {
        label: 'News',
        pathName: 'news'
    },
    {
        label: 'Courses',
        pathName: 'find-courses'
    },
    {
        label: 'My Courses',
        pathName: 'courses'
    }
]

const instructorLinks = [
    {
        label: 'Dashboard',
        pathName: 'dashboard'
    },
    {
        label: 'News',
        pathName: 'news'
    },
    {
        label: 'Questions',
        pathName: 'questions'
    },
    {
        label: 'My Courses',
        pathName: 'courses'
    }
]

const activeLinks = computed(()=> {
    if (isInstructor.value) return instructorLinks
    else if (isStudent.value) return studentLinks
    else return newUsersLinks
})


</script>

<style scoped>
.router-link-active{
    @apply bg-primary-900
}
</style>
