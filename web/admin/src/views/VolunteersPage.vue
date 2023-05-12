<script setup>
import { reactive, computed, ref, onBeforeMount } from 'vue'
import VolunteerList from '@/components/VolunteerList.vue'
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';

var volunteers = ref()
const statusFilter = ref('in-review')

const refreshList = ( async () => {
  const db = getFirestore()
  const q = query(collection(db, 'volunteerprofilestate'), where('status', '==', statusFilter.value))
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
<div class="container">
  <div class="row ms-1">
    <div class="col">
    <b>Filter</b>  Status: <select v-model="statusFilter" @change="refreshList">
    <option value='in-review'>in-review</option>
    <option value='active'>active</option>
    <option value='inactive'>inactive</option>
    </select>
    </div>
  </div>

  <volunteer-list :volunteers=volunteers @refresh-list="refreshList"></volunteer-list>
</div>
</template>
