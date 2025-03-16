import vueValidateurConfig from './vueValidateur.config'

export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  // runtimeConfig: {
  //   public: {
  //     vueValidateur: {
  //       token: 'mi-token-publico',
  //     },
  //   },
  // },
  compatibilityDate: '2025-03-15',
  // myModule: {},
  vueValidateur: vueValidateurConfig,
})
