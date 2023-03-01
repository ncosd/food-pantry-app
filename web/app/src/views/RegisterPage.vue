<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
           <div class="card-header">Register</div>
           <div class="card-body">
              <v-alert v-if="showSuccess" type="success">{{successMessage}}</v-alert>
              <v-alert v-if="error" type="error">{{error}}</v-alert>
              <v-form v-model="valid" @submit.prevent="submit">
              <v-text-field v-model="email" :rules="[rules.emailRule]" label="Email" autocomplete="username"></v-text-field>
              <v-text-field v-model="password" label="Password" autocomplete="new-password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
              ></v-text-field>

              <v-btn type="submit" color="success" class="mr-4" :disabled="!valid">Submit</v-btn>
              <v-btn text to="/login">Sign In</v-btn>
              <v-btn text to="/forgot-password">Forgot Password?</v-btn>
              </v-form>
           </div>
        </div>
      </div>
   </div>
 </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  name: 'RegisterPage',
  data() {
    return {
      error: "",
      showSuccess: false,
      successMessage: "",
      showPass: false,
      valid: false,
      password: '',
      email: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailRule: v => !v || /.+@.+/.test(v) || 'Invalid Email Address'
      },
    }
  },
  methods: {
    submit() {
      this.error = "";
      this.showSuccess = false;
      firebase.auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(data => {
        this.showSuccess = true;
        this.successMessage = "Account registered.";
        data.user.updateProfile({
          displayName: this.email
        })
        .then(() => { this.$router.replace({name:'Home'}); });
      })
      .catch(err => {
        this.showSuccess = false;
        this.error = err.message;
        });
    }
  }
}
</script>
