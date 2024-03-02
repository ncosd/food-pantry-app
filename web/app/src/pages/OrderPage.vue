<script setup>
import { ref, onBeforeMount } from 'vue'
import { config } from '@/config.js'
import { collection, getFirestore, query, where, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore'
import { useAuthUserStore } from '@/stores/authUser'
import dayjs from 'dayjs'


const props = defineProps({
  id: String,
})

const db = getFirestore()
const user = useAuthUserStore()
const showSaveMessage = ref(false)
const showErrMessage = ref(false)
const showDeleteMessage = ref(false)
const saveMessage = ref('Item Saved')
const errMessage = ref('An error occurred')
const deleteMessage = ref('Item Deleted')
const currentForm = ref(null)
const order = ref(
  {
    guestid: user.data.uid,
    guestname: user.data.displayName,
    orderdate: dayjs().toDate(),
    enddate: null,
    delivery: false,
    items: [],
    note: '',
  }
)

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
const saveOrder = async () => {
  console.log('saveOrder')

  order.value.formid = currentForm.value.id
  order.value.enddate = currentForm.value.enddate


  console.log('order', order.value)


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

        Order form here.  {{ currentForm.id }}


        <div class="row mt-3">
          <div class="col">
            <button type="submit" class="btn btn-primary">Save Order</button>
          </div>
        </div>

      </form>
    </div>
  </template>

</div>
</template>
