<script setup>
import { ref, onBeforeMount } from 'vue'
import { config } from '@/config.js'
import { collection, getFirestore, query, where, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, setDoc, orderBy } from 'firebase/firestore'
import { useAuthUserStore } from '@/stores/authUser'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: String,
})

const db = getFirestore()
const user = useAuthUserStore()
const router = useRouter()
const showSaveMessage = ref(false)
const showErrMessage = ref(false)
const showDeleteMessage = ref(false)
const saveMessage = ref('Order Saved')
const errMessage = ref('An error occurred')
const deleteMessage = ref('Order Deleted')
const currentForm = ref(null)
const profile = ref(null)
const order = ref(
  {
    guestid: user.data.uid,
    guestname: user.data.displayName,
    orderdate: dayjs().toDate(),
    enddate: null,
    numInHousehold: 1,
    numChild: 0,
    numAdult: 0,
    numSenior: 0,
    delivery: false,
    items: [],
    note: '',
  }
)

const getProfile = async () => {
  const prof = await getDoc(doc(db, 'guestprofile', user.data.uid))
  return prof.data()
}

const getCurrentForm = async ()=> {
  const now = dayjs()
  const q = query(collection(db, 'orderform'), where('enddate', '>', now.toDate()), orderBy('enddate', 'asc'))
  const formDocs = await getDocs(q)
  if (formDocs.size === 0) { console.log('no orders'); return null }
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

const checkValidProfile = () => {
  let isValid = true
  if (!profile.value.firstname ||
      !profile.value.lastname ||
      !profile.value.phone ||
      !profile.value.street ||
      !profile.value.city ||
      !profile.value.state ||
      !profile.value.zipcode ||
      !profile.value.numInHousehold ||
      isNaN(profile.value.numInHousehold)
     ) {
    isValid = false
  }
  return isValid
}


onBeforeMount(async() => {
  try {
    currentForm.value = await getCurrentForm()
    profile.value = await getProfile()

    if (!checkValidProfile()) {
      console.log('checkValidProfile false')
      router.push({name:'GuestProfilePage', query: { msg: 'You must fill out your profile completely before creating an order.'}})
    }

    if (props.id) {
      const orderRef = doc(db, 'order', props.id)
      const orderSnap = await getDoc(orderRef)
      if (orderSnap.exists()) {
        order.value = orderSnap.data()
      }


    } else {

      // check if order exists formid.userid
      const orderId = currentForm.value.id + '-' + user.data.uid
      const orderRef = doc(db, 'order', orderId)
      const orderSnap = await getDoc(orderRef)
      if (orderSnap.exists()) {
        order.value = orderSnap.data()
      } else {
        order.value.guestname = profile.value.firstname + ' ' + profile.value.lastname
        order.value.phone = profile.value.phone
        order.value.street = profile.value.street
        order.value.street2 = profile.value.street2 || ''
        order.value.city = profile.value.city
        order.value.state = profile.value.state
        order.value.zipcode = profile.value.zipcode
        order.value.numInHousehold = profile.value.numInHousehold
        order.value.numChild = profile.value.numChild
        order.value.numAdult = profile.value.numAdult
        order.value.numSenior = profile.value.numSenior
        order.value.email = user.data.email
      }

    }
  } catch(err) {
    showErrMessage.value = true
    console.error(err)
  }
})

const saveOrder = async () => {
  resetShowMessages()

  delete order.value.status

  // set delivery flag
  if (order.value.pickuptime === '{delivery:true}') {
    order.value.delivery = true
  } else {
    order.value.delivery = false
  }

  try {
    if (props.id) {
      const orderRef = doc(db, 'order', props.id)
      await updateDoc(orderRef, order.value)
      showSaveMessage.value = true

    } else {
      order.value.formid = currentForm.value.id
      order.value.enddate = currentForm.value.enddate
      order.value.pickupdate = currentForm.value.pickupdate

      // orderId is formid.userid
      const orderId = currentForm.value.id + '-' + user.data.uid
      const orderRef = doc(db, 'order', orderId)
      await setDoc(orderRef, order.value, { merge: true})
      showSaveMessage.value = true
    }
  } catch (err) {
    showErrMessage.value = true
    console.error(err)
  }

}
</script>

<template>
<div class="container">
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><RouterLink :to="{name:'HomePage'}">Home</RouterLink></li>
      <li class="breadcrumb-item active" aria-current="page">Order</li>
    </ol>
  </nav>

  <template v-if="!currentForm">
    <div class="mt-3">
      <p>Orders are not being taken at this time.</p>
    </div>
  </template>

  <template v-else>
    <div class="mt-3">
      <h1 class="fs-3">Order ends {{ dayjs(currentForm.enddate.toDate()).format('MM-DD-YYYY h:mm a') }}</h1>

      <form @submit.prevent="saveOrder">

        <div v-if="showSaveMessage" class="p-3 text-bg-success">{{saveMessage}}</div>
        <div v-if="showDeleteMessage" class="p-3 text-bg-danger">{{deleteMessage}}</div>
        <div v-if="showErrMessage" class="p-3 text-bg-danger">{{errMessage}}</div>

        <div class="row mt-3">
          <div class="col">
            <span class="form-label">Name:</span> {{ order.guestname }}<br>
            <span class="form-label">Phone:</span> {{ order.phone }}<br>
            <span class="form-label">Email:</span> {{ order.email }}<br>
          </div>
          <div class="col-md">
            <div class="form-label">Address:</div>
            {{ order.street }}<br>
            <template v-if="order.street2">{{order.street2}}<br></template>
            {{order.city}}, {{order.state}} {{ order.zipcode }}<br>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-md">
            <span class="form-label">Number in Household:</span> {{ order.numInHousehold }}<br>
          </div>
          <div class="col-md">
            <span class="form-label">Children:</span> {{ order.numChild }}<br>
            <span class="form-label">Adults:</span> {{ order.numAdult }}<br>
            <span class="form-label">Seniors:</span> {{ order.numSenior }}<br>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col">
            <span class="form-label">Order Status:</span> {{ order.status || 'new' }}
          </div>
        </div>


        <div class="row mt-3">
          <div class="col">
            <div class="fs-3">Pick up date: {{ dayjs(currentForm.pickupdate.toDate()).format('ddd MM/DD/YYYY') }}</div>
            <div class="form-label me-3">Choose a 30 minute window to pick up the order. You must arrive in the 30 minute window you select.</div>

            <div class="form-check" v-for="p in currentForm.pickuptimes">
              <input class="form-check-input" type="radio" name="flexRadioDefault" :id="'pickup'+dayjs(p.starttime).format('HHmm')"
                     v-model="order.pickuptime" :value="p">
              <label class="form-check-label" for="flexRadioDefault1">
                {{ dayjs(p.starttime).format('hh:mm a') }} - {{ dayjs(p.endtime).format('hh:mm a') }}
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="pickupDelivery"
                     v-model="order.pickuptime" value="{delivery:true}">
              <label class="form-check-label" for="flexRadioDefault1">
                My food is delivered
              </label>
            </div>
          </div>
        </div>


        <div class="row mt-3">
          <div class="col">
            <div class="fs-3">Choose items</div>
          </div>
        </div>

        <div class="row mt-3" v-for="item in currentForm.items" :key="item.id">
          <div class="col">

            <input class="form-check-input" type="checkbox" :value="item" v-model="order.items" :id="'orderitem'+item.id">
            <label class="form-check-label ms-3" :for="'orderitem' + item.id">{{ item.name }}</label>
          </div>
        </div>


        <template v-if="showSaveMessage || showDeleteMessage || showErrMessage">
          <div class="row mt-3">
            <div class="col">
              <div v-if="showSaveMessage" class="p-3 text-bg-success">{{saveMessage}}</div>
              <div v-if="showDeleteMessage" class="p-3 text-bg-danger">{{deleteMessage}}</div>
              <div v-if="showErrMessage" class="p-3 text-bg-danger">{{errMessage}}</div>
            </div>
          </div>
        </template>

        <div class="row mt-3">
          <div class="col">
            <button type="submit" class="btn btn-primary" :disabled="order.status === 'completed' || order.status === 'in-transit'">Save Order</button>
          </div>
        </div>

      </form>
    </div>
  </template>

</div>
</template>
