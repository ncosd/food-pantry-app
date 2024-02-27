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
  numMaxOrders: 200,
  items: [],
  estimatedTotalWeight: 0,
})

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
      } else {
        showErrMessage = true
        errMessage.value = 'Form does not exist'
      }
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
