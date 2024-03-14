<template>
    <div class="bg-white p-6 rounded-2xl">
        <p class="text-gray-900 flex items-center">
            <span class="text-gray-900 font-bold">Balance:</span>
            <span class="ml-2 font-medium text-green-600">
                {{ useNotateThousands(user.billing.balance) }} BYN
            </span>
            <u-button
                class="ml-2"
                icon-style
                icon="Plus"
                color="green-600"
                border-width="2"
                plain
            />
        </p>

        <div class="mt-4 ">
            <p class="text-gray-900 font-bold">
                Last transactions:
            </p>
            <div class="mt-2 flex flex-col gap-3">
                <div
                    v-for="transaction in user.billing.transactions.slice(0, 4)"
                    :key="transaction.id"
                    class="flex gap-3 items-center"
                >
                    <u-icon
                        stroke-width="2px"
                        :color="transaction.amount === 0 ? 'gray-400' : transaction.amount > 0 ? 'green-600' : 'red-600'"
                        :value="transaction.amount === 0 ? 'Hashtag' : transaction.amount > 0 ? 'ArrowUp' : 'ArrowDown'"
                    />
                    <div>
                        <p class="text-gray-900 font-medium">
                            {{ useNotateThousands(transaction.amount) }} BYN
                        </p>
                        <p class="text-[13px] leading-4 text-gray-500">
                            {{ transaction.about }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useNotateThousands } from "~/composables/useNotateThousands";

const accountStore = useAccountStore()

const { user } = storeToRefs(accountStore)


</script>

<style scoped>

</style>