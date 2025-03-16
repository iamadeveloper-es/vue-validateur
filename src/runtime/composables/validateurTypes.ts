export type ValidationMode = 'onSubmit' | 'instant' | 'instantOnSubmit'

export type ValidateurOptions = {
  mode: ValidationMode
  customValidations: ValidationRule[]
}
export type ValidatorConfig = {
  el: HTMLFormElement | null
  schema: object
  mode?: ValidationMode
}

export type Rule = {
  value: unknown
  validations: string[]
}

export type FormSchema = {
  [key: string]: Rule
}

export type ValidationResult = {
  isValid: boolean
  message: string
}

type ValidationFunction = (value: unknown, args?: (string[] | number[])) => ValidationResult

export type ValidationRule = {
  [key: string]: ValidationFunction
}
