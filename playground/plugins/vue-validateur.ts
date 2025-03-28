import { customValidations } from '~/customValidations'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      customRules: customValidations,
    },
  }
})
