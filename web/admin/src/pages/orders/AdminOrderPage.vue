<script setup>
import { ref, onBeforeMount } from 'vue'
import { config } from '@/config.js'
import { collection, getFirestore, query, where, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore'
import OrdersTabs from '@/components/OrdersTabs.vue'
import { useUnits } from '@/composables/useUnits.js'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const props = defineProps({
  id: String,
})

const router = useRouter()
const db = getFirestore()
const showSaveMessage = ref(false)
const showErrMessage = ref(false)
const showDeleteMessage = ref(false)
const saveMessage = ref('Item Saved')
const errMessage = ref('An error occurred')
const deleteMessage = ref('Item Deleted')
const currentForm = ref(null)

const units = useUnits().units

const item = ref(
  {
    guestid: '',
    guestname: '',
    numInHousehold: 1,
    numChild: 0,
    numAdult: 1,
    numSenior: 0,
    orderdate: dayjs().toDate(),
    enddate: null,  // TODO: get current form
    delivery: false,
    items: [],
  }
)
const oldName = ref('')

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

const resetShowMessages = () => {
  showSaveMessage.value = false
  showErrMessage.value = false
  showDeleteMessage.value = false
  errMessage.value = 'An error occurred'
}

const saveItem = async () => {
  resetShowMessages()
  try {

    if (props.id !== null && props.id !== '' && props.id !== undefined) {
      const itemRef = doc(db, 'order', props.id)
      await updateDoc(itemRef, item.value)
      showSaveMessage.value = true
    } else {


    }
  } catch(err) {
    showErrMessage.value = true
    console.error(err)
  }
}

onBeforeMount(async() => {
  try {
    currentForm.value = await getCurrentForm()

    if (props.id) {
      const itemRef = doc(db, 'order', props.id)
      const itemSnap = await getDoc(itemRef)
      if (itemSnap.exists()) {
        item.value = itemSnap.data()
        oldName.value = itemSnap.data().guestname
      } else {
        showErrMessage.value = true
        errMessage.value = 'Item does not exist'
      }
    }
  } catch(err) {
    showErrMessage.value = true
    console.error(err)
  }
})
</script>

<template>
<div class="container">
  <OrdersTabs activeTab="Orders" />

  <h1>Admin Order Page</h1>

  <form @submit.prevent="saveItem">
    <div v-if="showSaveMessage" class="p-3 text-bg-success">{{saveMessage}}</div>
    <div v-if="showDeleteMessage" class="p-3 text-bg-success">{{deleteMessage}}</div>
    <div v-if="showErrMessage" class="p-3 text-bg-danger">{{errMessage}}</div>

    <div class="row mb-3">
      <div class="col-md">
        <span class="form-label">Name:</span> {{ item.guestname }}<br>
        <span class="form-label">Phone:</span> {{ item.phone }}<br>
        <span class="form-label">Email:</span> {{ item.email }}<br>
      </div>
      <div class="col-md">
        <div class="form-label">Address:</div>
        {{ item.street }}<br>
        <template v-if="item.street2">{{item.street2}}<br></template>
        {{item.city}}, {{item.state}} {{ item.zipcode }}<br>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md">
        <span class="form-label">Number in Household:</span> {{ item.numInHousehold }}<br>
        <template v-if="item.delivery"><span class="form-label">Pickup/Delivery:</span> Delivery</template>
        <template v-else><span class="form-label">Pickup time:</span> {{ item.pickuptime && item.pickuptime.starttime && dayjs(item.pickuptime.starttime).format('HH:mm a')}}
        - {{ item.pickuptime && item.pickuptime.endtime && dayjs(item.pickuptime.endtime).format('HH:mm a')}}
        </template>
      </div>
      <div class="col-md">
        <span class="form-label">Children:</span> {{ item.numChild }}<br>
        <span class="form-label">Adults:</span> {{ item.numAdult }}<br>
        <span class="form-label">Seniors:</span> {{ item.numSenior }}<br>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <div class="form-label">Order Status:</div>
        <select class="form-select" v-model="item.status">
          <option value="new">New</option>
          <option value="approved">Approved</option>
          <option value="packed">Packed</option>
          <option value="in-transit">In-Transit</option>
          <option value="completed">Completed</option>
          <option value="invalid">Invalid</option>
        </select>

      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <div class="form-label">Items in this order:</div>
        <div v-for="i in item.items" :key="'orderitem' + i.id">
          {{ i.name }}
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </div>
  </form>
</div>
</template>
