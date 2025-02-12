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
                'primary': {
                    900: '#04646c',
                    800: '#05757e',
                    700: '#058c97',
                    600: '#059197',
                    500: '#0e9b98',
                    400: '#49BBBD',
                    300: '#92D6D6',
                }
            },
            fontSize: {
                title: '2rem',
            },
            fontFamily: {
                'nunito': ["Nunito", 'sans-serif']
            },
        },
        screens: {
            '2xs': '320px',
            'xs': '480px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px'
        }
    },
    plugins: ["prettier-plugin-tailwindcss"],
    darkMode: 'class',
}) as any

export type Metrics = Record<string, string>

export const rounded : Metrics = config.theme.borderRadius
export const colors  : Metrics = config.theme.colors
export const borderColors  : Metrics = config.theme.borderColor