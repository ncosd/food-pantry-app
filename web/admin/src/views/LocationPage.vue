<script setup>
import { ref, defineProps, onBeforeMount } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { collection, getFirestore, query, where, doc, getDocs, addDoc, updateDoc } from 'firebase/firestore'

const props = defineProps({
  id: String,
})
const user = useAuthUserStore()
const locations = ref()

var isSuccess = ref(false)
var isError = ref(false)
var errMessage = ref('')
var createName = ref('')
var createStreet = ref('')
var createCity = ref('')
var createState = ref('')
var createZip = ref('')
const createLocation = ( async ()=>{
  console.log('createLocation', createName.value, createStreet.value, createCity.value, createState.value, createZip.value)
  const locdata = { name: createName.value, street: createStreet.value, city: createCity.value, state: createState.value, zip: createZip.value }
  const db = getFirestore()
  const locDocRef = await addDoc(collection(db, 'location'), locdata)
  console.log('saved location', locDocRef.id)
})

const clearCreate = ()=>{
  console.log('clear')
  createName.value = ""
  createStreet.value = ""
  createCity.value = ""
  createState.value = ""
  createZip.value = ""
}

onBeforeMount( async () => {
  const db = getFirestore()
  const q = query(collection(db, "location"))
  const locRef = await getDocs(q)
  const locarray = []
  locRef.forEach((loc)=> {
    locarray.push(loc.data())
  })
  locations.value = locarray

})

var showCreate = ref(false)

const toggleCreate = ( ()=>{
  showCreate.value = !showCreate.value
})

</script>

<template>
<div class="container">
         <form @submit.prevent="createLocation">
           <div class="row">
             <div v-if="nameError" class="text-bg-danger">Name validation error</div>
             <label class="form-label" for="createLocationName">Location Name</label>
             <input id="createLocationName" type="text" class="form-control" v-model="createName" required>
           </div>

           <div class="row">
             <div v-if="streetError" class="text-bg-danger">Street validation error</div>
             <label class="form-label" for="createStreet">Street</label>
             <input id="createStreet" type="text" class="form-control" v-model="createStreet" required>
           </div>

           <div class="row">
             <div v-if="cityError" class="text-bg-danger">Name validation error</div>
             <label class="form-label" for="createCity">City</label>
             <input id="createCity" type="text" class="form-control" v-model="createCity" required>
           </div>

           <div class="row">
             <div v-if="nameError" class="text-bg-danger">Name validation error</div>
             <label class="form-label" for="createState">State</label>
             <input id="createState" type="text" class="form-control" v-model="createState" required>
           </div>

           <div class="row">
             <div v-if="nameError" class="text-bg-danger">Name validation error</div>
             <label class="form-label" for="createZip">Zip</label>
             <input id="createZip" type="text" class="form-control" v-model="createZip" required>
           </div>

           <div class="mt-3">
             <div class="row">
               <div class="col">
                 <button type="submit" class="btn btn-primary btn-sm">Save</button>
               </div>
               <div class="col text-end">
                 <button class="btn btn-danger btn-sm">Delete</button>
               </div>
             </div>
           </div>
         </form>
</div>
</template>
