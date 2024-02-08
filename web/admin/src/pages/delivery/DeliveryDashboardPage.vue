<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import DeliveryTabs from '@/components/delivery/DeliveryTabs.vue'
import { collection, getCountFromServer, getFirestore, doc, addDoc, query, where, setDoc } from 'firebase/firestore'

const user = useAuthUserStore()
const db = getFirestore()

const numTotalDestinations = ref('0')
const numOnHold = ref('0')
const numNoRoute = ref('0')
const numDrivers = ref('0')
const numApprovedDrivers = ref('0')
const numActiveVolunteers = ref('0')

onBeforeMount( async () => {
  const destCollection = collection(db, 'deliverydestination')
  const numTotalSnap = await getCountFromServer(query(destCollection))
  numTotalDestinations.value = numTotalSnap.data().count
  const numHoldSnap = await getCountFromServer(query(destCollection, where('onHold', '==', true)))
  numOnHold.value = numHoldSnap.data().count
  // TODO: calculate numNoRoute
  numNoRoute.value = numTotalDestinations.value - numOnHold.value


  const numDriversSnap = await getCountFromServer(query(collection(db, 'volunteerprofilestate'),
                                                        where('status', '==', 'active'),
                                                        where('isDriver', '==', true)))
  numDrivers.value = numDriversSnap.data().count

  const numApprovedDriversSnap = await getCountFromServer(query(collection(db, 'volunteerprofilestate'),
                                                                where('status', '==', 'active'),
                                                                where('isDriver', '==', true),
                                                                where('isApprovedDriver', '==', true),
                                                               ))
  numApprovedDrivers.value = numApprovedDriversSnap.data().count

  const numActiveVolunteersSnap = await getCountFromServer(query(collection(db, 'volunteerprofilestate'),
                                                                 where('status', '==', 'active')))
  numActiveVolunteers.value = numActiveVolunteersSnap.data().count


})
</script>

<template>
<div class="container">
  <DeliveryTabs activeTab="Dashboard" ></DeliveryTabs>

  <div class="row my-3">
    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Total Destinations</h5></div>
            <div class="col-2"><i class="bi bi-geo-alt fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numTotalDestinations }}</h1>
        </div>
      </div >
    </div >

    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Destinations on hold</h5></div>
            <div class="col-2"><i class="bi bi-hourglass-split fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numOnHold }}</h1>
        </div>
      </div >
    </div >

    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Destinations Not on a Route</h5></div>
            <div class="col-2">
              <i v-if="numNoRoute > 0" class="bi bi-exclamation-diamond text-danger fs-3"></i>
              <i v-else class="bi bi-check-circle fs-3"></i>
            </div>
          </div >
          <h1 class="text-center">{{ numNoRoute }}</h1>
        </div>
      </div >
    </div >
  </div>

  <div class="row my-3">
    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Drivers</h5></div>
            <div class="col-2"><i class="bi bi-car-front fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numDrivers }}</h1>
        </div>
      </div >
    </div >

    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Approved Drivers</h5></div>
            <div class="col-2"><i class="bi bi-car-front text-success fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numApprovedDrivers }}</h1>
        </div>
      </div >
    </div >

    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Volunteers</h5></div>
            <div class="col-2"><i class="bi bi-person fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numActiveVolunteers }}</h1>
        </div>
      </div >
    </div >

  </div>


  <h2>There are no deliveries scheduled today.</h2>




</div>
</template>
