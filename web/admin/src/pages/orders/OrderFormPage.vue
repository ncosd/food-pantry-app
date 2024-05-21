<script setup>
import { ref, onBeforeMount } from 'vue'
import { config } from '@/config.js'
import { collection, getFirestore, query, where, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore'
import OrdersTabs from '@/components/OrdersTabs.vue'
import dayjs from 'dayjs'
import VueDatePicker from '@vuepic/vue-datepicker'
import { VueDraggable } from 'vue-draggable-plus'
import { useUnits } from '@/composables/useUnits.js'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/useThemeStore.js'

const props = defineProps({
  id: String,
})

const themer = useThemeStore()
const router = useRouter()
const db = getFirestore()
const showSaveMessage = ref(false)
const showErrMessage = ref(false)
const showDeleteMessage = ref(false)
const saveMessage = ref('Form saved.')
const errMessage = ref('An error occurred')
const deleteMessage = ref('Form deleted')
const units = useUnits().units
const items = ref([])

const formData = ref({
  startdate: dayjs().toDate(),
  enddate: dayjs().toDate(),
  pickupdate: dayjs().add(7, 'day').toDate(),
  genpickuptime: { hours: 10, minutes: 0},
  pickuptimes: [],
  displaypickuptimes: [],
  numMaxOrders: 200,
  items: [],
  estimatedTotalWeight: 0,
})

const generatePickuptimes = () => {
  let times = []

  let start = dayjs({ hour: orderForm.value.genpickuptime.hours, minute: orderForm.value.genpickuptime.minutes })
  let endtime = start.add(29, 'minute')
  for (let i=0; i < 10; i++) {
    times.push({ starttime: {hour:start.hour(), minute: start.minute()}, endtime: { hour:endtime.hour(), minute: endtime.minute()}})
    start = start.add(30,'minute')
    endtime = endtime.add(30, 'minute')
  }

  orderForm.value.displaypickuptimes = times
  orderForm.value.pickuptimes = times
}

const addEarlier = () => {
  let first = orderForm.value.displaypickuptimes[0]
  let st = dayjs(first.starttime).subtract(30, 'minute')
  let en = dayjs(first.endtime).subtract(30, 'minute')
  orderForm.value.displaypickuptimes.unshift({starttime: { hour: st.hour(), minute: st.minute()}, endtime: {hour: en.hour(), minute: en.minute()}})
}

const addLater = () => {
  let last = orderForm.value.displaypickuptimes[orderForm.value.displaypickuptimes.length-1]
  let st = dayjs(last.starttime).add(30, 'minute')
  let en = dayjs(last.endtime).add(30, 'minute')
  orderForm.value.displaypickuptimes.push({starttime: { hour: st.hour(), minute: st.minute()}, endtime: {hour: en.hour(), minute: en.minute()}})
}

const orderForm = ref(formData)

const onAddOrder = (ev) => {

}

const onRemoveOrder = (ev) => {

}

const resetShowMessages = () => {
  showSaveMessage.value = false
  showErrMessage.value = false
  showDeleteMessage.value = false
  errMessage.value = 'An error occurred'
}

const getItems = async() => {
  try {
    const q = query(collection(db, 'item'), orderBy('name', 'asc'))
    const orderItems = await getDocs(q)
    const itemArray = []
    orderItems.forEach( (item) => {
      itemArray.push({
        id: item.id,
        num: 1,
        maxTotal: 100,
        ...item.data()})
    })
    items.value = itemArray

  } catch (err) {
    errMessage.value = 'Error occurred reading items'
    console.error(err)
    showErrMessage.value = true
  }
}


onBeforeMount(async() => {
  await getItems()

  try {
    if (props.id) {
      const formRef = doc(db, 'orderform', props.id)
      const formSnap = await getDoc(formRef)
      if (formSnap.exists()) {
        orderForm.value = formSnap.data()
        orderForm.value.startdate = formSnap.data().startdate.toDate()
        orderForm.value.enddate = formSnap.data().enddate.toDate()
        if (formSnap.data().pickupdate) {
          orderForm.value.pickupdate = formSnap.data().pickupdate.toDate()
        }
      } else {
        showErrMessage.value = true
        errMessage.value = 'Form does not exist'
      }

      // remove the items in the OrderForm already
      const filtered = items.value.filter( x => !orderForm.value.items.find(y => (y.id === x.id)))
      items.value = filtered

    } else {
      // generate initial pickuptimes
      generatePickuptimes()
    }
  } catch (err) {
    showErrMessage.value = true
    console.error(err)
  }
})

const saveForm = async() => {
  resetShowMessages()
  try {
    if (props.id !== null && props.id !== '' && props.id !== undefined) {
      const formRef = doc(db, 'orderform', props.id)
      await updateDoc(formRef, orderForm.value)
      showSaveMessage.value = true
    } else {
      const formRef = await addDoc(collection(db, 'orderform'), orderForm.value)
      showSaveMessage.value = true
      console.log('saved id', formRef.id)
      router.push({name: 'OrderFormListPage'})
    }
  } catch (err) {
    showErrMessage.value = true
    console.error(err)
  }
}

const deleteItem = async() => {
  resetShowMessages()
  try {
    await deleteDoc(doc(db, 'orderform', props.id))
    showDeleteMessage.value = true
    router.push({name: 'OrderFormListPage'})
  } catch(err) {
    showErrMessage.value = true
    console.error(err)
  }
}
</script>

<template>
<div class="container">
  <OrdersTabs activeTab="Forms" />

  <h1 class="mt-3">Order Form</h1>

  <form @submit.prevent="saveForm">
    <div v-if="showSaveMessage" class="text-bg-success p-3">{{saveMessage}}</div>
    <div v-if="showDeleteMessage" class="text-bg-success p-3">{{deleteMessage}}</div>
    <div v-if="showErrMessage" class="text-bg-danger p-3">{{errMessage}}</div>

    <div class="row my-3">
      <div class="col">
        <label class="form-label" for="dp-input-beginDate">Date and time Order form opens</label>
        <VueDatePicker uid="beginDate" v-model="orderForm.startdate" required :dark="themer.isDark" format="MM/dd/yyyy hh:mm a"></VueDatePicker>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label" for="dp-input-endDate">Date and time order form closes</label>
        <VueDatePicker uid="endDate" v-model="orderForm.enddate" required :dark="themer.isDark" format="MM/dd/yyyy hh:mm a"></VueDatePicker>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label" for="dp-input-pickupDate">Pickup/Delivery Date</label>
        <VueDatePicker uid="pickupDate" v-model="orderForm.pickupdate" required :dark="themer.isDark" format="MM/dd/yyyy" type="date" date-picker :enable-time-picker="false"></VueDatePicker>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label" for="dp-input-pickupStartTime">Generate Pickup Times start</label>
        <VueDatePicker uid="pickupDate" v-model="orderForm.genpickuptime" required :dark="themer.isDark" format="hh:mm a" time-picker></VueDatePicker>
        <button class="mt-2 btn btn-secondary btn-sm" type="button" @click="generatePickuptimes">Generate</button>
        <div class="form-text">Clicking generate will erase and re-create the pickup times below.</div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <div class="form-label">Pickup times</div>
        <div class="form-check" v-for="t in orderForm.displaypickuptimes" :key="t.starttime">
          <input class="form-check-input" type="checkbox" :value="t" v-model="orderForm.pickuptimes">
          <label class="form-check-label">{{ dayjs(t.starttime).format('hh:mm a') }} - {{ dayjs(t.endtime).format('hh:mm a')}}</label>
        </div>
        <div class="mt-3"><button class="btn btn-secondary btn-sm" type="button" @click="addEarlier">Add earlier</button> <button class="ms-3 btn btn-secondary btn-sm" type="button" @click="addLater">Add later</button></div>

      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label" for="numMaxOrders">Maximum Number of Orders allowed</label>
        <input id="numMaxOrders" type="text" class="form-control" v-model="orderForm.numMaxOrders" required>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <div class="py-3">Choose Items</div>
        <div class="d-flex ">
          <div class="d-flex col-6 flex-column">
            <div>On Form</div>
            <VueDraggable v-model="orderForm.items"
                          class="d-flex flex-column border w-75"
                          group="items"
                          style="min-height:200px;"
                          @add="onAddOrder"
                          @remove="onRemoveOrder"
                          >
              <div v-for="item in orderForm.items" :key="item.id" class="border border-1 p-2">
                {{ item.name }} - {{ item.num }}
              </div>
            </VueDraggable>
          </div>
          <div class="d-flex col-6 flex-column">
            <div>Inventory</div>
            <VueDraggable v-model="items" group="items" class="d-flex flex-column w-75 border"
                          style="min-height:200px;">
              <div v-for="item in items" :key="item.id" class="border border-1 p-2">
                {{ item.name }} - {{ item.num }}
              </div>
            </VueDraggable>
          </div>
        </div>
      </div>
    </div>


    <div class="row mb-3">
      <div class="col">
        <div class="py-3">Item Limits</div>
        <div class="table-responsive-md">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Item</th>
                <th>Num in Order</th>
                <th>Maximum total all orders</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in orderForm.items" :key="i.id">
                <td>{{i.name}}</td>
                <td><input type="text" v-model="i.num" /></td>
                <td><input type="text" v-model="i.maxTotal" /></td>
              </tr>
              <tr v-for="i in items" :key="i.id">
                <td>{{i.name}}</td>
                <td><input type="text" v-model="i.num" /></td>
                <td><input type="text" v-model="i.maxTotal" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="row mb-3" v-if="config.orders.showWeights">
      <div class="col">
        Estimated weight of order: {{ orderForm.estimatedTotalWeight / 16.0 }} pounds
      </div>
    </div>

    <div v-if="showSaveMessage" class="text-bg-success p-3">{{saveMessage}}</div>
    <div v-if="showDeleteMessage" class="text-bg-success p-3">{{deleteMessage}}</div>
    <div v-if="showErrMessage" class="text-bg-danger p-3">{{errMessage}}</div>

    <div class="row mb-3">
      <div class="col">
        <button class="btn btn-primary" type="submit" id="saveButton">Save</button>
      </div>
      <div class="col text-end">
        <button @click.prevent="deleteItem" class="btn btn-danger" :disabled="props.id === '' || props.id === null || props.id === undefined">Delete</button>
      </div>
    </div>
  </form>
</div>
</template>
