declare module '#app' {
    interface NuxtApp {
        $hello (msg: string): string
    }

    interface Window{
        HubSpotConversations: any
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

declare global {
    interface Window {
        HubSpotConversations: any;
        _hsq: any
    }
}

export { }