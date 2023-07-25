<script setup>
import AdminCalendar from '@/components/AdminCalendar.vue'
import { reactive, computed, onBeforeMount } from 'vue'
import { collection, collectionGroup, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useAuthUserStore } from '@/stores/authUser'

const user = useAuthUserStore()
const now = new Date()
const windows = reactive({
  entries: new Map(),
  attending: new Map(),
  getDay: (day)=>{
     if (!day) { return null }
     const key = (day.date.getMonth()+1) + '-' + day.date.getDate()
     const entries = windows.entries.get(key)
     //console.log('key='+ key + ' entries=' + entries)
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

    //const ed = wd.endtime.toDate()
    // console.log(w.id, ' => ' , sd.getMonth()+1, sd.getDate(), sd.getHours(), sd.getMinutes(), ed.getHours(), ed.getMinutes())
  })

  const attending = query(collectionGroup(db, 'attending'))
  const attendingSnap = await getDocs(attending)
  console.log('user.data.uid=', user.data.uid, 'Before attending collectionGroup snap=', attendingSnap.size)
  attendingSnap.forEach((d)=> {
    if (d.id === user.data.uid) {
      console.log('adding attending winid=', d.data().winid, ' data=', d.data(), d.id)
      windows.attending.set(d.data().winid, d.data())
    } else {
      console.log('skipping winid', d.data().winid, ' uid', d.id)
    }
  })
})
</script>

<template>
  <div class="container">
    <h1>Volunteer Calendar</h1>
    <admin-calendar :date="now" :windows="windows"></admin-calendar>
  </div>
</template>

<style></style>
