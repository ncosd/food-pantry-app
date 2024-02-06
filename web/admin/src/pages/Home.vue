<script setup>
import AdminCalendar from '@/components/AdminCalendar.vue'
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { collection, collectionGroup, getDocs, getFirestore, query, where, orderBy } from "firebase/firestore";
import { useAuthUserStore } from '@/stores/authUser'
import dayjs from 'dayjs'
import ColorKey from '@/components/ColorKey.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const viewDate = ref(route.query.date ? dayjs(route.query.date, 'YYYYMMDD') : dayjs())
const user = useAuthUserStore()
const windows = reactive({
  entries: new Map(),
  attending: new Map(),
  unavails: new Map(),
  getDay: (day)=>{
    if (!day) { return null }
    const key = (day.date.getMonth()+1) + '-' + day.date.getDate()
    const entries = windows.entries.get(key)
    // console.log('key='+ key + ' entries=' + entries)
    return entries
  },
  getUnavail: (day)=> {
    if (!day) { return null }
    const key = (day.date.getMonth()+1) + '-' + day.date.getDate()
    const unavail = windows.unavails.get(key)
    if (unavail) {
      return [unavail]
    }
  },
})

const loadUnavails = async() => {
  const begindate = new Date(viewDate.value.get('year'), viewDate.value.get('month'), -5)
  const enddate = new Date(viewDate.value.year(), viewDate.value.month() + 1,7)
  const db = getFirestore()
  const q = query(collection(db,'unavail',user.data.uid,'ua'), where('startDate', '>=', begindate), where('startDate','<=',enddate), orderBy('startDate'))
  const unavailsRef = await getDocs(q)
  return unavailsRef
}

const refreshUnavails = async() => {
  const unavailSnapshot = await loadUnavails()
  windows.unavails.clear()
  unavailSnapshot.forEach( (u)=> {
    const data = u.data()
    data.id = u.id
    const sd = data.startDate.toDate()
    const key = (sd.getMonth()+1) + '-' + sd.getDate()
    windows.unavails.set(key, data)
    // check if enddate is later
    // const ed = data.endDate.toDate()
    // console.log('refreshUnavails sd, ed', sd, ed)
    // if (ed !== sd) {
    //   console.log('refreshUnavails diff sd!=ed', sd, ed)
    // }
  })
}

const computeWindows = async () => {
  const begindate = new Date(viewDate.value.get('year'), viewDate.value.get('month'), -5)
  const enddate = new Date(viewDate.value.year(), viewDate.value.month() + 1,7)

  // console.log('computeWindows begindate '+ begindate + ' enddate=' + enddate)
  // get the windows for this month
  const db = getFirestore()
  const q = query(collection(db, "window"), where("starttime", ">",begindate), where ('starttime','<',enddate) );
  const querySnapshot = await getDocs(q);
  windows.entries.clear()
  querySnapshot.forEach((w)=> {
    const wd = w.data()
    wd.id = w.id
    const sd = wd.starttime.toDate()
    const key = (sd.getMonth()+1) + '-' + sd.getDate()
    var entries = windows.entries.get(key)
    if (!entries) {
      entries = []
      windows.entries.set(key, entries)
    }
    entries.push(wd)

    //const ed = wd.endtime.toDate()
    // console.log(w.id, ' => ' , sd.getMonth()+1, sd.getDate(), sd.getHours(), sd.getMinutes(), ed.getHours(), ed.getMinutes())
  })

  const attending = query(collectionGroup(db, 'attending'))
  const attendingSnap = await getDocs(attending)

  attendingSnap.forEach((d)=> {
    if (d.id === user.data.uid) {
      windows.attending.set(d.data().winid, d.data())
    }
  })
}


onBeforeMount( async () =>{
  await computeWindows()
  await refreshUnavails()
})

const changeDate = async (newDate) => {
  router.push({
    name: 'Home',
    query: { date: newDate.format('YYYYMMDD') }
  })
  viewDate.value = dayjs(newDate, 'YYYYMMDD')
  await computeWindows()
  await refreshUnavails()

}

</script>

<template>
  <div class="container">
    <h1>Volunteer Calendar</h1>
    <ColorKey />
    <admin-calendar :date="viewDate" :windows="windows" @change-date="changeDate"></admin-calendar>
  </div>
</template>

<style></style>
