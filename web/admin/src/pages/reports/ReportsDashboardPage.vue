<script setup>
import { ref, onBeforeMount } from 'vue'
import ReportsTab from '@/components/reports/ReportsTab.vue'
import { collection, getCountFromServer, getFirestore, doc, addDoc, query, where, setDoc } from 'firebase/firestore'

const db = getFirestore()

const numTotalGuests = ref(0)
const numTotalVolunteers = ref(0)
const numTotalDrivers = ref(0)

onBeforeMount( async ()=>{
  const guestSnap = await getCountFromServer(collection(db, 'guestprofile'))
  numTotalGuests.value = guestSnap.data().count
  const vSnap = await getCountFromServer(query(collection(db, 'volunteerprofilestate'),
                                               where('status', '==', 'active')))
  numTotalVolunteers.value = vSnap.data().count

  const dSnap = await getCountFromServer(query(collection(db, 'volunteerprofilestate'),
                                               where('status', '==', 'active'),
                                               where('isDriver', '==', true),
                                               where('isApprovedDriver', '==', true)
                                              ))
  numTotalDrivers.value = dSnap.data().count


})

</script>

<template>
  <div class="container">
    <ReportsTab activeTab="Dashboard" />

  <div class="row my-3">
    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Total Guests</h5></div>
            <div class="col-2"><i class="bi bi-person fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numTotalGuests }}</h1>
        </div>
      </div >
    </div >

    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Total Volunteers</h5></div>
            <div class="col-2"><i class="bi bi-person-fill fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numTotalVolunteers }}</h1>
        </div>
      </div >
    </div >

    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Total Drivers</h5></div>
            <div class="col-2"><i class="bi bi-car-front fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numTotalDrivers }}</h1>
        </div>
      </div >
    </div >


  </div>



  </div>
</template>
