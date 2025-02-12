export default defineNuxtPlugin(() => {
    return {
        provide: {
            copy: (v: string) => {
                navigator.clipboard.writeText(v)
            },
        },
    }
})

