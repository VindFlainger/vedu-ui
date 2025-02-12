<template>
    <div class="bg-white p-6 rounded-2xl">
        <div>
            <p class="text-2xl font-bold text-gray-800">
                Plans
            </p>
            <p class="text-sm text-gray-800">
                You can purchase one of the paid plans to unlock more features of the platform.
                Upon expiration of the plan, all entities that exceed the limit will not be deleted.
                You will be able to enjoy all the benefits of a paid subscription immediately after purchase.
            </p>
            <div class="mt-2">
                <p class="font-medium">Billed:</p>
                <u-checkbox
                    v-model="billed"
                    class="text-sm font-medium"
                    value="annually"
                    markerColor="pink-500"
                    same-checked-outline
                    radio-style
                    return-value
                >
                    <template #default>
                        <div class="flex gap-1 items-center">
                            <p>
                                Annually
                            </p>
                            <div
                                class="py-px px-1 border border-pink-500 rounded text-xs leading-4 font-bold text-pink-600">
                                2 MONTH FREE
                            </div>
                        </div>
                    </template>
                </u-checkbox>
                <u-checkbox
                    v-model="billed"
                    class="text-sm font-medium"
                    value="monthly"
                    markerColor="pink-500"
                    label="Monthly"
                    same-checked-outline
                    radio-style
                    return-value
                />
            </div>
        </div>

        <div class="flex flex-wrap mt-5 -m-3">
            <div
                v-for="plan in computedPlans"
                :key="plan.key"
                class="relative basis-[calc(50%-24px)] m-3 border-2 px-4 py-3 rounded-2xl"
                :class="{
                        'border-yellow-400/50 outline-yellow-400/50 shadow-[0_0_8px_rgb(250_204_21_/_0.2)] bg-yellow-50/10': plan.key === 'free',
                        'border-indigo-400/50 outline-indigo-400/50 shadow-[0_0_8px_rgb(129_140_248_/_0.2)] bg-indigo-50/10': plan.key === 'starter',
                        'border-purple-400/50 outline-purple-400/50 shadow-[0_0_8px_rgb(192_132_252_/_0.2)] bg-purple-50/10': plan.key === 'professional',
                        'border-pink-400/50 outline-pink-400/50 shadow-[0_0_8px_rgb(244_114_182_/_0.2)] bg-pink-50/10': plan.key === 'ultimate',
                        'outline-offset-4 outline-[2px] outline scale-[1.005]': user.billing.plan  === plan.key
                }"
            >
                <!-- NAME & PRICE & DESCRIPTION -->
                <div>
                    <p
                        class="font-bold text-[22px]"
                        :class="{
                        'text-yellow-400': plan.key === 'free',
                        'text-indigo-400': plan.key === 'starter',
                        'text-purple-400': plan.key === 'professional',
                        'text-pink-400': plan.key === 'ultimate',
                    }"
                    >
                        {{ plan.name }}
                    </p>

                    <div v-if="billed === 'annually'">
                        <p class="mt-1 font-medium text-gray-800 text-lg leading-5">{{ plan.planData.price.annual / 12 }}
                            BYN / month</p>
                        <p class="text-gray-500 text-xs leading-4">{{ plan.planData.price.annual }} BYN billed annually</p>
                    </div>
                    <div v-else>
                        <p class="mt-1 font-medium text-gray-800 text-lg leading-5">{{ plan.planData.price.monthly }} BYN /
                            month</p>
                    </div>

                    <p class="mt-3 text-sm text-gray-600 leading-4 min-h-10">
                        {{ plan.description }}
                    </p>

                    <div
                        v-if="user.billing.plan  === plan.key"
                        class="absolute right-5 top-3 font-bold text-xs bg-pink-100 px-2 pb-[3px] pt-[5px] rounded-lg
                            leading-3 text-pink-500"
                    >
                        CURRENT PLAN
                    </div>
                </div>


                <div v-if="plan.planData">
                    <!-- QUOTA -->
                    <div>
                        <div
                            v-for="quota in plan.planData.quota"
                            :key="quota.key"
                            class="flex justify-between py-1 items-center border-b"
                        >
                            <p class="text-gray-800">
                                {{ quota.name }}
                            </p>
                            <div>
                                <div
                                    v-if="quota.value && isFinite(quota.value)"
                                    class="text-right relative right-[2px] w-full"
                                >
                                    {{ quota.value }}
                                </div>
                                <div v-else class="font-bold [&_.svg]:stroke-[currentColor]">
                                    <u-icon
                                        value="mdiInfinity"
                                        color="pink-400"
                                        size="20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- ACCESS -->
                    <div>
                        <div
                            v-for="access in plan.planData.access"
                            :key="access.key"
                            class="flex justify-between py-1 items-center border-b"
                        >
                            <p class="text-gray-800">
                                {{ access.name }}
                            </p>
                            <div>
                                <u-icon
                                    v-if="access.value === false"
                                    color="red-500"
                                    value="XMark"
                                    stroke-width="2.5px"
                                    size="20"
                                />
                                <u-icon
                                    v-else-if="access.value === true"
                                    color="green-500"
                                    value="Check"
                                    stroke-width="2.5px"
                                    size="20"
                                />
                                <div
                                    class="text-right relative right-[2px] w-full"
                                    v-else-if="isFinite(access.value as number)"
                                >
                                    {{ access.value }}
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- ACTIONS -->
                    <div class="mt-6 flex justify-center" v-if="plan.planData.price && plan.key !== 'free'">
                        <u-button
                            label="Buy Plan"
                            size="md"
                            :color="useFieldPicker({
                                'yellow-400': plan.key === 'free',
                                'indigo-400': plan.key === 'starter',
                                'purple-400': plan.key === 'professional',
                                'pink-400': plan.key === 'ultimate',
                            }).value"
                            :disabled="!plan.planData.lower"
                            border-width="2"
                        />
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { plans, quota, accesses } from "~/config/plans";

const accountStore = useAccountStore()

const { user } = storeToRefs(accountStore)

const computedPlans = computed(() => {
    return plans.map(plan => {
        const planData = plansData.find(x => x.key === plan.key)
        return {
            ...plan,
            ...planData ? {
                planData: {
                    quota: quota.map(v => ({
                        value: planData.quota[v.key],
                        ...v
                    })),
                    access: accesses.map(v => ({
                        value: planData.access[v.key],
                        ...v
                    })),
                    lower: comparePlans(user.value.billing.plan, plan.key) < 0,
                    price: planData.price
                }
            } : { planData: null }
        }
    })
})

const comparePlans = (plan: string, toComparePlan: string) => {
    const planHierarchy = ['free', 'starter', 'professional', 'ultimate']
    return planHierarchy.indexOf(plan) - planHierarchy.indexOf(toComparePlan)
}

const billed = ref('annually')


/* Instructor */
const plansData: {
    key: string,
    quota: Record<string, number | null>,
    access: Record<string, boolean | number | null>,
    price: {
        monthly: number,
        annual: number
    }
}[] = [
    {
        key: 'free',
        quota: {
            courses: 1,
            questions: 50,
        },
        access: {
            course_tags: 3,
            personal_onboarding: false,
            priority_tech_support: false,
            instructors_available: false,
            lesson_materials: true,
            lesson_assignments: false,
            lesson_tests: false,
            tests_full_pack: false,
            paid_courses: false,
            private_courses: false,
            course_pinning: false,
            corporate_account: false
        },
        price: {
            monthly: 0,
            annual: 0
        }
    },
    {
        key: 'starter',
        quota: {
            courses: 3,
            questions: 200,
        },
        access: {
            course_tags: 10,
            personal_onboarding: false,
            priority_tech_support: true,
            instructors_available: 2,
            lesson_materials: true,
            lesson_assignments: true,
            lesson_tests: false,
            tests_full_pack: false,
            paid_courses: true,
            private_courses: false,
            course_pinning: false,
            corporate_account: false
        },
        price: {
            monthly: 18,
            annual: 180
        }
    },
    {
        key: 'professional',
        quota: {
            courses: 5,
            questions: 500,
        },
        access: {
            course_tags: 20,
            personal_onboarding: true,
            priority_tech_support: true,
            instructors_available: 5,
            lesson_materials: true,
            lesson_assignments: true,
            lesson_tests: true,
            tests_full_pack: false,
            paid_courses: true,
            private_courses: true,
            course_pinning: false,
            corporate_account: false
        },
        price: {
            monthly: 28,
            annual: 264
        }
    },
    {
        key: 'ultimate',
        quota: {
            courses: null,
            questions: null,
        },
        access: {
            course_tags: 50,
            personal_onboarding: true,
            priority_tech_support: true,
            instructors_available: 10,
            lesson_materials: true,
            lesson_assignments: true,
            lesson_tests: true,
            tests_full_pack: true,
            paid_courses: true,
            private_courses: true,
            course_pinning: true,
            corporate_account: true
        },
        price: {
            monthly: 36,
            annual: 348
        }
    }
]
</script>

<style scoped>

</style>