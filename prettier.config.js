module.exports = {
    trailingComma: 'es5',
    semi: false,
    singleQuote: true,
    tabWidth: 4,
    plugins: [require('prettier-plugin-tailwindcss')],
    extends: ['plugin:prettier-vue/recommended'],
    printWidth: 100,
    wrapAttributes: true,
    bracketSpacing: true
}
