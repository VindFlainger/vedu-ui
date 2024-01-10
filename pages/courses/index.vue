<template>
    <div>
        <UCategorySelect/>
        <ActionBar>
            axcsd
        </ActionBar>
        <CoursesOverviewList
            :courses="courses"
            @manage="handleOpenEditDialog($event)"
        />
        <CourseEditDialog
            v-if="showEditDialog"
            :course="selectedCourseComputed"
            @close="handleCloseEditDialog"
        />
    </div>
</template>

<script setup lang="ts">

const selectedCourse = ref<string | null>(null)
const selectedCourseComputed = computed(() => courses.value.find(course => course.id === selectedCourse.value))
const showEditDialog = ref(false)
const handleOpenEditDialog = (courseId?: string) => {
    showEditDialog.value = true
    if (courseId) selectedCourse.value = courseId
}
const handleCloseEditDialog = () => {
    showEditDialog.value = false
    selectedCourse.value = null
}






const courses = ref([
    {
        id: 'adsad12',
        name: 'Math',
        img: `https://www.thoughtco.com/thmb/hZ8GtBSMid8OMlhZZUBFVdZRbSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-150971192-5688fe8b3df78ccc15299e02.jpg`,
        type: 'public',
        category: {
            name: 'Math',
            id: 'asdfnjksdfjk01823'
        },
        start: '2023-11-27T02:34:39.815+00:00',
        end: '2023-11-29T02:34:39.815+00:00',
        tags: [
            {
                name: 'Live math',
                id: 'ads12'
            },
            {
                name: 'Live math',
                id: 'ads112'
            },
            {
                name: 'Live math',
                id: 'ads12sd'
            },
            {
                name: 'Math DO',
                id: 'asdbbf12321'
            },
            {
                name: 'Math DO',
                id: 'asdbbf12322'
            }
        ],
        instructors: [
            {
                id: 'sdaassdfd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ],
        total_students: 1001,
        students_preview: [
            {
                id: 'sdaassdfd1qsde23',
                name: 'Alicia Webster',
                first_name: 'Alicia',
                last_name: 'Webster',
                img: `https://smartsimplemobile.typepad.com/.a/6a013480abd53b970c0162fdb999be970d-600wi`
            },
            {
                id: 'sdaasd1qe23as',
                name: 'Heidi Lopez',
                first_name: 'Heidi',
                last_name: 'Lopez',
                img: `https://avatars.mds.yandex.net/i?id=d3b1f1c855dee9f49a31bc99fe270dd2_sr-5219096-images-thumbs&n=13`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Willie Benson',
                first_name: 'Willie',
                last_name: 'Benson',
                img: `https://sun9-39.userapi.com/s/v1/ig2/vH3vgiU9xoRvpN58Grj-_hNG5sy3coOUoveeTW8SPiCXKF13feuqX4owN84-91gEO5mv8_fIC1bH2wL6L18trlZ7.jpg?size=200x200&quality=95&crop=0,22,619,619&ava=1`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ]

    },
    {
        id: 'adsa212',
        name: 'Math',
        img: `https://www.thoughtco.com/thmb/hZ8GtBSMid8OMlhZZUBFVdZRbSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-150971192-5688fe8b3df78ccc15299e02.jpg`,
        type: 'public',
        category: {
            name: 'Math',
            id: 'asdfnjksdfjk01823'
        },
        start: '2023-11-27T02:34:39.815+00:00',
        end: '2023-11-29T02:34:39.815+00:00',
        tags: [

        ],
        instructors: [
            {
                id: 'sdaassdfd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ],
        total_students: 1001,
        students_preview: [
            {
                id: 'sdaassdfd1qsde23',
                name: 'Alicia Webster',
                first_name: 'Alicia',
                last_name: 'Webster',
                img: `https://smartsimplemobile.typepad.com/.a/6a013480abd53b970c0162fdb999be970d-600wi`
            },
            {
                id: 'sdaasd1qe23as',
                name: 'Heidi Lopez',
                first_name: 'Heidi',
                last_name: 'Lopez',
                img: `https://avatars.mds.yandex.net/i?id=d3b1f1c855dee9f49a31bc99fe270dd2_sr-5219096-images-thumbs&n=13`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Willie Benson',
                first_name: 'Willie',
                last_name: 'Benson',
                img: `https://sun9-39.userapi.com/s/v1/ig2/vH3vgiU9xoRvpN58Grj-_hNG5sy3coOUoveeTW8SPiCXKF13feuqX4owN84-91gEO5mv8_fIC1bH2wL6L18trlZ7.jpg?size=200x200&quality=95&crop=0,22,619,619&ava=1`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ]

    },
    {
        id: 'adsa1d12',
        name: 'Math',
        img: `https://www.thoughtco.com/thmb/hZ8GtBSMid8OMlhZZUBFVdZRbSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-150971192-5688fe8b3df78ccc15299e02.jpg`,
        type: 'public',
        category: {
            name: 'Math',
            id: 'asdfnjksdfjk01823'
        },
        start: '2023-11-27T02:34:39.815+00:00',
        end: '2023-11-29T02:34:39.815+00:00',
        tags: [
            {
                name: 'Live math',
                id: 'ads12'
            },
            {
                name: 'Math DO',
                id: 'asdbbf12321'
            }
        ],
        instructors: [
            {
                id: 'sdaassdfd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ],
        total_students: 1001,
        students_preview: [
            {
                id: 'sdaassdfd1qsde23',
                name: 'Alicia Webster',
                first_name: 'Alicia',
                last_name: 'Webster',
                img: `https://smartsimplemobile.typepad.com/.a/6a013480abd53b970c0162fdb999be970d-600wi`
            },
            {
                id: 'sdaasd1qe23as',
                name: 'Heidi Lopez',
                first_name: 'Heidi',
                last_name: 'Lopez',
                img: `https://avatars.mds.yandex.net/i?id=d3b1f1c855dee9f49a31bc99fe270dd2_sr-5219096-images-thumbs&n=13`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Willie Benson',
                first_name: 'Willie',
                last_name: 'Benson',
                img: `https://sun9-39.userapi.com/s/v1/ig2/vH3vgiU9xoRvpN58Grj-_hNG5sy3coOUoveeTW8SPiCXKF13feuqX4owN84-91gEO5mv8_fIC1bH2wL6L18trlZ7.jpg?size=200x200&quality=95&crop=0,22,619,619&ava=1`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ]

    },
    {
        id: 'adsad7812',
        name: 'Math',
        img: `https://www.thoughtco.com/thmb/hZ8GtBSMid8OMlhZZUBFVdZRbSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-150971192-5688fe8b3df78ccc15299e02.jpg`,
        type: 'public',
        category: {
            name: 'Math',
            id: 'asdfnjksdfjk01823'
        },
        start: '2023-11-27T02:34:39.815+00:00',
        end: '2023-11-29T02:34:39.815+00:00',
        tags: [
            {
                name: 'Live math',
                id: 'ads12'
            },
            {
                name: 'Math DO',
                id: 'asdbbf12321'
            }
        ],
        instructors: [
            {
                id: 'sdaassdfd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ],
        total_students: 1001,
        students_preview: [
            {
                id: 'sdaassdfd1qsde23',
                name: 'Alicia Webster',
                first_name: 'Alicia',
                last_name: 'Webster',
                img: `https://smartsimplemobile.typepad.com/.a/6a013480abd53b970c0162fdb999be970d-600wi`
            },
            {
                id: 'sdaasd1qe23as',
                name: 'Heidi Lopez',
                first_name: 'Heidi',
                last_name: 'Lopez',
                img: `https://avatars.mds.yandex.net/i?id=d3b1f1c855dee9f49a31bc99fe270dd2_sr-5219096-images-thumbs&n=13`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Willie Benson',
                first_name: 'Willie',
                last_name: 'Benson',
                img: `https://sun9-39.userapi.com/s/v1/ig2/vH3vgiU9xoRvpN58Grj-_hNG5sy3coOUoveeTW8SPiCXKF13feuqX4owN84-91gEO5mv8_fIC1bH2wL6L18trlZ7.jpg?size=200x200&quality=95&crop=0,22,619,619&ava=1`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ]

    },
    {
        id: 'adsadcx12',
        name: 'Math',
        img: `https://www.thoughtco.com/thmb/hZ8GtBSMid8OMlhZZUBFVdZRbSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-150971192-5688fe8b3df78ccc15299e02.jpg`,
        type: 'public',
        category: {
            name: 'Math',
            id: 'asdfnjksdfjk01823'
        },
        start: '2023-11-27T02:34:39.815+00:00',
        end: '2023-11-29T02:34:39.815+00:00',
        tags: [
            {
                name: 'Live math',
                id: 'ads12'
            },
            {
                name: 'Math DO',
                id: 'asdbbf12321'
            }
        ],
        instructors: [
            {
                id: 'sdaassdfd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ],
        total_students: 1001,
        students_preview: [
            {
                id: 'sdaassdfd1qsde23',
                name: 'Alicia Webster',
                first_name: 'Alicia',
                last_name: 'Webster',
                img: `https://smartsimplemobile.typepad.com/.a/6a013480abd53b970c0162fdb999be970d-600wi`
            },
            {
                id: 'sdaasd1qe23as',
                name: 'Heidi Lopez',
                first_name: 'Heidi',
                last_name: 'Lopez',
                img: `https://avatars.mds.yandex.net/i?id=d3b1f1c855dee9f49a31bc99fe270dd2_sr-5219096-images-thumbs&n=13`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Willie Benson',
                first_name: 'Willie',
                last_name: 'Benson',
                img: `https://sun9-39.userapi.com/s/v1/ig2/vH3vgiU9xoRvpN58Grj-_hNG5sy3coOUoveeTW8SPiCXKF13feuqX4owN84-91gEO5mv8_fIC1bH2wL6L18trlZ7.jpg?size=200x200&quality=95&crop=0,22,619,619&ava=1`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ]

    },
    {
        id: 'addfsad12',
        name: 'Math',
        img: `https://www.thoughtco.com/thmb/hZ8GtBSMid8OMlhZZUBFVdZRbSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-150971192-5688fe8b3df78ccc15299e02.jpg`,
        type: 'public',
        category: {
            name: 'Math',
            id: 'asdfnjksdfjk01823'
        },
        start: '2023-11-27T02:34:39.815+00:00',
        end: '2023-11-29T02:34:39.815+00:00',
        tags: [
            {
                name: 'Live math',
                id: 'ads12'
            },
            {
                name: 'Math DO',
                id: 'asdbbf12321'
            }
        ],
        instructors: [
            {
                id: 'sdaassdfd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ],
        total_students: 1001,
        students_preview: [
            {
                id: 'sdaassdfd1qsde23',
                name: 'Alicia Webster',
                first_name: 'Alicia',
                last_name: 'Webster',
                img: `https://smartsimplemobile.typepad.com/.a/6a013480abd53b970c0162fdb999be970d-600wi`
            },
            {
                id: 'sdaasd1qe23as',
                name: 'Heidi Lopez',
                first_name: 'Heidi',
                last_name: 'Lopez',
                img: `https://avatars.mds.yandex.net/i?id=d3b1f1c855dee9f49a31bc99fe270dd2_sr-5219096-images-thumbs&n=13`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Willie Benson',
                first_name: 'Willie',
                last_name: 'Benson',
                img: `https://sun9-39.userapi.com/s/v1/ig2/vH3vgiU9xoRvpN58Grj-_hNG5sy3coOUoveeTW8SPiCXKF13feuqX4owN84-91gEO5mv8_fIC1bH2wL6L18trlZ7.jpg?size=200x200&quality=95&crop=0,22,619,619&ava=1`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ]

    },
    {
        id: 'adsad1fgh2',
        name: 'Math',
        img: `https://www.thoughtco.com/thmb/hZ8GtBSMid8OMlhZZUBFVdZRbSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-150971192-5688fe8b3df78ccc15299e02.jpg`,
        type: 'public',
        category: {
            name: 'Math',
            id: 'asdfnjksdfjk01823'
        },
        start: '2023-11-27T02:34:39.815+00:00',
        end: '2023-11-29T02:34:39.815+00:00',
        tags: [
            {
                name: 'Live math',
                id: 'ads12'
            },
            {
                name: 'Math DO',
                id: 'asdbbf12321'
            }
        ],
        instructors: [
            {
                id: 'sdaassdfd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ],
        total_students: 1001,
        students_preview: [
            {
                id: 'sdaassdfd1qsde23',
                name: 'Alicia Webster',
                first_name: 'Alicia',
                last_name: 'Webster',
                img: `https://smartsimplemobile.typepad.com/.a/6a013480abd53b970c0162fdb999be970d-600wi`
            },
            {
                id: 'sdaasd1qe23as',
                name: 'Heidi Lopez',
                first_name: 'Heidi',
                last_name: 'Lopez',
                img: `https://avatars.mds.yandex.net/i?id=d3b1f1c855dee9f49a31bc99fe270dd2_sr-5219096-images-thumbs&n=13`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Willie Benson',
                first_name: 'Willie',
                last_name: 'Benson',
                img: `https://sun9-39.userapi.com/s/v1/ig2/vH3vgiU9xoRvpN58Grj-_hNG5sy3coOUoveeTW8SPiCXKF13feuqX4owN84-91gEO5mv8_fIC1bH2wL6L18trlZ7.jpg?size=200x200&quality=95&crop=0,22,619,619&ava=1`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ]

    },
    {
        id: 'adassad12',
        name: 'Math',
        img: `https://www.thoughtco.com/thmb/hZ8GtBSMid8OMlhZZUBFVdZRbSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-150971192-5688fe8b3df78ccc15299e02.jpg`,
        type: 'public',
        category: {
            name: 'Math',
            id: 'asdfnjksdfjk01823'
        },
        start: '2023-11-27T02:34:39.815+00:00',
        end: '2023-11-29T02:34:39.815+00:00',
        tags: [
            {
                name: 'Live math',
                id: 'ads12'
            },
            {
                name: 'Math DO',
                id: 'asdbbf12321'
            }
        ],
        instructors: [
            {
                id: 'sdaassdfd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ],
        total_students: 1001,
        students_preview: [
            {
                id: 'sdaassdfd1qsde23',
                name: 'Alicia Webster',
                first_name: 'Alicia',
                last_name: 'Webster',
                img: `https://smartsimplemobile.typepad.com/.a/6a013480abd53b970c0162fdb999be970d-600wi`
            },
            {
                id: 'sdaasd1qe23as',
                name: 'Heidi Lopez',
                first_name: 'Heidi',
                last_name: 'Lopez',
                img: `https://avatars.mds.yandex.net/i?id=d3b1f1c855dee9f49a31bc99fe270dd2_sr-5219096-images-thumbs&n=13`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Willie Benson',
                first_name: 'Willie',
                last_name: 'Benson',
                img: `https://sun9-39.userapi.com/s/v1/ig2/vH3vgiU9xoRvpN58Grj-_hNG5sy3coOUoveeTW8SPiCXKF13feuqX4owN84-91gEO5mv8_fIC1bH2wL6L18trlZ7.jpg?size=200x200&quality=95&crop=0,22,619,619&ava=1`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ]

    },
    {
        id: 'adsad1dvb2',
        name: 'Math',
        img: `https://www.thoughtco.com/thmb/hZ8GtBSMid8OMlhZZUBFVdZRbSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-150971192-5688fe8b3df78ccc15299e02.jpg`,
        type: 'public',
        category: {
            name: 'Math',
            id: 'asdfnjksdfjk01823'
        },
        start: '2023-11-27T02:34:39.815+00:00',
        end: '2023-11-29T02:34:39.815+00:00',
        tags: [
            {
                name: 'Live math',
                id: 'ads12'
            },
            {
                name: 'Math DO',
                id: 'asdbbf12321'
            }
        ],
        instructors: [
            {
                id: 'sdaassdfd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ],
        total_students: 1001,
        students_preview: [
            {
                id: 'sdaassdfd1qsde23',
                name: 'Alicia Webster',
                first_name: 'Alicia',
                last_name: 'Webster',
                img: `https://smartsimplemobile.typepad.com/.a/6a013480abd53b970c0162fdb999be970d-600wi`
            },
            {
                id: 'sdaasd1qe23as',
                name: 'Heidi Lopez',
                first_name: 'Heidi',
                last_name: 'Lopez',
                img: `https://avatars.mds.yandex.net/i?id=d3b1f1c855dee9f49a31bc99fe270dd2_sr-5219096-images-thumbs&n=13`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Willie Benson',
                first_name: 'Willie',
                last_name: 'Benson',
                img: `https://sun9-39.userapi.com/s/v1/ig2/vH3vgiU9xoRvpN58Grj-_hNG5sy3coOUoveeTW8SPiCXKF13feuqX4owN84-91gEO5mv8_fIC1bH2wL6L18trlZ7.jpg?size=200x200&quality=95&crop=0,22,619,619&ava=1`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ]

    },
    {
        id: 'adsaasdd12',
        name: 'Math',
        img: `https://www.thoughtco.com/thmb/hZ8GtBSMid8OMlhZZUBFVdZRbSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-150971192-5688fe8b3df78ccc15299e02.jpg`,
        type: 'public',
        category: {
            name: 'Math',
            id: 'asdfnjksdfjk01823'
        },
        start: '2023-11-27T02:34:39.815+00:00',
        end: '2023-11-29T02:34:39.815+00:00',
        tags: [
            {
                name: 'Live math',
                id: 'ads12'
            },
            {
                name: 'Math DO',
                id: 'asdbbf12321'
            }
        ],
        instructors: [
            {
                id: 'sdaassdfd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1qe23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
                img: `https://cs.pikabu.ru/post_img/2013/05/11/5/1368254753_715169866.jpg`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ],
        total_students: 1001,
        students_preview: [
            {
                id: 'sdaassdfd1qsde23',
                name: 'Alicia Webster',
                first_name: 'Alicia',
                last_name: 'Webster',
                img: `https://smartsimplemobile.typepad.com/.a/6a013480abd53b970c0162fdb999be970d-600wi`
            },
            {
                id: 'sdaasd1qe23as',
                name: 'Heidi Lopez',
                first_name: 'Heidi',
                last_name: 'Lopez',
                img: `https://avatars.mds.yandex.net/i?id=d3b1f1c855dee9f49a31bc99fe270dd2_sr-5219096-images-thumbs&n=13`
            },
            {
                id: 'sdaasd1q1e23',
                name: 'Willie Benson',
                first_name: 'Willie',
                last_name: 'Benson',
                img: `https://sun9-39.userapi.com/s/v1/ig2/vH3vgiU9xoRvpN58Grj-_hNG5sy3coOUoveeTW8SPiCXKF13feuqX4owN84-91gEO5mv8_fIC1bH2wL6L18trlZ7.jpg?size=200x200&quality=95&crop=0,22,619,619&ava=1`
            },
            {
                id: 'sdaasd1q1e2sa3',
                name: 'Jonas Vindflainger',
                first_name: 'Jonas',
                last_name: 'Vindflainger',
            }
        ]

    },
])
</script>

<style scoped>

</style>