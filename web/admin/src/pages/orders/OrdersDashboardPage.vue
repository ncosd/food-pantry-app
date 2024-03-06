<script setup>
import { ref, onBeforeMount } from 'vue'
import OrdersTabs from '@/components/OrdersTabs.vue'
import { collection, getFirestore, query, where, doc, getDoc, getDocs, addDoc, updateDoc, orderBy, deleteDoc, getCountFromServer } from 'firebase/firestore'
import dayjs from 'dayjs'

const db = getFirestore()
const currentForm = ref(null)
const numTotalOrders = ref(0)
const numPickupOrders = ref(0)
const numDeliveryOrders = ref(0)
const numCompletedOrders = ref(0)
const numPickedUp = ref(0)
const numDelivered = ref(0)

const getCurrentForm = async ()=> {
  const now = dayjs()
  const q = query(collection(db, 'orderform'), where('enddate', '>', now.toDate()), orderBy('enddate', 'asc'))
  const formDocs = await getDocs(q)
  if (formDocs.size === 0) { return null }
  if (formDocs.size === 1) {
    const formSnap = formDocs.docs[0]
    return {id:formSnap.id, ...formSnap.data()}
  }
  // TODO: find the right one, if there are more staged up
  console.log(formDocs)
  return {id:formSnap.id, ...formSnap.data()}
}


onBeforeMount(async()=>{
  currentForm.value = await getCurrentForm()
  if (currentForm.value) {
    const numOrdersSnap = await getCountFromServer(query(collection(db, 'order'), where('formid', '==', currentForm.value.id)))
    numTotalOrders.value = numOrdersSnap.data().count
    const numPickupOrdersSnap = await getCountFromServer(query(collection(db, 'order'), where('formid', '==', currentForm.value.id),
                                                              where('delivery', '==', false)))
    numPickupOrders.value = numPickupOrdersSnap.data().count
    const numDeliveryOrdersSnap = await getCountFromServer(query(collection(db, 'order'), where('formid', '==', currentForm.value.id),
                                                              where('delivery', '==', true)))
    numDeliveryOrders.value = numDeliveryOrdersSnap.data().count
    const numCompletedOrdersSnap = await getCountFromServer(query(collection(db, 'order'), where('formid', '==', currentForm.value.id),
                                                              where('status', '==', 'completed')))
    numCompletedOrders.value = numCompletedOrdersSnap.data().count
    const numPickedupOrdersSnap = await getCountFromServer(query(collection(db, 'order'), where('formid', '==', currentForm.value.id),
                                                              where('delivery', '==', false), where('status', '==', 'completed')))
    numPickedUp.value = numPickedupOrdersSnap.data().count
    const numDeliveredOrdersSnap = await getCountFromServer(query(collection(db, 'order'), where('formid', '==', currentForm.value.id),
                                                              where('delivery', '==', true), where('status', '==', 'completed')))
    numDelivered.value = numDeliveredOrdersSnap.data().count



  }
})
</script>

<template>
<div class="container">
  <OrdersTabs activeTab="Dashboard" />

  <div class="my-3">
    <template v-if="currentForm">
      Current Form: {{ dayjs(currentForm.startdate.toDate()).format('D MMM YYYY h:mm a z') }} - {{ dayjs(currentForm.enddate.toDate()).format('D MMM YYYY h:mm a z') }}
      <router-link :to="{'name':'OrderFormPage', params: { id: currentForm.id}}">Edit Form</router-link>
    </template>
    <template v-else>No current form found</template>
  </div>

  <div class="row my-3">
    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Total Orders</h5></div>
            <div class="col-2"><i class="bi bi-cart fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numTotalOrders }}</h1>
        </div>
      </div >
    </div >

    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Pickup Orders</h5></div>
            <div class="col-2"><i class="bi bi-bag fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numPickupOrders }}</h1>
        </div>
      </div >
    </div >

    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Delivery Orders</h5></div>
            <div class="col-2">
              <i class="bi bi-car-front fs-3"></i>
            </div>
          </div >
          <h1 class="text-center">{{ numDeliveryOrders }}</h1>
        </div>
      </div >
    </div >
  </div>

  <div class="row my-3">
    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Completed Orders</h5></div>
            <div class="col-2"><i class="bi bi-bag-check fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numCompletedOrders }}</h1>
        </div>
      </div >
    </div >

    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Picked Up</h5></div>
            <div class="col-2"><i class="bi bi-bag-check fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numPickedUp }}</h1>
        </div>
      </div >
    </div >
    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Delivered</h5></div>
            <div class="col-2"><i class="bi bi-house-check fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numDelivered }}</h1>
        </div>
      </div >
    </div >

  </div>


</div>
</template>
