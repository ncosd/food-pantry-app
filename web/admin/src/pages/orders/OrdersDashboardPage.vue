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
const numExpectedOrders = ref(0)  // predict from previous order
const numItemsOnForm = ref(0)
const numItemsOrdered = ref(0)

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
  if (currentForm.value && currentForm.value.items) {
    numItemsOnForm.value = currentForm.value.items.length
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
            <div class="col"><h5 class="card-title">Expected Orders</h5></div>
            <div class="col-2"><i class="bi bi-bag-plus fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numExpectedOrders }}</h1>
        </div>
      </div >
    </div >

    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Items on Form</h5></div>
            <div class="col-2"><i class="bi bi-list-check fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numItemsOnForm }}</h1>
        </div>
      </div >
    </div >
    <div class="col-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row">
            <div class="col"><h5 class="card-title">Items Ordered</h5></div>
            <div class="col-2"><i class="bi bi-bag-check fs-3"></i></div>
          </div >
          <h1 class="text-center">{{ numItemsOrdered }}</h1>
        </div>
      </div >
    </div >

  </div>


</div>
</template>
