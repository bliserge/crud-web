// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    runtimeConfig:{
      public:{
        apiUrl: 'http://localhost:8080/'
      }
    },
})
