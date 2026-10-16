
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true,
  },

  modules: ['@nuxtjs/tailwindcss'],

  css: [
    'swiper/css',
    'swiper/css/effect-fade',
    '~/assets/css/main.css',
    '~/assets/css/components/category-slider.css',
  ],

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY,
    },
  },
})
