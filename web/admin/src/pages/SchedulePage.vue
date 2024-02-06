<script setup>
import { ref, reactive, computed, onBeforeMount } from 'vue'
import AdminCalendarScheduler from '@/components/AdminCalendarScheduler.vue'
import { collection, collectionGroup, query, where, getDocs, getFirestore } from "firebase/firestore";
import dayjs from 'dayjs'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const viewDate = ref(route.query.date ? dayjs(route.query.date, 'YYYYMMDD') : dayjs())
const windows = reactive({
  entries: new Map(),
  unavails: new Map(),
  getDay: (day)=>{
    const key = (day.date.getMonth()+1) + '-' + day.date.getDate()
    const entries = windows.entries.get(key)
    // console.log('key='+ key + ' entries=' + entries)
    return entries
  },
  getUnavail: (day)=> {
    if (!day) { return null }
    const key = (day.date.getMonth()+1) + '-' + day.date.getDate()
    const unavails = windows.unavails.get(key)
    // console.log('getUnavail key', key, 'unavails', unavails)
    return unavails
  },

})

const refreshWindows = async()=>{
  const begindate = new Date(viewDate.value.get('year'), viewDate.value.get('month'), -5)
  const enddate = new Date(viewDate.value.year(), viewDate.value.month() + 1,7)
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

    // const ed = wd.endtime.toDate()
    // console.log(w.id, ' => ' , sd.getMonth()+1, sd.getDate(), sd.getHours(), sd.getMinutes(), ed.getHours(), ed.getMinutes())
  })

}

onBeforeMount( async () =>{
  await refreshWindows()
  await refreshUnavails()
})

const refreshUnavails = async()=>{
  const begindate = new Date(viewDate.value.get('year'), viewDate.value.get('month'), -5)
  const enddate = new Date(viewDate.value.year(), viewDate.value.month() + 1,7)
  const db = getFirestore()
  const vacays = query(collectionGroup(db, 'ua'), where("startDate", ">=", begindate), where("startDate", "<=", enddate))
  const vacaySnap = await getDocs(vacays)
  windows.unavails.clear()
  vacaySnap.forEach( (v)=>{
    const ud = v.data()
    ud.id = v.id
    const startdate = dayjs(ud.startDate.toDate())
    const enddate = dayjs(ud.endDate.toDate())
    const days = enddate.diff(startdate, 'day')
    // console.log('days', days)
    for (let i=0; i<days;i++) {
      const key = (startdate.month()+1) + '-' + (startdate.date()+i)
      var out = windows.unavails.get(key)
      if (!out) {
        out = []
        windows.unavails.set(key, out)
      }
      out.push(ud)
      // console.log('push ', key, 'ud', ud, out)
    }
  })
}

const changeDate = async (newDate) => {
  router.push({
    name: 'Schedule',
    query: { date: dayjs(newDate).format('YYYYMMDD') }
  })
  viewDate.value = dayjs(newDate, 'YYYYMMDD')
  await refreshWindows()
  await refreshUnavails()
}
</script>

<template>
<div class="container">
 <admin-calendar-scheduler :date="viewDate" :windows="windows" @change-date="changeDate"></admin-calendar-scheduler>
</div>
</template>
