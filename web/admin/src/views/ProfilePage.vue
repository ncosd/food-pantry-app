<script setup>
import { config } from '@/config.js'
import { ref, onBeforeMount } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { getAuth, updateProfile } from 'firebase/auth'
import { collection, getFirestore, query, where, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import ProfileTabs from '@/components/ProfileTabs.vue'
import EmailVerified from '@/components/EmailVerified.vue'

const props = defineProps({
  uid: String
})
const user = useAuthUserStore()

const router = useRouter()
const profile = ref()
const status = ref()
const userId = ref()
var profileRef = null
var stateRef = null

const phoneError = ref(false)
const acceptLiftError = ref(false)
const acceptParentError = ref(false)
const acceptFrontLineError = ref(false)
const acceptTermsError = ref(false)


const save = async ()=>{
  await updateDoc(profileRef, profile.value)
  await updateDoc(stateRef, { status: status.value })

  if (user.data.displayName != profile.value.displayname) {
    const auth = getAuth()

    updateProfile(auth.currentUser, {
      displayName: profile.value.displayname
    })
  }

  if (user.isAdmin) {
    router.replace({ name: 'Volunteers' })
  } else {
    router.replace({ name: 'Home' })
  }
}

onBeforeMount( async () => {
  userId.value = props.uid

  if (props.uid === '' || props.uid === undefined) {
    userId.value = user.data.uid
  }

  const db = getFirestore()
  profileRef = doc(db, "volunteerprofile", userId.value)
  const profileSnap = await getDoc(profileRef)
  if (profileSnap.exists()) {
    profile.value = profileSnap.data()
    stateRef = doc(db, "volunteerprofilestate", userId.value)
    const stateSnap = await getDoc(stateRef)
    if (stateSnap.exists()) {
      status.value = stateSnap.data().status
    }
  } else {
    profile.value = {
      email: '',
      displayname: '',
      firstname: '',
      lastname: '',
      phone: '',
      pronoun:'',
      avail_monday: false,
      avail_tuesday: false,
      avail_thursday: false,
      avail_saturday: false,
      acceptLiftClean: false,
      acceptParent: false,
      acceptFrontLine: false,
      extraNote: ''
    }
    status.value = 'in-review'
  }
})
</script>

<template>
<div class="container">
  <ProfileTabs activeTab="Registration" :uid="userId"></ProfileTabs>


  <div class="my-3">
    <h3 class="fs-4">Email Verification</h3>
    <EmailVerified v-if="userId == user.data.uid"/>
    <div v-else>Unavailable at this time for this user.</div>
  </div>

  <template v-if="user.isAdmin && userId != user.data.uid"><div class="text-bg-warning">Viewing as admin</div></template>
  <template v-if="profile && profile.email">
    <div class="row my-3">
      <div class="col">
        <label class="form-label me-3" for="status">Volunteer Status</label>
        <template v-if="user.isAdmin">
          <select class="form-select" v-model="status">
            <option value="active">active</option>
            <option value="in-review">in-review</option>
            <option value="inactive">inactive</option>
          </select>
        </template>
        <template v-else>
          <div class="p-3 bg-light text-dark">
            {{ status }}
          </div>
        </template>
      </div>
    </div>
    <div class="row my-3">
      <div class="col-12 col-md-6">
        <label class="form-label" for="email">Email</label>
        <input type="text" id="email" class="form-control" v-model="profile.email" disabled>
      </div>
      <div class="col-12 col-md-6">
        <label class="form-label" for="displayname">Display Name</label>
        <input type="text" id="displayname" class="form-control" v-model="profile.displayname">
      </div>
    </div>
    <div class="row my-3">
      <div class="col-12 col-md-6">
        <label class="form-label" for="firstname">First Name</label>
        <input type="text" id="firstname" class="form-control" v-model="profile.firstname">
      </div>
      <div class="col-12 col-md-6">
        <label class="form-label" for="lastname">Last Name</label>
        <input type="text" id="lastname" class="form-control" v-model="profile.lastname">
      </div>
    </div>
    <div class="row my-3">
      <div class="col">
        <label class="form-label" for="pronoun">Pronoun</label>
        <input class="form-control" v-model="profile.pronoun" autocomplete="pronoun">
      </div>
    </div>
    <div class="row my-3">
      <div class="col">
        <div v-if="phoneError" class="text-bg-danger">Phone required to volunteer format: 111-222-4444.</div>
        <label class="form-label" for="phone">Phone</label>
        <input class="form-control" v-model="profile.phone" autocomplete="phone" placeholder="111-222-4444" required>
      </div>
    </div>

    <div class="row my-3">
      <div class="col">
        <div>Best days for you:</div>
        <div class="form-check ms-3"><input id="avail_monday" class="form-check-input" type="checkbox" v-model="profile.avail_monday"><label class="form-check-label" for="avail_monday">Monday</label></div>
        <div class="form-check ms-3"><input id="avail_tuesday" class="form-check-input" type="checkbox" v-model="profile.avail_tuesday"><label class="form-check-label" for="avail_tuesday">Tuesday</label></div>
        <div class="form-check ms-3"><input id="avail_thursday" class="form-check-input" type="checkbox" v-model="profile.avail_thursday"><label class="form-check-label" for="avail_thursday">Thursday</label></div>
        <div class="form-check ms-3"><input id="avail_saturday" class="form-check-input" type="checkbox" v-model="profile.avail_saturday"><label class="form-check-label" for="avail_saturday">Saturday</label></div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="form-check mb-3">
          <div v-if="acceptLiftError" class="text-bg-danger">This is required to volunteer.</div>
          <input id="acceptliftclean" class="form-check-input" type="checkbox" v-model="profile.acceptLiftClean" disabled>
          <label for="acceptliftclean" class="form-label">Are you able to safely lift 35 lbs on a regular basis? All of our volunteer positions require physical work including lifting and cleaning.</label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="form-check mb-3">
          <div v-if="acceptParentError" class="text-bg-danger">This is required to volunteer.</div>
          <input id="acceptParent" class="form-check-input" type="checkbox" v-model="profile.acceptParent" disabled>
          <label for="acceptParent" class="form-label">I understand that volunteers under 16 years of age need to be accompanied by a parent.</label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="form-check mb-3">
          <div v-if="acceptFrontLineError" class="text-bg-danger">This is required to volunteer.</div>
          <input id="acceptfrontline" class="form-check-input" type="checkbox" v-model="profile.acceptFrontLine" disabled>
          <label for="acceptfrontline" class="form-label">{{ config.AdminFrontline }}</label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="form-check mb-3">
          <div v-if="acceptTermsError" class="text-bg-danger">You must accept the Terms and Privacy Policy to register and use the site.</div>
          <input id="acceptTerms" class="form-check-input" type="checkbox" v-model="profile.acceptTerms" disabled>
          <label for="acceptTerms" class="form-label">I have read and accept the Terms of use and Privacy Policy.</label>
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label">Is there anything else we should know related to your interest in volunteering at the food bank?</label>
        <textarea class="form-control" v-model="profile.extraNote"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-primary" @click.prevent="save">Save</button>
      </div>
    </div>
  </template>
</div>
</template>
