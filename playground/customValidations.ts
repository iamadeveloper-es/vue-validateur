export const customValidations = {
  isEven: (value: number) => ({
    isValid: value % 2 === 0,
    message: 'El número debe ser par',
  }),
  startsWithA: (value: string) => ({
    isValid: typeof value === 'string' && value.startsWith('A'),
    message: 'Debe empezar con la letra "A"',
  }),
}
