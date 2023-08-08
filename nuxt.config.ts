// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: ['@formkit/nuxt', '@nuxtjs/tailwindcss', ['@pinia/nuxt', {
    autoImports: [
      'acceptHMRUpdate',
      'defineStore',
      ['defineStore', 'definePiniaStore']
    ]
  }]],
  imports: {
    dirs: ['stores']
  },
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    ELASTIC_API: process.env.ELASTIC_API,
    APP_URL: 'http://localhost:3000',
    EMAIL: 'reagansoftwaredev@gmail.com',
    public: {
      ELASTIC_URL: 'https://api.elasticemail.com/v4'
    }
  },
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs'
  },
  nitro: {
    plugins: ['~/server/plugins/mongoDB.ts']
  }
})
