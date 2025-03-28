<script lang="ts" setup>
// Se definen las referencias
const formOne = ref<HTMLFormElement | null>(null)
const formTwo = ref<HTMLFormElement | null>(null)
const formThree = ref<HTMLFormElement | null>(null)

// Asignación de composable para diferentes formularios
const { createValidateur, validate, validationErrors } = useValidateur()
const formTwoValidateur = useValidateur()
const formThreeValidateur = useValidateur()

const {
  createValidateur: createValidateurThree,
  validate: validateThree,
  validationErrors: validationErrorsThree } = formThreeValidateur

const validationErrorsV2 = formTwoValidateur.validationErrors

const formSchema = reactive({
  userName: {
    value: '',
    validations: ['required', 'minLength:3,4', 'alphaNumeric'],
  },
  email: {
    value: '',
    validations: ['required', 'email'],
  },
  pass: {
    value: '',
    validations: ['required', 'startsWithA'],
  },
})

const formSchemaV2 = reactive({
  userName: {
    value: '',
    validations: ['required', 'minLength:3,4', 'alphaNumeric'],
  },
  email: {
    value: '',
    validations: ['required', 'email'],
  },
  pass: {
    value: '',
    validations: ['required'],
  },
})

const formSchemaV3 = reactive({
  userName: {
    value: '',
    validations: ['required', 'minLength:3,4', 'alphaNumeric'],
  },
  email: {
    value: '',
    validations: ['required', 'email'],
  },
  pass: {
    value: '',
    validations: ['required'],
  },
})

const onSubmit = () => {
  validate()
}

const onSubmitV2 = () => {
  formTwoValidateur.validate()
}

const onSubmitV3 = () => {
  validateThree()
}

onMounted(() => {
  createValidateur(formOne, formSchema, {
    mode: 'instantOnSubmit',
  })
  formTwoValidateur.createValidateur(formTwo, formSchemaV2, {
    mode: 'instant',
  })

  createValidateurThree(formThree, formSchemaV3, {
    mode: 'instant',
  })
})
</script>

<template>
  <div>
    <form
      ref="formOne"
      @submit.prevent="onSubmit"
    >
      <div>
        <label for="userName">User Name</label>
        <input
          id="userName"
          v-model="formSchema.userName.value"
          type="text"
          name="userName"
        >
        <span v-if="validationErrors.userName">{{ validationErrors.userName }}</span>
      </div>
      <div>
        <label for="email">Email</label>
        <input
          id="email"
          v-model="formSchema.email.value"
          type="text"
          name="email"
        >
        <span v-if="validationErrors.email">{{ validationErrors.email }}</span>
      </div>
      <div>
        <label for="pass">Password</label>
        <input
          id="pass"
          v-model="formSchema.pass.value"
          type="password"
          name="pass"
        >
        <span v-if="validationErrors.pass">{{ validationErrors.pass }}</span>
      </div>
      <button type="submit">
        Send
      </button>
    </form>

    <!--  -->
    <form
      ref="formTwo"
      @submit.prevent="onSubmitV2"
    >
      <div>
        <label for="userName2">User Name</label>
        <input
          id="userName2"
          v-model="formSchemaV2.userName.value"
          type="text"
          name="userName2"
        >
        <span v-if="validationErrorsV2.userName">{{ validationErrorsV2.userName }}</span>
      </div>
      <div>
        <label for="email2">Email</label>
        <input
          id="email2"
          v-model="formSchemaV2.email.value"
          type="text"
          name="email2"
        >
        <span v-if="validationErrorsV2.email">{{ validationErrorsV2.email }}</span>
      </div>
      <div>
        <label for="pass2">Password</label>
        <input
          id="pass2"
          v-model="formSchemaV2.pass.value"
          type="password"
          name="pass2"
        >
        <span v-if="validationErrorsV2.pass">{{ validationErrorsV2.pass }}</span>
      </div>
      <button type="submit">
        Send
      </button>
    </form>
    <!--  -->
    <form
      ref="formThree"
      @submit.prevent="onSubmitV3"
    >
      <div>
        <label for="userName3">User Name</label>
        <input
          id="userName3"
          v-model="formSchemaV3.userName.value"
          type="text"
          name="userName3"
        >
        <span v-if="validationErrorsThree.userName">{{ validationErrorsThree.userName }}</span>
      </div>
      <div>
        <label for="email3">Email</label>
        <input
          id="email3"
          v-model="formSchemaV3.email.value"
          type="text"
          name="email3"
        >
        <span v-if="validationErrorsThree.email">{{ validationErrorsThree.email }}</span>
      </div>
      <div>
        <label for="pass3">Password</label>
        <input
          id="pass3"
          v-model="formSchemaV3.pass.value"
          type="password"
          name="pass3"
        >
        <span v-if="validationErrorsThree.pass">{{ validationErrorsThree.pass }}</span>
      </div>
      <button type="submit">
        Send
      </button>
    </form>
  </div>
</template>

<style>

</style>
