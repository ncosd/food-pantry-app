<script setup>
import { reactive, computed, onBeforeMount } from 'vue'
import AdminCalendarScheduler from '@/components/AdminCalendarScheduler.vue'
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

const now = new Date()
const windows = reactive({
  entries: new Map(),
  getDay: (day)=>{
     const key = (day.date.getMonth()+1) + '-' + day.date.getDate()
     const entries = windows.entries.get(key)
     // console.log('key='+ key + ' entries=' + entries)
     return entries
  },
})

onBeforeMount( async () =>{
  const begindate = new Date(now.getFullYear(), now.getMonth(), -5)
  const enddate = new Date(now.getFullYear(), now.getMonth()+1,7)

  // console.log('begindate '+ begindate + ' enddate=' + enddate)
  // get the windows for this month
  const db = getFirestore()
  const q = query(collection(db, "window"), where("starttime", ">",begindate), where ('starttime','<',enddate) );
  const querySnapshot = await getDocs(q);
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

    const ed = wd.endtime.toDate()
    // console.log(w.id, ' => ' , sd.getMonth()+1, sd.getDate(), sd.getHours(), sd.getMinutes(), ed.getHours(), ed.getMinutes())
  })
})
</script>

<template>
<div class="container">
 <admin-calendar-scheduler :date="now" :windows="windows"></admin-calendar-scheduler>
</div>
</template>
