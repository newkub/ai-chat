export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@unocss/nuxt'],
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/main.css',
    'highlight.js/styles/github.css'
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600&display=swap'
        }
      ]
    }
  }
})