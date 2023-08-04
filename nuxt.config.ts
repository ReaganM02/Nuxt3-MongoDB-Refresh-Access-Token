// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@formkit/nuxt', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI
  },
  imports: {
    dirs: ['server/models']
  }
})
