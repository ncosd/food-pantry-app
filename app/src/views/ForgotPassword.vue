<template>
  <div>
    <ForgotPasswordForm :showSuccess="showSuccess" :successMessage="successMessage"
    @clicked="onFormSubmit"
    />

  </div>
</template>

<script>
import ForgotPasswordForm from '@/components/ForgotPasswordForm';

export default {
  name: 'ForgotPassword',
  components: {
    ForgotPasswordForm
  },
  data() {
    return {
      showSuccess: false,
      successMessage: ""
    }
  },
  methods: {
    onFormSubmit(email) {
       console.log('forgot ', email);
    }
  }
}
</script>

<style></style>
