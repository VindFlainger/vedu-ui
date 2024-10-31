/** @type {import('tailwindcss').Config} */
module.exports = {
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
                'primary-900': '#04646c',
                'primary-800': '#05757e',
                'primary-700': '#058c97',
                'primary-600': '#059197',
                'primary-500': '#0e9b98',
                'primary-400': '#49BBBD',
                'primary-300': '#92D6D6',
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
}
