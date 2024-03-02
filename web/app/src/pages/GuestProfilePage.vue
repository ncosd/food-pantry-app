<script setup>
import { ref, onBeforeMount } from 'vue'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { config } from '@/config.js'
import { useRouter } from 'vue-router'
import { useAuthUserStore } from '@/stores/authUser'

const props = defineProps({
  id: String,
})

const router = useRouter()
const db = getFirestore()
const user = useAuthUserStore()
const showErrMsg = ref(false)
const errorMsg = ref('An error occurred.')
const showSuccessMsg = ref(false)
const successMsg = ref('Profile Saved.')
const email = ref('')
const password = ref('')
const valid = ref(false)

const profile = ref(
  {
    zipcode: '',
    numInHousehold: 1,
    numChild: 0,
    numAdult: 0,
    numSenior: 0,
    phone: '',
    street: '',
    street2: '',
    city: '',
    state: '',
    firstname: '',
    lastname: '',
    displayName: '',
  }
)

const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

const showOutsideArea = ref(false)
const outsideAreaURL = config.DeliveryOutsideAreaUrl

const auth = getAuth()

const checkServiceArea = () => {
  if (config.DeliveryZipcodes.length > 0) {
    if (!config.DeliveryZipcodes.includes(profile.value.zipcode)) {
      return false
    }
  }
  return true
}

const saveProfile = async () => {
  let userId = props.id
  if (!props.id) {
    userId = user.data.uid
  }

  try {
    const profRef = doc(db, 'guestprofile', userId)
    profile.value.numInHousehold = Number(profile.value.numInHousehold)
    await setDoc(profRef, profile.value)
    showSuccessMsg.value = true

  } catch (err) {
    showErrMessage.value = true
    console.error(err)
  }
}

onBeforeMount(async () => {
  let userId = props.id
  if (!props.id) {
    userId = user.data.uid
  }
  const profRef = doc(db, 'guestprofile', userId)
  const profSnap = await getDoc(profRef)
  if (profSnap.exists()) {
    profile.value = profSnap.data()
  }
})
</script>

<template>
<div class="container">
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><RouterLink :to="{name:'HomePage'}">Home</RouterLink></li>
      <li class="breadcrumb-item active" aria-current="page">Profile</li>
    </ol>
  </nav>

  <form @submit.prevent="saveProfile">
    <template v-if="showSuccessMsg">
      <div class="text-bg-success p-3">{{successMsg}}</div>
    </template>
    <template v-if="showErrMsg">
      <div class="text-bg-danger p-3">{{errorMsg}}</div>
    </template>
    <template v-if="showOutsideArea">
      <div class="p-3">If you are outside our service area check <a :href="outsideAreaURL">{{ outsideAreaURL }}</a></div>
    </template>

    <div class="row my-3">
      <div class="col">
        <label for="idFirstName" class="form-label">First Name</label>
        <input id="idFirstName" type="text" v-model="profile.firstname" class="form-control" placeholder="" required>
      </div>
    </div>

    <div class="row my-3">
      <div class="col">
        <label for="idLastname" class="form-label">Last Name</label>
        <input id="idLastname" type="text" v-model="profile.lastname" class="form-control" placeholder="" required>
      </div>
    </div>

    <div class="row my-3">
      <div class="col">
        <label for="idDisplayName" class="form-label">Display Name</label>
        <input id="idDisplayName" type="text" v-model="profile.displayName" class="form-control" placeholder="" required>
        <div id="regZipHelpBlock" class="form-text">
          Display Name is what shows in the navigation bar.
        </div>
      </div>
    </div>

    <div class="row my-3">
      <div class="col">
        <label for="idPhone" class="form-label">Phone Number</label>
        <input id="idPhone" type="text" v-model="profile.phone" class="form-control" placeholder="610-555-1212" required>
      </div>
    </div>

    <div class="row my-3">
      <div class="col">
        <label for="street" class="form-label">Street Address</label>
        <input id="street" type="text" v-model="profile.street" class="form-control" placeholder="" required>
      </div>
    </div>

    <div class="row my-3">
      <div class="col">
        <label for="street2" class="form-label">Suite/Apt</label>
        <input id="street2" type="text" v-model="profile.street2" class="form-control" placeholder="">
      </div>
    </div>

    <div class="row my-3">
      <div class="col">
        <label for="city" class="form-label">City</label>
        <input id="city" type="text" v-model="profile.city" class="form-control" placeholder="" required>
      </div>
    </div>

    <div class="row my-3">
      <div class="col">
        <label for="state" class="form-label">State</label>
        <select id="state" class="form-select" v-model="profile.state" required>
          <template v-for="state in states" :key="state">
            <option :value="state">{{state}}</option>
          </template>
        </select>
      </div>
    </div>

    <div class="row my-3">
      <div class="col">
        <label for="regZip" class="form-label">Zipcode</label>
        <input id="regZip" type="text" v-model="profile.zipcode" class="form-control" placeholder="" aria-describedby="regZipHelpBlock" required>
        <div id="regZipHelpBlock" class="form-text">
          Enter the 5 digit zipcode where you live.  For example: 12345
        </div>
      </div>
    </div>

    <div class="row my-3">
      <div class="col">
        <label for="numInHousehold" class="form-label">Household Size</label>
        <select id="numInHousehold" class="form-select" v-model="profile.numInHousehold">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9 or more</option>
        </select>
        <div id="numInHouseholdHelp" class="form-text">Enter the number of people in your household. Enter the same number you will enter on the TEFAP form.</div>
      </div>
    </div>

    <div class="row my-3">
      <div class="col">
        <label for="numChild" class="form-label">Number Children in Household (age 0-17 years)</label>
        <select id="numChild" class="form-select" v-model="profile.numChild">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9 or more</option>
        </select>
        <div id="numChildHelp" class="form-text">Enter the same number you will enter on the TEFAP form.</div>
      </div>
    </div>

    <div class="row my-3">
      <div class="col">
        <label for="numAdult" class="form-label">Number Adults in Household (age 18-59 years)</label>
        <select id="numAdult" class="form-select" v-model="profile.numAdult">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9 or more</option>
        </select>
        <div id="numAdultHelp" class="form-text">Enter the same number you will enter on the TEFAP form.</div>
      </div>
    </div>

    <div class="row my-3">
      <div class="col">
        <label for="numSenior" class="form-label">Number Seniors in Household (age 60+ years)</label>
        <select id="numSenior" class="form-select" v-model="profile.numSenior">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9 or more</option>
        </select>
        <div id="numSeniorHelp" class="form-text">Enter the same number you will enter on the TEFAP form.</div>
      </div>
    </div>

    <template v-if="showSuccessMsg">
      <div class="text-bg-success p-3">{{successMsg}}</div>
    </template>
    <template v-if="showErrMsg">
      <div class="text-bg-danger p-3">{{errorMsg}}</div>
    </template>
    <template v-if="showOutsideArea">
      <div class="p-3">If you are outside our service area check <a :href="outsideAreaURL">{{ outsideAreaURL }}</a></div>
    </template>

    <div class="my-3">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</div>
</template>
