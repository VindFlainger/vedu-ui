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
                'primary-700': '#49BBBD',
                'primary-500': '#92D6D6',
            },
            fontSize: {
                title: '2rem',
            },
        },
    },
    plugins: [],
    darkMode: 'class',
}
