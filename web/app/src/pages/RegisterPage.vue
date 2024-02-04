<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { config } from '@/config.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const db = getFirestore()

const showErr = ref(false)
const errorMsg = ref('')
const showSuccess = ref(false)
const successMessage = ref('')
const email = ref('')
const password = ref('')
const zipcode = ref('')
const valid = ref(false)

const showOutsideArea = ref(false)
const outsideAreaURL = config.DeliveryOutsideAreaUrl

const auth = getAuth()

const checkServiceArea = () => {
  if (config.DeliveryZipcodes.length > 0) {
    if (!config.DeliveryZipcodes.includes(zipcode.value)) {
      return false
    }
  }
  return true
}

const save = async () => {

  errorMsg.value = ''
  showErr.value = false
  showSuccess.value = false
  showOutsideArea.value = false

  if (!checkServiceArea()) {
    errorMsg.value = 'Location outside our service area.'
    showOutsideArea.value = true
    showErr.value = true
    return
  }

  try {
    const regData = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const uid = regData.user.uid

    const name = email.value.match(/(.+)@/)
    await updateProfile(auth.currentUser, {
      displayName: name[1]
    })

    const gProfRef = doc(db, 'guestprofile', uid)
    await setDoc(gProfRef, { zipcode: zipcode.value })

    // router.replace({name:'HomePage'});


  } catch(err) {
    const code = err.code
    const msg = err.message

    console.log("err=", code, 'm', msg)
    switch (code) {
    case 'auth/email-already-in-use':
      errorMsg.value = 'Email already in use.'
      break
    case 'auth/weak-password':
      errorMsg.value = 'Password should be at least 6 characters.'
      break

    default:
      errorMsg.value = msg
    }

    showSuccess.value = false
    showErr.value = true
  }
}
</script>

<template>
<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">Sign Up</div>
        <div class="card-body">
          <template v-if="showSuccess">
            <div class="text-bg-success p-3">{{successMessage}}</div>
          </template>
          <template v-if="showErr">
            <div class="text-bg-danger p-3">{{errorMsg}}</div>
          </template>
          <template v-if="showOutsideArea">
            <div class="p-3">If you are outside our service area check <a :href="outsideAreaURL">{{ outsideAreaURL }}</a></div>
          </template>

          <form @submit.prevent="save">
            <div class="row my-3">
              <label for="regEmail" class="form-label">Email</label>
              <input id="regEmail" type="text" v-model="email" autocomplete="email" class="form-control" placeholder="name@example.com" required>
            </div>

            <div class="row my-3">
              <label for="regPassword" class="form-label">Password</label>
              <input id="regPassword" type="password" v-model="password" autocomplete="new-password" class="form-control" required>
            </div>

            <div class="row my-3">
              <label for="regZip" class="form-label">Zipcode</label>
              <input id="regZip" type="text" v-model="zipcode" class="form-control" placeholder="12345" aria-describedby="regZipHelpBlock" required>
              <div id="regZipHelpBlock" class="form-text">
                Enter the zipcode where you live.
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
