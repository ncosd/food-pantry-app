<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
           <div class="card-header">Register</div>
           <div class="card-body">
              <template v-if="showSuccess">
                <div class="text-bg-success">{{successMessage}}</div>
              </template>
              <template v-if="error">
                <div class="text-bg-danger">{{error}}</div>
              </template>
              <form v-model="valid" @submit.prevent="submit">
              <div>
                <label>Email</label>
                <input type="text" v-model="email" :rules="[rules.emailRule]" label="Email" autocomplete="email"></input>
              </div>

              <div>
              <label>Password</label>
              <input type="password" v-model="password" autocomplete="new-password"
                :rules="[rules.required, rules.min]"
              ></input>
              </div>

              <button type="submit" class="btn btn-primary" :disabled="!valid">Submit</button>
              <a href="/login" class="m-3">Sign In</a>
              <a href="/forgot-password" class="m-3">Forgot Password?</a>
              </form>
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
