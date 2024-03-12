// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-icon', '@nuxtjs/google-fonts', "@nuxt/image", '@sidebase/nuxt-auth', '@pinia/nuxt','nuxt3-leaflet'],
  css: ['~/assets/css/main.css'],
  postcss: {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    },
  },
  auth: {
    globalAppMiddleware: true,
    baseURL:"http://43.243.187.6:6060/api/v1",
    provider: {
      type: 'local',
      endpoints: {
        signIn : { path : '/login', method: 'post'}
      },
      pages: {
        login: '/auth/login-fo'
      },
      token: {
        signInResponseTokenPointer: '/data/token'
      },
    },
  }
})