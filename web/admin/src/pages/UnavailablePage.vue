<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from 'dayjs'
import { useAuthUserStore } from '@/stores/authUser'
import { useRouter } from 'vue-router'
import { collection, getFirestore, query, where, doc, getDocs, addDoc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore'


function toDate(timestamp) {
  const val = new Date(timestamp*1000)
  return val
}

const user = useAuthUserStore()
const showDeleteMessage = ref(false)
const showSavedMessage = ref(false)
const showStartErrorMessage = ref(false)

var startDate = ref(new Date())
startDate.value.setHours(0)
startDate.value.setMinutes(0)
var endDate = ref(new Date())
endDate.value.setHours(0)
endDate.value.setMinutes(0)
endDate.value.setDate(endDate.value.getDate()+1)
const unavailList = ref()

const resetMessages = () => {
  showDeleteMessage.value = false
  showSavedMessage.value = false
  showStartErrorMessage.value = false
}

onBeforeMount( async () => {
  await loadUnavails()
})

const loadUnavails = (async () => {
  const db = getFirestore()
  const q = query(collection(db, 'unavail', user.data.uid, 'ua'), orderBy('startDate'))
  const unavailsRef = await getDocs(q)
  unavailList.value = unavailsRef
})

const deleteUnavail = (async (unid) => {
  const db = getFirestore()
  await deleteDoc(doc(db, 'unavail', user.data.uid, 'ua', unid))
  showDeleteMessage.value = true
  await loadUnavails()
})

const saveUnavail = (async () => {
  const db = getFirestore()
  resetMessages()
  if (dayjs(startDate.value).isAfter(dayjs(endDate.value))) {
    showStartErrorMessage.value = true
    return
  }

  await addDoc(collection(db, 'unavail', user.data.uid, 'ua'),
    {
      'startDate': startDate.value,
      'endDate': endDate.value,
      'name': user.data.displayName,
    }
  )
  showSavedMessage.value = true
  await loadUnavails()

})
</script>

<template>
  <div class="container">
  <h1>Schedule your unavailability</h1>

    <form>
      <div class="row my-3">
        <div class="col">
          <template v-if="showStartErrorMessage"><div class="text-bg-danger">Start Date must be before End Date</div></template>
          <template v-if="showSavedMessage"><div class="text-bg-success">Saved!</div></template>
          <label class="form-label" for="startDate">Start Date</label>
          <vue-date-picker v-model="startDate" id="startDate" :enable-time-picker="false"></vue-date-picker>
        </div>
      </div>

      <div class="row my-3">
        <div class="col">
          <label class="form-label" for="endDate">End Date</label>
          <vue-date-picker v-model="endDate" id="endDate" :enable-time-picker="false"></vue-date-picker>
        </div>
      </div>

      <div class="row my-3">
        <div class="col">
          <button class="btn btn-primary btn-sm" @click.prevent="saveUnavail">Save</button>
        </div>
      </div>
    </form>


  <h2>Upcoming unavailable dates</h2>

  <template v-if="showDeleteMessage">
  <div class="text-bg-warning">
  Deleted unavailability.
  </div>
  </template>

  <div class="table-responsive-md">
  <table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">Start Date</th>
      <th scope="col">End Date</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <template v-if="unavailList && unavailList.docs.length > 0">
    <tr v-for="u in unavailList.docs">
      <td>{{dayjs(u.data().startDate.toDate()).format('MM/DD/YYYY')}}</td>
      <td>{{dayjs(u.data().endDate.toDate()).format('MM/DD/YYYY')}}</td>
      <td>
        <button class="btn btn-sm btn-secondary" @click="deleteUnavail(u.id)"><i class="bi bi-trash-fill"></i> Delete</button>
      </td>
    </tr>
    </template>
  </tbody>
  </table>
  </div>

  </div>
</template>
