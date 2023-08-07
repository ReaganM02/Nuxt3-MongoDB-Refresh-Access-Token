// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: ['@formkit/nuxt', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    TOKEN_REFRESH: process.env.TOKEN_REFRESH,
    ELASTIC_API: process.env.ELASTIC_API,
    EMAIL: 'reagansoftwaredev@gmail.com',
    public: {
      ELASTIC_URL: 'https://api.elasticemail.com/v4'
    }
  },
  nitro: {
    plugins: ['~/server/plugins/mongoDB.ts']
  }
})
