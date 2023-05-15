<script setup>
import { ref, defineProps, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthUserStore } from '@/stores/authUser'
import { collection, getFirestore, query, where, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

const props = defineProps({
  id: String,
})
const user = useAuthUserStore()
var location = ref()
var showSaveMessage = ref(false)
var showDeleteMessage = ref(false)
var saveMessage = ref('Location Saved')
var deleteMessage = ref('Location deleted')

const router = useRouter()

const resetShowMessages = (()=>{
  showSaveMessage.value = false
  showDeleteMessage.value = false
})

const deleteLocation = ( async ()=> {
  console.log('deleteLocation', props.id)
  resetShowMessages()
  const db = getFirestore()
  await deleteDoc(doc(db, "location", props.id))
  showDeleteMessage.value = true
  router.replace({name: 'LocationsList'})
})

const createLocation = ( async ()=>{
  resetShowMessages()
  if (props.id !== null && props.id !== '' && props.id !== undefined) {
    const db = getFirestore()
    const locDocRef = await doc(db, 'location', props.id)
    await updateDoc(locDocRef, location.value)
    showSaveMessage.value = true
    console.log('updated location', locDocRef.id)

  } else {
    const db = getFirestore()
    const locDocRef = await addDoc(collection(db, 'location'), location.value)
    console.log('saved location', locDocRef.id)
    router.replace({name: 'LocationsList'})
  }
})

const clearCreate = ()=>{
  location.value = {
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  }
}

clearCreate()


onBeforeMount( async () => {
  if (props.id) {
    console.log('onBeforeMount id=',props.id)
    const db = getFirestore()
    const locRef = doc(db, 'location', props.id)
    const locSnap = await getDoc(locRef)
    if (locSnap.exists()) {
      location.value = locSnap.data()
    }
  }
})
</script>

<template>
<div class="container">
         <form @submit.prevent="createLocation">
           <div v-if="showSaveMessage" class="text-bg-success">{{saveMessage}}</div>
           <div v-if="showDeleteMessage" class="text-bg-danger">{{deleteMessage}}</div>

           <div class="row">
             <label class="form-label" for="createLocationName">Location Name</label>
             <input id="createLocationName" type="text" class="form-control" v-model="location.name" required>
           </div>

           <div class="row">
             <label class="form-label" for="createStreet">Street</label>
             <input id="createStreet" type="text" class="form-control" v-model="location.street" required>
           </div>

           <div class="row">
             <label class="form-label" for="createCity">City</label>
             <input id="createCity" type="text" class="form-control" v-model="location.city" required>
           </div>

           <div class="row">
             <label class="form-label" for="createState">State</label>
             <input id="createState" type="text" class="form-control" v-model="location.state" required>
           </div>

           <div class="row">
             <label class="form-label" for="createZip">Zip</label>
             <input id="createZip" type="text" class="form-control" v-model="location.zip" required>
           </div>

           <div class="mt-3">
             <div class="row">
               <div class="col">
                 <button type="submit" class="btn btn-primary btn-sm">Save</button>
               </div>
               <div class="col text-end">
                 <button @click.prevent="deleteLocation" class="btn btn-danger btn-sm">Delete</button>
               </div>
             </div>
           </div>
         </form>
</div>
</template>
