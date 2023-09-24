import auth from "~/api/auth"
import questions from "~/api/questions";

export const api = {
    Auth: auth,
    Questions: questions
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            api
        },
    }
})

