import auth from "~/api/auth"

export const api = {
    Auth: auth
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            api
        },
    }
})

