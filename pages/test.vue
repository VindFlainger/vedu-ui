<template>
    <div class="p-16 grid gap-3">
        <div class="p-3 border border-gray-600 border-dashed rounded w-96">
            <p class="mb-3 font-bold p-1">Лаба 4.1</p>
            <div>
                <USelect v-model="mark" :options="marks"/>
                <p>{{ markFeedback }}</p>
                <UButton
                    :disabled="!mark"
                    label="Отправить"
                    size="xs"
                    class="mt-4"
                    @click="submitMarks"
                />
            </div>
        </div>
        <div class="p-3 border border-gray-600 border-dashed rounded w-96">
            <p class="mb-3 font-bold p-1">Лаба 4.2</p>
            <div>
                <USelect v-model="weekday" :options="weekdays"/>
                <p>{{ weekdayFeedback }}</p>
                <UButton
                    :disabled="!weekday"
                    label="Отправить"
                    size="xs"
                    class="mt-4"
                    @click="submitWeekdays"
                />
            </div>
        </div>
        <div class="p-3 border border-gray-600 border-dashed rounded w-96">
            <p class="mb-3 font-bold p-1">Лаба 4.3</p>
            <div>
                <UInput
                    v-model="email.value.value"
                    type="email"
                    :conditions="[
                        ['Not valid e-mail', 'error', EmailSubmitCount && !EmailMeta.valid]
                    ]"
                />
                <p>{{emailFeedback}}</p>
                <UButton
                    :disabled="!email.value.value"
                    label="Проверить"
                    size="xs"
                    class="mt-4"
                    @click="EmailSubmit"
                />
            </div>
        </div>
        <div class="p-3 border border-gray-600 border-dashed rounded w-96">
            <p class="mb-3 font-bold p-1">Лаба 4.4</p>
            <div>
                <UInputPhone
                    v-model="phone"
                />
                <p>{{phoneFeedback}}</p>
                <UButton
                    :disabled="!phone"
                    label="Проверить"
                    size="xs"
                    class="mt-4"
                    @click="submitPhone"
                />
            </div>
        </div>
        <div class="p-3 border border-gray-600 border-dashed rounded w-[600px]">
            <p class="mb-3 font-bold p-1">Лаба 5.1</p>
            <div>
                <el-table :data="usersData" style="width: 100%">
                    <el-table-column prop="id" label="Date" width="180" />
                    <el-table-column prop="title" label="Name" width="180" />
                    <el-table-column prop="teacher" label="Address" />
                    <el-table-column prop="type" label="Address" />
                </el-table>
            </div>
        </div>
        <div class="p-3 border border-gray-600 border-dashed rounded w-[600px]">
            <p class="mb-3 font-bold p-1">Лаба 5.2</p>
            <div>
                <el-table :data="universityData" style="width: 100%">
                    <el-table-column prop="id" label="Date" width="180" />
                    <el-table-column prop="lastName" label="Name" width="180" />
                    <el-table-column prop="subject" label="Address" />
                    <el-table-column prop="mark" label="Address" />
                </el-table>
            </div>
        </div>
        <div class="p-3 border border-gray-600 border-dashed rounded w-[600px]">
            <p class="mb-3 font-bold p-1">Лаба 6</p>
            <UButton label="Запуск" @click="getDayInfo"/>
            <div>
                <p>
                    <span>Название текущего дня недели: </span>
                    <span>{{weekdayName}}</span>
                </p>
                <p>
                    <span>Номер текущего дня меясца: </span>
                    <span>{{weekdayMonthNumber}}</span>
                </p>
                <p>
                    <span>Номер текущего дня в года: </span>
                    <span>{{weekdayYearNumber}}</span>
                </p>
            </div>
        </div>
        <div class="p-3 border border-gray-600 border-dashed rounded w-[600px]">
            <p class="mb-3 font-bold p-1">Лаба 7</p>
            <UButton label="Запуск" @click="getDayInfoProxy"/>
            <div>
                <p>
                    <span>Название текущего дня недели Proxy: </span>
                    <span>{{weekdayNameProxy}}</span>
                </p>
                <p>
                    <span>Номер текущего дня меясца Proxy: </span>
                    <span>{{weekdayMonthNumberProxy}}</span>
                </p>
                <p>
                    <span>Номер текущего дня в года Proxy: </span>
                    <span>{{weekdayYearNumberProxy}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import _fetch from '~/api/handler'

definePageMeta({
    layout: 'empty'
})

const marks = [
    {
        label: 'Отлично',
        value: 'Отлично'
    },
    {
        label: 'Хорошо',
        value: 'Хорошо'
    },
    {
        label: 'Удовлетворительно',
        value: 'Удовлетворительно'
    },
    {
        label: 'Неудовлетворительно',
        value: 'Неудовлетворительно'
    },
]
const mark = ref()
const markFeedback = ref()

const submitMarks = async () => {
    markFeedback.value = await _fetch('POST', '/mocks/mark', { mark: mark.value }, undefined, { noAuth: true })
}


const weekdays = [
    {
        label: 'Sunday',
        value: 'Sunday'
    },
    {
        label: 'Monday',
        value: 'Monday'
    },
    {
        label: 'Tuesday',
        value: 'Tuesday'
    },
    {
        label: 'Wednesday',
        value: 'Wednesday'
    },
    {
        label: 'Thursday',
        value: 'Thursday'
    },
    {
        label: 'Friday',
        value: 'Friday'
    },
    {
        label: 'Saturday',
        value: 'Saturday'
    }
]
const weekday = ref()
const weekdayFeedback = ref()

const submitWeekdays = async () => {
    weekdayFeedback.value = await _fetch('POST', '/mocks/weekdays', { weekday: weekday.value }, undefined, { noAuth: true })
}


const { submitCount: EmailSubmitCount, meta: EmailMeta, handleSubmit: EmailHandleSubmit } = useForm({
    validationSchema: object({
        email: string().required("Email is required").email("Invalid email"),
    }),
});
const email = useField<string>('email' )
const emailFeedback = ref()

const EmailSubmit = EmailHandleSubmit(async ()=>{
    emailFeedback.value = await _fetch('POST', '/mocks/email', { email: email.value.value }, undefined, { noAuth: true })
})

const phone = ref()
const phoneFeedback = ref()
const submitPhone = async () => {
    phoneFeedback.value = await _fetch('POST', '/mocks/phone', { phone: phone.value }, undefined, { noAuth: true })
}

const universityData = [
    {
        id: '1',
        lastName: 'Hirzhon',
        subject: 'Math',
        mark: 12312
    },
    {
        id: '1',
        lastName: 'Hirzhon',
        subject: 'Math',
        mark: 12312
    },
    {
        id: '1',
        lastName: 'Hirzhon',
        subject: 'Math',
        mark: 12312
    },
    {
        id: '1',
        lastName: 'Hirzhon',
        subject: 'Math',
        mark: 12312
    },
]

const weekdayName = ref()
const weekdayMonthNumber = ref()
const weekdayYearNumber = ref()
const getDayInfo = async () => {
    const res = await _fetch('GET', '/mocks/day-info') as any
    weekdayName.value = res.weekday_name
    weekdayMonthNumber.value = res.weekday_month_number
    weekdayYearNumber.value = res.weekday_year_number
}

const weekdayNameProxy = ref()
const weekdayMonthNumberProxy = ref()
const weekdayYearNumberProxy = ref()

const getDayInfoProxy = async () => {
    weekdayNameProxy.value = new Date().toLocaleDateString('ru',{weekday: 'long'})
    weekdayMonthNumberProxy.value = new Date().getDate()
    weekdayYearNumberProxy.value = (()=>{
        const now = new Date() as any;
        const start = new Date(now.getFullYear(), 0, 0) as any;
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay)
    })()
}

const usersData = [
    {
        id: 1,
        title: 'Deutch',
        teacher: 'Borisovna',
        type: 'practical'
    },
    {
        id: 2,
        title: 'SAP Administator',
        teacher: 'Petrov',
        type: 'lecture'
    },
    {
        id: 3,
        title: 'Administrator',
        teacher: 'Sidorov',
        type: 'lab'
    },
    {
        id: 4,
        title: 'Web-technology',
        teacher: 'Ivanov',
        type: 'lecture'
    },
    {
        id: 5,
        title: 'Web-technology',
        teacher: 'Ivanov',
        type: 'lab'
    }
]

</script>

<style scoped>

</style>