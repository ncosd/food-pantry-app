<script setup>
import { ref } from 'vue'
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import ForgotPasswordForm from '@/components/ForgotPasswordForm.vue'

const showSuccess = ref(false)
const successMessage = ref("")
const errorMessage = ref("")
const showError = ref(false)
const auth = getAuth()

const onFormSubmit = async(email) => {
  sendPasswordResetEmail(auth, email).then(() => {
    showError.value = false
    showSuccess.value = true
    successMessage.value = 'Email sent with a link to reset your password.  Please check you spam folder if you do not see it in a few minutes.'
  }).catch(() => {
    showSuccess.value = false
    showError.value = true
    errorMessage.value = 'An error occurred.  Check you entered the correct email for your account.'
  })
}
</script>

<template>
  <div class="container">
    <ForgotPasswordForm :showSuccess="showSuccess" :successMessage="successMessage"
    :showError="showError" :errorMessage="errorMessage"
    @clicked="onFormSubmit"
    />
  </div>
</template>
