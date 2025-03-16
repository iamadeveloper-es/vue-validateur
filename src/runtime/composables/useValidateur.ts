import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useValidations } from './useValidations'
import type { FormSchema, ValidateurOptions, ValidationMode, ValidationResult } from './validateurTypes'
import { useRuntimeConfig } from '#app'

export const useValidateur = () => {
  const config = useRuntimeConfig().public.vueValidateur || {}

  console.log('Opciones del módulo en el composable: ', config)

  const { validationRules } = useValidations()

  // const extendedValidations = {
  //   ...validationRules,
  //   ...$vValidateur.customValidations,
  // }

  const formToValidate = ref<HTMLFormElement | null>(null)
  let formSchema: FormSchema | object = reactive({})
  const formErrorsSchema = reactive(new Map())
  const validationMode = ref('')
  const validations = ref(validationRules)

  const isFormValid = computed(() => formErrorsSchema.size === 0)
  const validationErrors = computed(() => Object.fromEntries(formErrorsSchema))

  const createValidateur = (el: HTMLFormElement, schema: FormSchema, options?: ValidateurOptions) => {
    formToValidate.value = el
    formSchema = schema

    validationMode.value = options?.mode || 'onSubmit'
    validations.value = { ...validationRules, ...options?.customValidations }

    if (validationMode.value === 'instant') {
      instantValidation()
    }
  }

  const instantValidation = () => {
    for (const key in formSchema) {
      watch(
        () => formSchema[key].value,
        () => {
          validateField(key)
        },
      )
    }
  }

  const validate = () => {
    for (const key in formSchema) {
      validateField(key)
    }

    if (validationMode.value === 'instantOnSubmit') {
      instantValidation()
    }

    if (!isFormValid.value) {
      const firstErrorKey = formErrorsSchema.keys().next().value
      scrollToField(firstErrorKey)
    }
  }

  const validateField = (key: string) => {
    const field = formSchema[key]
    const value = field.value
    const validationsStatus: ValidationResult[] = []
    field.validations.forEach((rule: string) => {
      const formatedRules = parseRule(rule)
      validationsStatus.push(validations.value[formatedRules.rule](value, formatedRules.args))
    })

    checkValidity(key, validationsStatus)
  }

  const checkValidity = (key: string, validations: ValidationResult[]) => {
    const isValid = validations.every((validation: ValidationResult) => validation.isValid)

    if (!isValid) {
      const firstError = validations.find(item => item.isValid === false)
      formErrorsSchema.set(key, firstError?.message)
    }
    else {
      formErrorsSchema.delete(key)
    }
  }

  const parseRule = (rule: string) => {
    const [ruleName, args] = rule.split(':')
    return {
      rule: ruleName,
      args: args ? args.split(',') : undefined,
    }
  }

  const scrollToField = (fieldName: string) => {
    const inputField = formToValidate.value?.value?.querySelector(`input[name="${fieldName}"]`) as HTMLInputElement
    nextTick(() => {
      inputField.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // inputField.focus();
      setTimeout(() => {
        inputField.focus()
      }, 300)
    })
  }

  return {
    createValidateur,
    validate,
    isFormValid,
    validationErrors,
  }
}
