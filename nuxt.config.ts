export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',

    devtools: {
        enabled: false
    },

    modules: [
        '@nuxt/image',
        '@nuxt/icon',
        '@pinia/nuxt',

        [
            '@vee-validate/nuxt',
            {
                autoImports: true,
                componentNames: {
                    Form: 'VeeForm',
                    Field: 'VeeField',
                    FieldArray: 'VeeFieldArray',
                    ErrorMessage: 'VeeErrorMessage'
                }
            }
        ],

        [
            '@nuxtjs/google-fonts',
            {
                families: {
                    Roboto: true,
                    Inter: [400, 700],
                    NunitoSuns: true,
                    Lato: [100, 300],
                    Raleway: {
                        wght: [100, 400],
                        ital: [100]
                    }
                }
            }
        ]
    ],

    css: [
        '@/assets/css/normalize.css',
        '@/assets/css/variables.css'
    ],

    pinia: {
        storesDirs: ['./store/**']
    }
})
