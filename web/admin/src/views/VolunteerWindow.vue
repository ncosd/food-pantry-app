<script setup>
import { ref, defineProps, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthUserStore } from '@/stores/authUser'
import { collection, getFirestore, query, where, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import dayjs from 'dayjs'
import VolunteersWindowDisclaimer from '@/components/VolunteersWindowDisclaimer.vue'

const props = defineProps({
  id: String,
})

const user = useAuthUserStore()
const db = getFirestore()

var volWindow = ref()
var attending = ref()
var errMsg = ref()
const successMsg = ref()
const isSignedUp = ref(false)
const signedUpMessage = ref('not signed up')
const cancelDisabled = ref(true)
const signupDisabled = ref(false)

onBeforeMount( async () => {
  if (props.id) {
    // console.log('onBeforeMount id=',props.id)
    const winRef = doc(db, 'window', props.id)
    const winSnap = await getDoc(winRef)
    errMsg.value = ''
    if (winSnap.exists()) {
      volWindow.value = winSnap.data()
      const atCollection = await getDocs(collection(winRef, 'attending'))
      if (atCollection.docs.length > 0 && atCollection.docs[0].id === user.data.uid) {
        isSignedUp.value = true
        signedUpMessage.value = 'signed up'
        cancelDisabled.value = false
        signupDisabled.value = true
      }

    } else {
      errMsg.value = 'Error reading window from database, please try again later.'
    }
  }
})


const signUp = (async () => {
  successMsg.value = ''

  const attendRef = doc(db, 'window', props.id, 'attending', user.data.uid)
  const setMerge = await setDoc(attendRef, { name: user.data.displayName, mod: new Date(), winid: props.id}, {update: true})

  isSignedUp.value = true
  signedUpMessage.value = 'signed up'
  successMsg.value = 'You have signed up!'
  cancelDisabled.value = false
  signupDisabled.value = true
})

const cancelWindow = (async ()=>{
  successMsg.value = ''
  const attendRef = doc(db, 'window', props.id, 'attending', user.data.uid)
  await deleteDoc(attendRef)
  cancelDisabled.value = true
  signupDisabled.value = false
  signedUpMessage.value = 'not signed up'
  isSignedUp.value = false
})
</script>

<template>
<div class="container">
  <h1>Volunteer Window</h1>
  <template v-if="errMsg">
    <div class="text-bg-danger">{{errMsg}}</div>
  </template>
  <template v-if="successMsg">
    <div class="text-bg-success">{{successMsg}}</div>
  </template>
  <template v-if="volWindow && volWindow.starttime">
    <div :class="['badge', {'text-bg-success':isSignedUp}, {'text-bg-secondary':!isSignedUp}]">You are {{signedUpMessage}}</div>
    <div>{{ dayjs(volWindow.starttime.toDate()).format('dddd MM/DD/YYYY') }}</div>
    <div>{{ dayjs(volWindow.starttime.toDate()).format('h:mm A') }} - {{ dayjs(volWindow.endtime.toDate()).format('h:mm A') }}</div>
    <div>Volunteers Needed: {{ volWindow.numNeeded }}</div>
    <div>Volunteers Signed up: {{ volWindow.numAttending }}</div>
    <div>Location: {{ volWindow.location }} <i class="bi bi-geo-alt-fill"></i> </div>
    <div>Activity: {{ volWindow.tasktype }}</div>
    <div class="my-3">
      <button class="btn btn-sm btn-primary" @click.prevent="signUp" :disabled="signupDisabled">Sign up</button>
      <button class="btn btn-sm btn-danger mx-3" :disabled="cancelDisabled" @click.prevent="cancelWindow">Cancel</button>
    </div>
    <div class="d-none">
      <button class="btn btn-sm"><i class="bi bi-calendar"></i> Add to Calendar</button>
    </div>
    <div>
      <VolunteersWindowDisclaimer />
    </div>
  </template>
</div>
</template>
