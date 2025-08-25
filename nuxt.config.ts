export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: false},

    modules: [
        '@nuxt/image',
        ['@nuxtjs/google-fonts', {
            families: {
                Roboto: true,
                Inter: [400, 700],
                'Josefin+Sans': true,
                Lato: [100, 300],
                Raleway: {
                    wght: [100, 400],
                    ital: [100]
                }
            }
        }],
        '@nuxt/icon'
    ],

    css: [
        '@/assets/css/normalize.css',
        '@/assets/css/variables.css'
    ]
})
