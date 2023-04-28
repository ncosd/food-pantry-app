<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { collection, getFirestore, query, where, doc, getDoc, addDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from 'dayjs'

const props = defineProps({
  date: String,
  id: String,
})

const data = {}
const windowEntry = ref()

var scheduleDate = new Date()
var endDate = new Date()
if (props.date !== '') {
  scheduleDate = new Date(props.date)
  scheduleDate.setHours(11)
  scheduleDate.setMinutes(0)
  endDate = new Date(scheduleDate)
}
endDate.setTime(scheduleDate.getTime()+(3*60*60*1000))

if (props.id !== '') {

}

data.location = 'NCFB'
data.tasktype = 'SummerMeal'
data.numNeeded = 1
data.starttime = scheduleDate
data.endtime = endDate
windowEntry.value = data

const range = ref()
range.value = [scheduleDate, endDate]

const save = (async ()=>{
  const db = getFirestore()
  windowEntry.value.starttime = range.value[0]
  windowEntry.value.endtime = range.value[1]

  // TODO: query the db to make sure there isn't already a window for this.
  const windowRef = await addDoc(collection(db, 'window'), windowEntry.value)

  console.log('saved windowEntry id=' + windowRef.id)
})

const saveNew = (()=>{
  console.log('saveNew')
})
</script>

<template>
  <div class="container">
    <h1>Schedule Volunteer Window</h1>
    <h2>{{dayjs(scheduleDate).format('dddd MM/DD/YYYY')}}  {{dayjs(range[0]).format('h:mm A')}} - {{dayjs(range[1]).format('h:mm A')}}</h2>

    <form >
      <div v-if="showSaveMessage" class="text-bg-success">{{saveMessage}}</div>
      <div v-if="showDeleteMessage" class="text-bg-danger">{{deleteMessage}}</div>

      <div class="row my-3">
        <div class="col">
          <label class="form-label" for="location">Location</label>
          <select id="location" class="form-select" v-model="windowEntry.location">
            <option value="NCFB">NCFB</option>
            <option value="TheShack">The Shack - Ardmore Community Center</option>
          </select>
        </div>
      </div>

      <div class="row my-3">
        <div class="col">
          <label class="form-label" for="tasktype">Task Type</label>
          <select id="tasktype" class="form-select" v-model="windowEntry.tasktype">
            <option value="SummerMeal">Summer Meal Distribution</option>
            <option value="Holiday">Holiday - Closed</option>
          </select>
        </div>
      </div>

      <div class="row my-3">
        <div class="col">
          <label class="form-label" for="numVolunteers">Number of Volunteers</label>
          <select id="numVolunteers" class="form-select" v-model="windowEntry.numNeeded">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
            <option value="0">0</option>
          </select>
        </div>
      </div>

      <div class="row my-3">
        <div class="col">
          <label class="form-label" for="a">Time Window</label>
          <vue-date-picker v-model="range" range></vue-date-picker>
        </div>
      </div>

      <div class="row my-3">
        <div class="col">
          <button class="btn btn-primary btn-sm" @click.prevent="save">Save</button>
          <button class="mx-3 btn btn-primary btn-sm" @click.prevent="saveNew">Save & New</button>
        </div>
        <div class="col">
        </div>
      </div>

    </form>
    </div>
</template>
