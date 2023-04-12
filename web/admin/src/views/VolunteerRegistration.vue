<template>
  <div class="container">
    <volunteer-registration-form></volunteer-registration-form>
 </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import VolunteerRegistrationForm from '@/components/VolunteerRegistrationForm.vue'

export default {
  name: 'VolunteerRegistration',
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
  components: {
    VolunteerRegistrationForm,
  },
  methods: {
    submit() {
      this.error = "";
      this.showSuccess = false;

      if (!this.email) {
        this.error = "Email is required"
      } else {
        if (!(/.+@.+\..+/.test(this.email))) {
          this.error += " Invalid email address."
        }
      }

      if (!this.password) {
        this.error += " Password is required"
      }
      if (this.password && (this.password.length < 8)) {
        this.error += " Password must be at least 8 characters"
      }

      if (this.error) {
        this.showSuccess = false
        console.log("error  "+this.error)
        return false
      }

      console.log("before firebase.auth")

      const auth = getAuth()
      createUserWithEmailAndPassword(auth, this.email, this.password)
      .then(data => {
        this.showSuccess = true;
        this.successMessage = "Account registered.";
        const name = this.email.match(/(.+)@/)
        updateProfile(auth.currentUser, {
          displayName: name[1]
        })
        .then(() => { console.log("after updateProfile"); this.$router.replace({name:'Home'}); })
        .catch(err=>{
          console.log('err for updateProfile', err)
        })
      })
      .catch(err => {
        console.log("err=", err)
        this.showSuccess = false;
        this.error = err.message;
      });
    }
  }
}
</script>
