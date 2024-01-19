<script setup>
import { ref, onBeforeMount } from 'vue'
import { getFirestore, doc, getDoc, setDoc, addDoc, updateDoc, collection } from 'firebase/firestore'
import { useAuthUserStore } from '@/stores/authUser'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const props = defineProps({
  volunteerId: String,
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
const userForm = ref({tasks: []})
const completed = ref(false)
const approver = ref('')
const approverName = ref('')
const dateApproved = ref(null)

import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)


onBeforeMount(async()=>{
  const docRef = doc(db, 'forms', props.formName)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    formHtml.value = docSnap.data().html

    for (let i = 0; i<docSnap.data().tasks.length; i++) {
      tasks.value[i] = docSnap.data().tasks[i]
    }

    // look up if there is a processed form
    const processedRef = doc(db, 'processedForms', props.volunteerId, 'forms', props.formName)
    const processedSnap = await getDoc(processedRef)
    if (processedSnap.exists()) {
      completed.value = processedSnap.data().completed
      dateApproved.value = dayjs(processedSnap.data().date.toDate())
      approver.value = processedSnap.data().approver
      approverName.value = processedSnap.data().approverName

      // map the task checkboxes
      if (processedSnap.data().tasks) {
        for (let i = 0; i < processedSnap.data().tasks.length; i++) {
          userForm.value.tasks.push(processedSnap.data().tasks[i])
        }
      }
    }

  } else {
    formHtml.value = '<div><strong>Form ' + props.formName + ' not found in database.</strong></div>'
    validForm.value = false
  }
})

const saveForm = async(formData)=>{
  showSuccess.value = false
  showErr.value = false

  // Check all the tasks are completed
  let checkCompleted = true
  for (let i=0; i < tasks.value.length; i++) {
    // TODO: do a deep comparison, but for now just verify the number of items is there
    if (!userForm.value.tasks[i]) {
      checkCompleted = false
    }
  }
  completed.value = checkCompleted

  try {
    console.log('props.volunteerId', props.volunteerId, 'formName', props.formName)
    const processedRef = doc(db, 'processedForms', props.volunteerId,'forms', props.formName)
    const result = await setDoc(processedRef, {
      'completed': completed.value,
      'date': dayjs().toDate(),
      'tasks': userForm.value.tasks,
      'approver': adminUser.data.uid,
      'approverName': adminUser.data.displayName,
    })

    // Update the VolunteerProfileState with the isDriverApproved value.
    const vps = doc(db, 'volunteerprofilestate', props.volunteerId)
    await updateDoc(vps, { isApprovedDriver: completed.value })

    showSuccess.value = true
  } catch (err) {
    console.log('err', err)
    showSuccess.value = false
    showErr.value = true
  }
}
</script>

<template>
<div class="container">
  <div class="mb-3" v-html="formHtml"></div>

  <template v-if="validForm">
    <div v-for="t in tasks" :key="t.id">
      <input class="form-check-input me-3" type="checkbox" v-model="userForm.tasks" :value="t">
      <label class="form-label">{{ t.text }}</label>
    </div>

    <div class="mt-3">
      <label class="form-label me-3" for="approverField">Approver</label>
      <input id="approverField" type="text" class="form-input" v-model="adminUser.data.displayName" disabled>
    </div>

    <div class="mt-3" v-if="dateApproved != null">
      Date: {{ dateApproved.format('L LT') }}
    </div>

    <button class="mt-3 btn btn-primary" @click="saveForm">Save</button>

    <div v-if="showErr" class="text-danger">
      <p>Saved, but not marked completed.</p>
    </div>
    <div v-if="showSuccess" class="text-success">
      <p>Saved, marked <span v-if="completed">completed</span><span v-else>not complete.</span></p>
    </div>

  </template>
</div>
</template>
