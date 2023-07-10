<template>
<div class="row justify-content-center">
 <div class="col-md-8">
  <div class="card">
    <div class="card-header">Forgot Password</div>
    <h6 class="card-subtitle m-3 text-muted">Enter your email address and a link to reset your password will be emailed to you.</h6>
    <div class="card-text">
      <div class="card-body">
        <template v-if="showSuccess"><div class="text-bg-success">{{successMessage}}</div></template>
        <template v-if="showError"><div class="text-bg-danger" >{{errorMessage}}</div></template>
        <form @submit.prevent="submit">
          <div class="row my-3">
            <label class="form-label">Email</label>
            <div class="col-sm-10">
              <input type="email" class="form-control" v-model="email" :rules="[rules.required, rules.emailRule]" autocomplete="username" placeholder="name@example.com">
            </div>
          </div>
          <div class="row my-3">
            <div class="col-sm-offset-2 col-sm-10">
              <button class="btn btn-primary" type="submit" >Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
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
