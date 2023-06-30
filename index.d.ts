declare module '#app' {
    interface NuxtApp {
        $hello (msg: string): string
    }
}
declare module 'vue' {
    interface PluginInjection {
        $hello (msg: string): string
    }
}


declare module '@vue/runtime-core' {
    interface PluginInjection {
        $hello (msg: string): string
    }
}
export { }