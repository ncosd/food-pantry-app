<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const router = useRouter()
const error = ref("")
const showSuccess = ref(false)
const successMessage = ref("")
const showPass = ref(false)
const valid = ref(false)
const password = ref('')
const email = ref('')
const spin = ref(false)

const submit = ()=> {
  error.value = "";
  showSuccess.value = false;
  spin.value = true
  const auth = getAuth()

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then( () => {
      spin.value = false
      showSuccess.value = true
      successMessage.value = "You have signed in."
      router.push({name:'Home'})

    })
    .catch(err => {
        showSuccess.value = false
      switch(err.code) {
      case "auth/invalid-email":
        error.value = "Invalid email"
        break
      case "auth/user-not-found":
        error.value = "No account found, have you registered with this email address?"
        break
      case "auth/wrong-password":
        error.value = "Incorrect password"
        break
      default:
        error.value = err.message;
        break
      }
      spin.value = false
    })
}
</script>


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
                 <input type="email" v-model="email" autocomplete="username" class="form-control" required>
                 </div>
               </div>

               <div class="row my-3">
                 <label class="form-label">Password</label>
                 <div class="col"><input class="form-control" type="password" autocomplete="password" v-model="password" required></div>
               </div>

               <div class="row my-3" v-if="spin">
                 <LoadingSpinner class="ms-3" :visible="spin"/>
               </div>

               <div class="row">
                 <div class="col-sm-offset-2 col-sm-10">
                   <button type="submit" class="btn btn-primary">Login</button>
                   <a href="/forgot-password" class="m-3">Forgot Password?</a>
                   <a href="/register" class="m-3">Volunteer Sign Up</a>
                 </div>
               </div>
             </form>
           </div>
        </div>
      </div>
   </div>
 </div>
</template>
