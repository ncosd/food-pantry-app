<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const user = useAuthUserStore()
const status = ref(false)

onBeforeMount( async() => {
  const db = getFirestore()
  const stateRef = doc(db, "volunteerprofilestate", user.data.uid)
  const stateSnap = await getDoc(stateRef)
  if (stateSnap.exists()) {
      status.value = stateSnap.data().status
  }
})
</script>

<template>
<div class="container">
  <p v-if="status == 'inactive'">Your account is inactive.  Please contact the office to re-activate it.</p>
  <p v-else >Your volunteer status is under review and may take a couple of days to process.</p>
  <p>You may need to logout and login again for permission changes to take effect.</p>
</div>
</template>
