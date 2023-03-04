<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
           <div class="card-header">Sign Up</div>
           <div class="card-body">
              <template v-if="showSuccess">
                <div class="text-bg-success">{{successMessage}}</div>
              </template>
              <template v-if="error">
                <div class="text-bg-danger">{{error}}</div>
              </template>
              <form @submit.prevent="submit">
              <div class="row my-3">
                <label class="form-label">Email</label>
                <div class="col-sm-10">
                  <input type="text" v-model="email" :rules="[rules.emailRule]" label="Email" autocomplete="username" class="form-control" placeholder="name@example.com">
                </div>
              </div>

              <div class="row my-3">
                <label class="form-label">Password</label>
                <div class="col-sm-10">
                  <input type="password" v-model="password" autocomplete="new-password" class="form-control"></input>
                </div>
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
              <a href="/forgot-password" class="m-3">Forgot Password?</a>
              <a href="/login" class="m-3">Sign In</a>
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

      if (!this.email) {
        this.error = "Email is required"
      } else {
        if (!(/.+@.+/.test(this.email))) {
          this.error += " Invalid email address."
        }
      }

      if (!this.password) {
        this.error += " Password is required"
      }
      if (this.password && (this.password.length < 8)) {
        this.error += " Password must be at least 8 characters"
      }

      if (!this.error) {
        this.showSuccess = false
        return false
      }


      // firebase.auth()
      // .createUserWithEmailAndPassword(this.email, this.password)
      // .then(data => {
      //   this.showSuccess = true;
      //   this.successMessage = "Account registered.";
      //   data.user.updateProfile({
      //     displayName: this.email
      //   })
      //   .then(() => { this.$router.replace({name:'Home'}); });
      // })
      // .catch(err => {
      //   this.showSuccess = false;
      //   this.error = err.message;
      //   });
    }
  }
}
</script>
