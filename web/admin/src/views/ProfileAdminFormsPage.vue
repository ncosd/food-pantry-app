<script setup>
import { ref, onBeforeMount } from 'vue'
import { getFirestore, doc, getDoc, addDoc, collection } from 'firebase/firestore'
import { useAuthUserStore } from '@/stores/authUser'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const props = defineProps({
  driverId: String,
  formName: String,
})

const router = useRouter()
const adminUser = useAuthUserStore()
const db = getFirestore()
const formHtml = ref()
const validForm = ref(true)

const showErr = ref(false)
const showSuccess = ref(false)
const tasks = ref([])


onBeforeMount(async()=>{
  const docRef = doc(db, 'forms', props.formName)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    formHtml.value = docSnap.data().html

    for (let i = 0; i<docSnap.data().tasks.length; i++) {
      tasks.value[i] = docSnap.data().tasks[i]
    }

  } else {
    formHtml.value = '<div><strong>Form ' + props.formName + ' not found in database.</strong></div>'
    validForm.value = false
  }
})

const saveForm = async(formData)=>{
  showSucces.value = false
  showErr.value = false

  try {

  } catch (err) {

  }
}

</script>

<template>
<div class="container">
  <div class="mb-3" v-html="formHtml"></div>

  <template v-if="validForm">
  <div v-for="t in tasks">
    <input class="form-check-input me-3" type="checkbox" >
    <label class="form-label">{{ t }}</label>
  </div>

  <div class="mt-3">
    <label class="form-label me-3" for="approverField">Approver</label>
    <input id="approverField" type="text" class="form-input" v-model="adminUser.data.displayName" disabled>
  </div>

  <div class="mt-3">
    Date: {{ dayjs() }}
  </div>

  <button class="mt-3 btn btn-primary" disabled>Save</button>
  </template>
</div>
</template>
