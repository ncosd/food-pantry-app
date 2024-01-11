<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthUserStore } from '@/stores/authUser'
import { collection, getFirestore, query, where, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

const props = defineProps({
  id: String,
})
const user = useAuthUserStore()
var tasktype = ref()
var showSaveMessage = ref(false)
var showDeleteMessage = ref(false)
var saveMessage = ref('Location Saved')
var deleteMessage = ref('Location deleted')

const router = useRouter()

const resetShowMessages = (()=>{
  showSaveMessage.value = false
  showDeleteMessage.value = false
})

const deleteTaskType = ( async ()=> {
  console.log('deleteTaskType', props.id)
  resetShowMessages()
  const db = getFirestore()
  await deleteDoc(doc(db, "tasktype", props.id))
  showDeleteMessage.value = true
  router.replace({name: 'TaskTypesList'})
})

const createTaskType = ( async ()=>{
  resetShowMessages()
  if (props.id !== null && props.id !== '' && props.id !== undefined) {
    const db = getFirestore()
    const ttDocRef = await doc(db, 'tasktype', props.id)
    await updateDoc(ttDocRef, tasktype.value)
    showSaveMessage.value = true
    console.log('updated tasktype', ttDocRef.id)

  } else {
    const db = getFirestore()
    const ttDocRef = await addDoc(collection(db, 'tasktype'), tasktype.value)
    console.log('saved tasktype', ttDocRef.id)
  }

  router.replace({name: 'TaskTypesList'})
})

const clearCreate = ()=>{
  tasktype.value = {
    name: '',
    displayname: '',
    description: '',
  }
}

clearCreate()

onBeforeMount( async () => {
  if (props.id) {
    console.log('onBeforeMount id=',props.id)
    const db = getFirestore()
    const ttRef = doc(db, 'tasktype', props.id)
    const ttSnap = await getDoc(ttRef)
    if (ttSnap.exists()) {
      tasktype.value = ttSnap.data()
    }
  }
})
</script>

<template>
<div class="container">
         <form @submit.prevent="createTaskType">
           <div v-if="showSaveMessage" class="text-bg-success">{{saveMessage}}</div>
           <div v-if="showDeleteMessage" class="text-bg-danger">{{deleteMessage}}</div>

           <div class="row">
             <label class="form-label" for="taskTypeName">Name</label>
             <input id="taskTypeName" type="text" class="form-control" v-model="tasktype.name" required>
           </div>

           <div class="row">
             <label class="form-label" for="taskTypeDisplayName">Display Name</label>
             <input id="taskTypeDisplayName" type="text" class="form-control" v-model="tasktype.displayname" required>
           </div>

           <div class="row">
             <label class="form-label" for="taskTypeDescription">Description</label>
             <input id="taskTypeDescription" type="text" class="form-control" v-model="tasktype.description" required>
           </div>
           <div class="mt-3">
             <div class="row">
               <div class="col">
                 <button type="submit" class="btn btn-primary btn-sm">Save</button>
               </div>
               <div class="col text-end">
                 <button @click.prevent="deleteTaskType" class="btn btn-danger btn-sm">Delete</button>
               </div>
             </div>
           </div>
         </form>
</div>
</template>
