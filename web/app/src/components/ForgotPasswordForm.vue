<template>
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Forgot Password</h5>
    <h6 class="card-subtitle">Enter your email address and a link to reset your password will be emailed to you.</h6>
    <div class="card-text">
      <template class="text-bg-success" v-if="showSuccess">{{successMessage}}</template>
      <template class="text-bg-danger" v-if="showError">{{errorMessage}}</template>
      <form v-model="valid" @submit.prevent="submit">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" v-model="email" :rules="[rules.required, rules.emailRule]" autocomplete="username" placeholder="email">
        <button class="btn btn-primary" type="submit" :disabled="!valid">Submit</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ForgotPasswordForm',
  props: [
    "showSuccess",
    "successMessage",
    "showError",
    "errorMessage",
  ],
  data() {
    return {
      valid: false,
      email: "",
      rules: {
        required: value => !!value || 'Required.',
        emailRule: v => !v || /.+@.+/.test(v) || 'Invalid Email Address'
      }
    }
  },
  methods: {
    submit() {
      this.$emit('clicked', this.email);
    }
  }

};
</script>

<style></style>
