<script setup>
import { ref, defineProps, onBeforeMount, onMounted } from 'vue'
import { collection, getFirestore, query, where, doc, getDocs, getDoc, addDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

const props = defineProps({
  date: String,
  id: String,
})

const router = useRouter()
var data = {}
const windowEntry = ref()
const locations = ref()
const tasks = ref()

onBeforeMount( async () => {
  const db = getFirestore()
  const q = query(collection(db, "location"))
  const locRef = await getDocs(q)
  const locarray = []
  locRef.forEach((loc)=> {
    locarray.push({id:loc.id,...loc.data()})
  })
  locations.value = locarray

  const taskq = query(collection(db, "tasktype"))
  const taskRef = await getDocs(taskq)
  const taskarray = []
  taskRef.forEach( (t)=>{
    taskarray.push({id:t.id,...t.data()})
  })
  tasks.value = taskarray

  if (props.id !== undefined && props.id !== '') {
    const db = getFirestore()
    const winRef = doc(db, 'window', props.id)
    const winSnap = await getDoc(winRef)
    if (winSnap.exists()) {
      data = winSnap.data()

      // scheduledate set from starttime/endtime
      windowEntry.value = data
      scheduleDate = data.starttime.toDate()
      endDate = data.endtime.toDate()
      range.value = [scheduleDate, endDate]
    } else {
      console.log('Error reading window from database, please try again later.')
    }
  }

})

function toDate(timestamp) {
  const val = new Date(timestamp*1000)
  return val
}

var scheduleDate = new Date()
var endDate = new Date()
if ((props.date !== undefined) && (props.date !== '')) {
  scheduleDate = new Date(props.date)
  scheduleDate.setHours(11)
  scheduleDate.setMinutes(0)
  endDate = new Date(scheduleDate)
  endDate.setTime(scheduleDate.getTime()+(3*60*60*1000))

  data.numNeeded = 2
  data.starttime = scheduleDate
  data.endtime = endDate

  console.log('here date='+props.date)
} else if (props.id !== undefined && props.id !== '') {
  console.log(' else if id='+props.id)

}

windowEntry.value = data

const range = ref()
range.value = [scheduleDate, endDate]

const save = (async ()=>{
  const db = getFirestore()
  windowEntry.value.starttime = range.value[0]
  windowEntry.value.endtime = range.value[1]

  if (props.id !== undefined && props.id !== '') {
    const windowRef = doc(db, 'window', props.id)
    await updateDoc(windowRef, windowEntry.value)
  } else {
    const windowRef = await addDoc(collection(db, 'window'), windowEntry.value)
    console.log('saved windowEntry id=' + windowRef.id)
  }
  router.replace({name: 'Schedule'})
})

const saveNew = (()=>{
  console.log('saveNew')
})

const deleteWindow = (async () => {
  if (props.id === undefined || props.id === '') {
    console.log('Delete failed, no id')
    return
  }
  const db = getFirestore()
  await deleteDoc(doc(db, "window", props.id))
  router.replace({name:'Schedule'})
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
            <option v-for="loc in locations" :value="loc.name">{{ loc.name }}</option>
          </select>
        </div>
      </div>

      <div class="row my-3">
        <div class="col">
          <label class="form-label" for="tasktype">Task Type</label>
          <select id="tasktype" class="form-select" v-model="windowEntry.tasktype">
            <option v-for="tt in tasks" :value="tt.name">{{ tt.name }}</option>
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
          <button class="btn btn-danger btn-sm" @click.prevent="deleteWindow">Delete</button>
        </div>
      </div>

    </form>
    </div>
</template>
