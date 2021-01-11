<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
           <div class="card-header">Sign In</div>
           <div class="card-body">
              <v-alert v-if="showSuccess" type="success">{{successMessage}}</v-alert>
              <v-alert v-if="error" type="error">{{error}}</v-alert>
              <v-form v-model="valid" @submit.prevent="submit">
              <v-text-field v-model="email" :rules="[rules.emailRule]" label="Email" autocomplete="username"></v-text-field>
              <v-text-field v-model="password" label="Password" autocomplete="password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
              ></v-text-field>

              <v-btn type="submit" color="success" class="mr-4" :disabled="!valid">Submit</v-btn>
              </v-form>
           </div>
        </div>
      </div>
   </div>
 </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Login',
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
        emailRule: v => !v || /.+@.+/.test(v) || 'Invalid Email Address'
      },
    }
  },
  methods: {
    submit() {
      this.error = "";
      this.showSuccess = false;
      firebase.auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then( () => {
        this.showSuccess = true;
        this.successMessage = "You have signed in.";
        this.$router.replace({name:'Home'});

      })
      .catch(err => {
        this.showSuccess = false;
        this.error = err.message;
        });
    }
  }
}
</script>
