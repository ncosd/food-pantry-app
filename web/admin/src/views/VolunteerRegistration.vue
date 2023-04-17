<template>
  <div class="container">
    <template v-if="state == 'new'">
      <volunteer-registration-form @submitted='onSubmitted'></volunteer-registration-form>
    </template>
    <template v-else>
      <p>You have been registered as a volunteer.  It can take a few days to process your application, please check back at a later time.</p>
    </template>
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
      state: 'new',
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
        .then( async () => {
          console.log("after updateProfile uid=" + auth.currentUser.uid)
          const db = getFirestore()
          regdata.profile.email = regdata.email
          regdata.profile.updated = new Date()
          const vprofile = doc(db, 'volunteerprofile', auth.currentUser.uid)
          setDoc(vprofile, regdata.profile)
          this.state = 'registered'

          //this.$router.replace({name:'Home'})
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
