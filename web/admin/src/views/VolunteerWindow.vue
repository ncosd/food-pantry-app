<script setup>
import { ref, defineProps, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthUserStore } from '@/stores/authUser'
import { collection, getFirestore, query, where, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import dayjs from 'dayjs'

const props = defineProps({
  id: String,
})
const user = useAuthUserStore()
var volWindow = ref()
var errMsg = ref()


onBeforeMount( async () => {
  if (props.id) {
    // console.log('onBeforeMount id=',props.id)
    const db = getFirestore()
    const winRef = doc(db, 'window', props.id)
    const winSnap = await getDoc(winRef)
    errMsg.value = ''
    if (winSnap.exists()) {
      volWindow.value = winSnap.data()
    } else {
      errMsg.value = 'Error reading window from database, please try again later.'
    }
  }
})

function toDate(timestamp) {
  const val = new Date(timestamp*1000)
  return val
}

</script>

<template>
<div class="container">
  <h1>Volunteer Window</h1>
  <template v-if="errMsg">
    <div class="text-bg-danger">{{errMsg}}</div>
  </template>
  <template v-if="volWindow && volWindow.starttime">
    <div>Date: {{ dayjs(toDate(volWindow.starttime)).format('dddd MM/DD/YYYY h:mm A') }} - {{ dayjs(toDate(volWindow.endtime)).format('h:mm A') }}</div>
    <div>Volunteers Needed: {{ volWindow.numNeeded }}</div>
    <div>Location: {{ volWindow.location }} <i class="bi bi-geo-alt-fill"></i> </div>
    <div>Activity: {{ volWindow.tasktype }}</div>
    <div class="my-3">
      <button class="btn btn-sm btn-primary">Sign up</button>
      <button class="btn btn-sm btn-danger mx-3">Cancel</button>
    </div>
  </template>

</div>

</template>
