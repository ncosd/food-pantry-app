<template>
  <div>
    <ForgotPasswordForm :showSuccess="showSuccess" :successMessage="successMessage"
    @clicked="onFormSubmit"
    />

  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/functions';
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
       var resetMsg = firebase.functions().httpsCallable('passwordReset');
       resetMsg({email: email}).then((result) => {
          console.log(result);
       }).catch((error)=>{
          console.log(error);
       });
    }
  }
}
</script>

<style></style>
