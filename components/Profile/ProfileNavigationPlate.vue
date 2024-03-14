<template>
    <div class="bg-white p-6 rounded-2xl">
        <div class="px-8">
            <sized-avatar
                class="shadow-[0_0_0_4px_white,0_0_0_7px_#ec4899] rounded-full"
                :avatar="user.avatar"
                :size="150"
                rounded
            />
            <div class="mt-5">
                <p class="text-center font-bold text-gray-800">
                    {{ user.personal_data.first_name }}
                    {{ user.personal_data.last_name }}
                </p>
                <p class="text-sm mt-3 text-center font-medium text-gray-500">
                    {{ user.personal_data.country.name }}
                </p>
            </div>
        </div>
        <div class="relative mt-8 flex flex-col">
            <div class="flex justify-center border-b border-t border-primary-500/50">
                <div class="flex flex-col gap-2 py-3 w-[175px]">
                    <u-button
                        v-for="entity in navigationStatic"
                        class="[&_.u-button-left-icon-wrapper]:!mr-2 w-fit"
                        color="gray-700"
                        :left-icon-props="{
                            size: 16,
                            solid: true,
                        }"
                        :left-icon="entity.icon"
                        text
                    >
                        <p>
                            {{entity.name}}
                            <span v-if="entity.value" class="text-xs leading-6 ml-0.5 font-semibold">({{entity.value > 99 ? '99+' : entity.value}})</span>
                        </p>
                    </u-button>
                </div>
            </div>


            <div class="flex justify-center">
                <div class="flex flex-col gap-2 py-3 w-[175px]">
                    <u-button
                        v-for="entity in navigationDynamic"
                        class="[&_.u-button-left-icon-wrapper]:!mr-2 w-fit"
                        color="gray-700"
                        :left-icon-props="{
                            size: 16,
                            solid: true
                        }"
                        :label="`${entity.name}${entity.value ? ` (${entity.value})`:''}`"
                        :left-icon="entity.icon"
                        text
                    >
                        <p>
                            {{entity.name}}
                            <span v-if="entity.value" class="text-green-600 text-xs leading-6 ml-0.5 font-semibold">({{entity.value > 99 ? '99+' : entity.value}})</span>
                        </p>
                    </u-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()

const { user } = storeToRefs(accountStore)

const navigationStatic = computed(() => [
    {
        icon: 'AcademicCap',
        name: 'Courses',
        value: user.value.statistic.courses_count
    },
    {
        icon: 'QuestionMarkCircle',
        name: 'Questions',
        value: user.value.statistic.questions_count
    },
    {
        icon: 'DocumentText',
        name: 'Materials',
        value: user.value.statistic.materials_count
    }
])


const navigationDynamic = computed(() => [
    {
        icon: 'ChatBubbleBottomCenterText',
        name: 'Responses',
        value: user.value.statistic.responses_count
    },
    {
        icon: 'Bell',
        name: 'Notifications',
        value: user.value.statistic.notifications_count
    }
])
</script>

<style scoped>

</style>