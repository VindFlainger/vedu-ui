export default defineNuxtPlugin((nuxtApp: any) => {

    window.hsConversationsSettings = {
        loadImmediately: false
    };

    useHead({
        script: [
            {
                src: '//js-na1.hs-scripts.com/44559667.js',
                async: true,
                defer: true,
                id: 'hs-script-loader'
            }
        ]
    })

})

