import api from '~/api/index'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            api
        },
    }
})

