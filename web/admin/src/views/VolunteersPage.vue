<script setup>
import { reactive, ref, onBeforeMount } from 'vue'
import VolunteerList from '@/components/VolunteerList.vue'
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';

var volunteers = ref()

const refreshList = ( async () => {
  const db = getFirestore()
  const q = query(collection(db, 'volunteerprofilestate'), where('status', '==', 'in-review'))
  const pstates = await getDocs(q)
  volunteers.value = []
  pstates.forEach((prof)=> {
    volunteers.value.push(prof.data())
  })
})

onBeforeMount( async () => {
  await refreshList()
})
</script>

<template>
<div>
  <volunteer-list :volunteers=volunteers @refresh-list="refreshList"></volunteer-list>
</div>
</template>
