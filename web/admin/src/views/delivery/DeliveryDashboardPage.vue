<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import DeliveryTabs from '@/components/delivery/DeliveryTabs.vue'
import { collection, getCountFromServer, getFirestore, doc, addDoc, query, where, setDoc } from 'firebase/firestore'

const user = useAuthUserStore()
const db = getFirestore()

const numTotalDestinations = ref('0')
const numOnHold = ref('0')
const numNoRoute = ref('3')

onBeforeMount( async () => {
  const destCollection = collection(db, 'deliverydestination')
  const numTotalSnap = await getCountFromServer(query(destCollection))
  numTotalDestinations.value = numTotalSnap.data().count
  const numHoldSnap = await getCountFromServer(query(destCollection, where('onHold', '==', true)))
  numOnHold.value = numHoldSnap.data().count
  // TODO: calculate numNoRoute
  numNoRoute.value = numTotalDestinations.value - numOnHold.value

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
            <div class="col-2"><i class="bi bi-truck fs-3"></i></div>
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
            <div class="col-3"><i class="bi bi-exclamation-diamond text-danger fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numNoRoute }}</h1>
        </div>
      </div >
    </div >
  </div>

  <h2>There are no deliveries scheduled today.</h2>




</div>
</template>
