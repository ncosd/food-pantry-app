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
    guestid: '',
    guestname: '',
    delivery: false,
    items: [],
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
    await deleteDoc(doc(db, 'order', props.id))
    showDeleteMessage.value = true
    router.push({name: 'OrdersListPage'})
  } catch(err) {
    showErrMessage.value = true
    console.error(err)
  }
}

const saveItem = async () => {
  resetShowMessages()
  try {

    if (props.id !== null && props.id !== '' && props.id !== undefined) {
      const itemRef = doc(db, 'order', props.id)
      await updateDoc(itemRef, item.value)
      showSaveMessage.value = true
    } else {

      const q = query(collection(db, 'order'), where('name', '==', item.value.name))
      const docs = await getDocs(q)
      if (docs.size > 0) {
        errMessage.value = 'Item with name ' + item.value.name + ' already exists'
        showErrMessage = true
        return
      }

      const itemRef = await addDoc(collection(db, 'order'), item.value)
      router.push({name: 'OrdersListPage'})

    }
  } catch(err) {
    showErrMessage.value = true
    console.error(err)
  }
}

onBeforeMount(async() => {
  try {
    if (props.id) {
      const itemRef = doc(db, 'order', props.id)
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
  <OrdersTabs activeTab="Orders" />

  <h1>Admin Order Page</h1>

  <form @submit.prevent="saveItem">
    <div v-if="showSaveMessage" class="p-3 text-bg-success">{{saveMessage}}</div>
    <div v-if="showDeleteMessage" class="p-3 text-bg-success">{{deleteMessage}}</div>
    <div v-if="showErrMessage" class="p-3 text-bg-danger">{{errMessage}}</div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label" for="guestName">Guest Name</label>
        <input id="guestName" type="text" class="form-control" v-model="item.guestname" required>
        <div id="guestHelpBlock" class="form-text">Guest ID: {{item.guestid || 'not registered'}}</div>
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
