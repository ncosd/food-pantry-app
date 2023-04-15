<script setup>
import { ref, onBeforeMount } from 'vue'
import VolunteerList from '@/components/VolunteerList.vue'
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';

var volunteers = ref([])

onBeforeMount( async () => {
  const db = getFirestore()
  const q = query(collection(db, 'volunteerprofilestate'), where('status', '==', 'in-review'))
  const pstates = await getDocs(q)

  pstates.forEach((prof)=> {
    volunteers.value.push(prof.data())
  })
})
</script>

<template>
<div>
  <volunteer-list :volunteers=volunteers></volunteer-list>
</div>
</template>
