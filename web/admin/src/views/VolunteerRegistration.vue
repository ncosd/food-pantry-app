<template>
  <div class="container">
    <volunteer-registration-form @submitted='onSubmitted'></volunteer-registration-form>
 </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
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
    onSubmitted(regdata) {
      console.log('regdata=' + JSON.stringify(regdata))

      console.log("before firebase.auth  email="+regdata.email)

      const auth = getAuth()
      createUserWithEmailAndPassword(auth, regdata.email, regdata.password)
      .then(data => {
        this.showSuccess = true;
        this.successMessage = "Account registered.";
        const name = regdata.email.match(/(.+)@/)
        updateProfile(auth.currentUser, {
          displayName: name[1]
        })
        .then(() => {
          console.log("after updateProfile uid=" + auth.currentUser.uid)
          //this.$router.replace({name:'Home'})
          const db = getFirestore()
          regdata.profile.email = regdata.email
          const vprofile = doc(db, 'volunteerprofile', auth.currentUser.uid)
          setDoc(vprofile, regdata.profile)

        })
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
