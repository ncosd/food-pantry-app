<script setup>
import { ref, onBeforeMount } from 'vue'
import { config } from '@/config.js'
import { collection, getFirestore, query, where, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import OrdersTabs from '@/components/OrdersTabs.vue'
import { useUnits } from '@/composables/useUnits.js'
import { useRouter } from 'vue-router'

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

const units = useUnits().units

const item = ref(
  {
    name: '',
    numInventory: 0,
    weight: 0,
    weightUnits: "ounces"
  }
)
const oldName = ref('')

const resetShowMessages = () => {
  showSaveMessage.value = false
  showErrMessage.value = false
  showDeleteMessage.value = false
  errMessage.value = 'An error occurred'
}

const deleteItem = async() => {
  resetShowMessages()
  try {
    await deleteDoc(doc(db, 'item', props.id))
    showDeleteMessage.value = true
    router.push({name: 'OrderItemListPage'})
  } catch(err) {
    showErrMessage.value = true
    console.error(err)
  }
}

const saveItem = async () => {
  resetShowMessages()
  try {
    // convert numInventory to number
    item.value.numInventory = Number(item.value.numInventory)
    item.value.weight = Number(item.value.weight)

    if (props.id !== null && props.id !== '' && props.id !== undefined) {
      const itemRef = doc(db, 'item', props.id)
      if (item.value.name !== oldName.value) {
        // check if there is something with the new name
        const q = query(collection(db, 'item'), where('name', '==', item.value.name))
        const docs = await getDocs(q)
        if (docs.size > 0) {
          errMessage.value = 'Item with name ' + item.value.name + ' already exists'
          showErrMessage.value = true
          return
        }
      }

      await updateDoc(itemRef, item.value)
      showSaveMessage.value = true
    } else {

      const q = query(collection(db, 'item'), where('name', '==', item.value.name))
      const docs = await getDocs(q)
      if (docs.size > 0) {
        errMessage.value = 'Item with name ' + item.value.name + ' already exists'
        showErrMessage.value = true
        return
      }

      const itemRef = await addDoc(collection(db, 'item'), item.value)
      router.push({name: 'OrderItemListPage'})

    }
  } catch(err) {
    showErrMessage.value = true
    console.error(err)
  }
}

onBeforeMount(async() => {
  try {
    if (props.id) {
      const itemRef = doc(db, 'item', props.id)
      const itemSnap = await getDoc(itemRef)
      if (itemSnap.exists()) {
        item.value = itemSnap.data()
        oldName.value = itemSnap.data().name
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
  <OrdersTabs activeTab="Items" />

  <h1>Order Item</h1>

  <form @submit.prevent="saveItem">
    <div v-if="showSaveMessage" class="p-3 text-bg-success">{{saveMessage}}</div>
    <div v-if="showDeleteMessage" class="p-3 text-bg-success">{{deleteMessage}}</div>
    <div v-if="showErrMessage" class="p-3 text-bg-danger">{{errMessage}}</div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label" for="itemName">Name</label>
        <input id="itemName" type="text" class="form-control" v-model="item.name" required>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label" for="numInventory">Number in Inventory</label>
        <input id="numInventory" type="text" class="form-control" v-model="item.numInventory" required>
      </div>
    </div>

    <div v-if="config.orders.showWeights" class="row mb-3">
      <div class="col">
        <label class="form-label" for="weight">Weight</label>
        <input id="weight" type="text" class="form-control" v-model="item.weight" required>
      </div>
    </div>

    <div v-if="config.orders.showWeights" class="row mb-3">
      <div class="col">
        <label class="form-label" for="weightUnits">Weight Units</label>
        <select id="weightUnits" class="form-select" v-model="item.weightUnits">
          <option v-for="(u,i) in units" :value="u.name" :key="u.name">{{u.displayName}}</option>
        </select>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
      <div class="col text-end">
        <button @click.prevent="deleteItem" class="btn btn-danger" :disabled="props.id === '' || props.id === null || props.id === undefined">Delete</button>
      </div>
    </div>
  </form>
</div>
</template>
