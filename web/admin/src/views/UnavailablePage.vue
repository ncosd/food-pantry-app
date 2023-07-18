<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from 'dayjs'
import { useAuthUserStore } from '@/stores/authUser'
import { useRouter } from 'vue-router'
import { collection, getFirestore, query, where, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'


function toDate(timestamp) {
  const val = new Date(timestamp*1000)
  return val
}

const user = useAuthUserStore()
const showDeleteMessage = ref(false)

var startDate = new Date()
startDate.setHours(0)
startDate.setMinutes(0)
var endDate = new Date()
endDate.setDate(endDate.getDate()+1)
endDate.setHours(0)
endDate.setMinutes(0)
const range = ref([startDate, endDate])

const unavailList = [
{ startDate: "2023-07-01",
  endDate: "2023-07-14",
  id: "1111",
  }]

const deleteUnavail = (async (unid) => {
  const db = getFirestore()
  await deleteDoc(doc(db, 'unavail', user.data.uid, 'ua', unid))
  showDeleteMessage.value = true
})
</script>

<template>
  <div class="container">
  <h1>Schedule your unavailability</h1>

    <form >
      <div class="row my-3">
        <div class="col">
          <label class="form-label" for="a">Time Window</label>
          <vue-date-picker v-model="range" range></vue-date-picker>
        </div>
      </div>

      <div class="row my-3">
        <div class="col">
          <button class="btn btn-primary btn-sm" @click.prevent="save">Save</button>
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
    <tr v-for="u in unavailList">
      <td>{{u.startDate}}</td>
      <td>{{u.endDate}}</td>
      <td>
        <button class="btn btn-sm btn-secondary" @click="deleteUnavail(u.id)"><i class="bi bi-trash-fill"></i> Delete</button>
        <button class="ms-3 btn btn-sm btn-secondary" @click="editUnavail(u.id)"><i class="bi bi-pencil-fill"></i> Edit</button>
      </td>
    </tr>
  </tbody>
  </table>
  </div>

  </div>
</template>
