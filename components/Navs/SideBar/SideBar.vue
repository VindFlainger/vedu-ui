<template>
    <div
        class="fixed left-0 top-0 z-[999] flex h-full w-60 flex-col self-stretch bg-gray-500 selection:bg-none"
        :class="{ '!w-16': collapsed }"
    >
        <div :class="[collapsed ? 'px-1' : 'px-2']">
            <div
                class="flex h-16 items-center"
                :class="[collapsed ? 'flex-col  justify-center' : 'pl-3']"
            >
                <img
                    src="~/assets/images/logo.png"
                    :class="[collapsed ? 'h-8 w-8' : 'h-10 w-10']"
                />
                <nuxt-link
                    to="/"
                    draggable="true"
                    class="text-white"
                    :class="[
                        collapsed
                            ? 'text-sm font-bold'
                            : 'ml-3 text-lg font-black ',
                    ]"
                    >Vedu.
                </nuxt-link>
            </div>
            <nav>
                <ul :class="{ 'flex flex-col items-center': collapsed }">
                    <nuxt-link
                        v-for="item in instructorMenu"
                        :key="item.value"
                        class="relative flex items-center py-4"
                        active-class="bg-white/20 rounded-lg"
                        :class="[collapsed ? 'w-full justify-center' : 'px-2']"
                        :to="{ name: item.value }"
                    >
                        <UIcon
                            :value="item.icon"
                            size="30"
                            :stroke-width="1"
                            class="!text-white"
                        />
                        <span
                            v-if="!collapsed"
                            class="ml-3 text-lg text-white"
                            >{{ item.label }}</span
                        >
                        <div
                            v-if="item.count"
                            class="flex items-center justify-center font-bold"
                            :class="[
                                collapsed
                                    ? 'absolute right-[2px] top-[2px] h-[25px] w-[25px] rounded-full bg-green-100 text-xs text-green-900'
                                    : 'ml-auto mr-0 h-7 w-7 rounded-full bg-green-100 text-xs text-green-900',
                            ]"
                        >
                            <span class="relative left-px top-px">
                                {{ item.count > 99 ? '99+' : item.count }}
                            </span>
                        </div>
                    </nuxt-link>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import UIcon from '~/ui/UIcon.vue'
import { useLayoutStore } from '~/store/Layout'

const layoutStore = useLayoutStore()

const { collapsed } = storeToRefs(layoutStore)

const instructorMenu = [
    {
        label: 'Dashboard',
        value: 'dashboard',
        icon: 'CommandLine',
    },
    {
        label: 'Classrooms',
        value: 'classrooms',
        icon: 'Briefcase',
    },
    {
        label: 'Questions',
        value: 'questions',
        icon: 'CircleStack',
        count: 100,
    },
    {
        label: 'Upcoming',
        value: 'upcoming',
        icon: 'Fire',
    },
]
</script>
