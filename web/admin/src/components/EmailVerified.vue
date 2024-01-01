<script setup>
import { useAuthUserStore } from '@/stores/authUser'
import { getAuth, sendEmailVerification } from 'firebase/auth'

const emit = defineEmits(['email-sent'])

const user = useAuthUserStore()
const auth = getAuth()

const sendVerificationEmail = async () => {
  await sendEmailVerification(auth.currentUser)
  emit('email-sent')
}
</script>

<template>
<div>
  <span class="fw-medium">{{ user.data.email }}</span>
  <template v-if="user.data.emailVerified">
    <i class="bi bi-patch-check text-success ms-2" />
    <span class="fst-italic ms-1">Verified</span>
  </template>
  <template v-else>
    <i class="bi bi-exclamation-circle text-danger ms-2" />
    <button class="btn btn-sm btn-primary ms-2" type="button" :onClick="sendVerificationEmail">Send Verification Email</button>
  </template>
</div>
</template>
