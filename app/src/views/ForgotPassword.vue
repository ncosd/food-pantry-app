<template>
  <div>
    <ForgotPasswordForm :showSuccess="showSuccess"/>

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
    }
  }


}
</script>


<style></style>
