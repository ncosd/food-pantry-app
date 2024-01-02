<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import VolunteerRegistrationForm from '@/components/VolunteerRegistrationForm.vue'

const state = ref('new')
const showSuccess = ref(false)
const successMessage = ref('')
const auth = getAuth()
const showError = ref(false)
const errMsg = ref('An error occurred, please try again in a few minutes.')

const onSubmitted = (regdata) => {
  showError.vaue = false
  showSuccess.value = false

  createUserWithEmailAndPassword(auth, regdata.email, regdata.password)
    .then(data => {
      showSuccess.value = true
      successMessage.value = "Account registered."
      const name = regdata.email.match(/(.+)@/)
      updateProfile(auth.currentUser, {
        displayName: name[1]
      }).then( async () => {
          console.log("after updateProfile uid=" + auth.currentUser.uid)
          const db = getFirestore()
          regdata.profile.email = regdata.email
          regdata.profile.updated = new Date()
          regdata.profile.displayname = name[1]
          const vprofile = doc(db, 'volunteerprofile', auth.currentUser.uid)
          setDoc(vprofile, regdata.profile)
          state.value = 'registered'
        })
        .catch(err=>{
          console.log('err for updateProfile', err)
          showError.value = true
        })
    })
    .catch(err => {
      console.log("err=", err)
      showSuccess.value = false
      showError.value = true
    })
}
</script>

<template>
  <div class="container">
    <template v-if="state == 'new'">
      <volunteer-registration-form @submitted='onSubmitted'></volunteer-registration-form>
      <div v-if="showError" class="text-danger">
        {{ errMsg }}
      </div>
    </template>
    <template v-else>
      <p>You have been registered as a volunteer.  It can take a few days to process your application, please check back at a later time.</p>
    </template>
 </div>
</template>
