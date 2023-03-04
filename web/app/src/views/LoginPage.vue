<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
           <div class="card-header">Sign In</div>
           <div class="card-body">
             <template v-if="showSuccess">
               <div class="text-bg-success">{{ successMessage }}</div>
             </template>
             <template v-if="error">
               <div class="text-bg-danger">{{error}}</div>
             </template>

             <form @submit.prevent="submit" >
               <div class="row my-3">
                 <label class="form-label">Email</label>
                 <div class="col-sm-10">
                 <input type="email" v-model="email" autocomplete="username" class="form-control"></input>
                 </div>
               </div>

               <div class="row my-3">
                 <label class="form-label">Password</label>
                 <div class="col"><input class="form-control" type="password" autocomplete="password" v-model="password"></input></div>
               </div>

               <div class="row">
                 <div class="col-sm-offset-2 col-sm-10">
                   <button type="submit" class="btn btn-primary">Submit</button>
                   <a href="/forgot-password" class="m-3">Forgot Password?</a>
                   <a href="/register" class="m-3">Sign Up</a>
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
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  name: 'LoginPage',
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
