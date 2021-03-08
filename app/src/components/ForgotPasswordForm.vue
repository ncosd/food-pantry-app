<template>
  <v-card text>
    <v-card-title>Forgot Password</v-card-title>
    <v-card-subtitle>Enter your email address and a link to reset your password will be emailed to you.</v-card-subtitle>
    <v-card-text>
      <v-alert v-if="showSuccess" type="success">{{successMessage}}</v-alert>
      <v-form v-model="valid" @submit.prevent="submit">
        <v-text-field v-model="email" :rules="[rules.required, rules.emailRule]" label="Email" autocomplete="username"></v-text-field>

        <v-btn type="submit" color="success" class="mr-4" :disabled="!valid">Submit</v-btn>

      </v-form>


    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: 'ForgotPasswordForm',
  props: [
    "showSuccess",
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
