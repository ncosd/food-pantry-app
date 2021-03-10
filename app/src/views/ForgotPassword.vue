<template>
  <div>
    <ForgotPasswordForm :showSuccess="showSuccess" :successMessage="successMessage"
    :showError="showError" :errorMessage="errorMessage"
    @clicked="onFormSubmit"
    />

  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';

export default {
  name: 'ForgotPassword',
  components: {
    ForgotPasswordForm
  },
  data() {
    return {
      showSuccess: false,
      successMessage: "",
      errorMessage: "",
      showError: false,
    }
  },
  methods: {
    onFormSubmit(email) {
       console.log('forgot ', email);
       var auth = firebase.auth();
       auth.sendPasswordResetEmail(email).then(() => {
          console.log('success');
          this.showError = false;
          this.showSuccess = true;
          this.successMessage = 'Email sent with a link to reset your password.  Please check you spam folder if you do not see it in a few minutes.';
       }).catch((error)=>{
          this.showSuccess = false;
          this.showError = true;
          this.errorMessage = 'An error occurred.  Check you entered the correct email for your account.';
          console.log(error);
       });
    }
  }
}
</script>

<style></style>
