<script setup>
import { ref, defineProps, onBeforeMount } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { collection, getFirestore, query, where, doc, getDoc, updateDoc } from 'firebase/firestore'

const props = defineProps({
  uid: String,
})
const user = useAuthUserStore()

if (props.uid === '') {
 props.uid = user.data.uid
}

var profile = ref()
var profileRef

const save = ( async ()=>{
  await updateDoc(profileRef, profile.value)
})

onBeforeMount( async () => {
  const db = getFirestore()
  profileRef = doc(db, "volunteerprofile", props.uid)
  const profileSnap = await getDoc(profileRef)
  if (profileSnap.exists()) {
    profile.value = profileSnap.data()
  }
})
</script>

<template>
<div class="container">
  <template v-if="user.isAdmin && uid != user.data.uid"><div class="text-bg-warning">Viewing as admin</div></template>
  <template v-if="profile && profile.email">
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
        <input id="acceptliftclean" class="form-check-input" type="checkbox" v-model="profile.acceptLiftClean">
        <label for="acceptliftclean" class="form-label">Are you able to safely lift 35 lbs on a regular basis? All of our volunteer
          positions require physical work including lifting and cleaning.</label>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <div class="form-check mb-3">
         <div v-if="acceptParentError" class="text-bg-danger">This is required to volunteer.</div>
         <input id="acceptParent" class="form-check-input" type="checkbox" v-model="profile.acceptParent">
         <label for="acceptParent" class="form-label">I understand that volunteers under 16 years of age need to be accompanied by a
              parent.</label>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col">
              <div class="form-check mb-3">
                <div v-if="acceptFrontLineError" class="text-bg-danger">This is required to volunteer.</div>
                <input id="acceptfrontline" class="form-check-input" type="checkbox" v-model="profile.acceptFrontLine">
                <label for="acceptfrontline" class="form-label">Do you accept the front line worker statement?</label>
              </div>
            </div>
  </div>

  <div class="row mb-3">
    <div class="col">
              <label class="form-label">Is there anything else we should know related to your interest in volunteering at
                the food bank?</label>
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
