/** @type { import('@storybook/vue3-vite').StorybookConfig } */




const config = {
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)',
        "../components/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-addon-nuxt',
        {
            name: '@storybook/addon-styling',
            options: {
                postCss: {
                    implementation: require.resolve('postcss'),
                },
            },
        },
        {
            name: '@storybook/addon-postcss',
            options: {
                cssLoaderOptions: {
                    importLoaders: 1,
                },
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                }
            }
        }
    ],
    framework: {
        name: '@storybook/vue3-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    }
}
export default config
