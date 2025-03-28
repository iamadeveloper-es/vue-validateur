import { defineNuxtModule, addImportsDir, createResolver } from '@nuxt/kit'
import defu from 'defu'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-vue-validateur',
    configKey: 'vueValidateur',
    compatibility: {
      nuxt: '>=3.16.0',
    },
  },
  defaults: {
    vueValidateur: {},
  },

  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Fusionar configuración del usuario con los defaults
    const moduleOptions = defu(_nuxt.options.runtimeConfig.public.vueValidateur || {}, _options)

    // Guardar la configuración en `runtimeConfig.public` para que sea accesible en cliente
    _nuxt.options.runtimeConfig.public.vueValidateur = moduleOptions

    // console.log('Configuración final del módulo:', _nuxt.options.runtimeConfig.public.vueValidateur)

    addImportsDir(resolver.resolve('./runtime/composables'))
  },
})
