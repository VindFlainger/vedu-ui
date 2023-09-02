// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@pinia/nuxt', '@element-plus/nuxt', '@nuxtjs/i18n'],
  plugins: ['~/plugins/icons.ts'],
  devServer: {
    port: 8080
  },
  imports: {
    presets: [
      {
        from: 'vee-validate',
        imports: ['useField', 'useForm']
      },
      {
        from: 'yup',
        imports: ['string', 'object']
      },
    ],
    dirs: ['stores']
  },
  // @ts-ignore
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia',
      'storeToRefs',
      ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
    ]
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    },
    {
      path: '~/ui',
      pathPrefix: false
    }
  ],
  css: ['~/assets/styles/main.css', '~/ui/assets/globals.css']
});
