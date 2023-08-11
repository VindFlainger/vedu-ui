import resolveConfig from 'tailwindcss/resolveConfig'


const config = resolveConfig({
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './ui/**/*.vue',
        './stories/**/*.stories.js',
    ],
    theme: {
        extend: {
            colors: {
                'regal-blue': '#243c5a',
                'regal-green': '#43833e',
                'primary': {700: '#49BBBD'},
            },
        },
    },
    plugins: [],
    darkMode: 'class',
}) as any

export type Metrics = Record<string, string>

export const rounded : Metrics = config.theme.borderRadius
export const colors  : Metrics = config.theme.colors
export const borderColors  : Metrics = config.theme.borderColor