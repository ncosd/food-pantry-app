<script setup>
import { reactive, computed, ref, onBeforeMount } from "vue"
import VolunteerList from "@/components/VolunteerList.vue"
import { collection, getFirestore, query, where, getDocs, orderBy } from "firebase/firestore"

const volunteers = ref()
const statusFilter = ref("all")
const sortBy = ref("firstname")
const sortAsc = ref(true)
const driverFilter = ref(false)
const approvedDriverFilter = ref(false)

const refreshList = async () => {
  const db = getFirestore()
  const volunteerCollection = collection(db, "volunteerprofilestate")
  let q = query(volunteerCollection, orderBy(sortBy.value, sortAsc.value ? "asc" : "desc"))
  if (statusFilter.value != 'all') {
    q = query(q, where("status", "==", statusFilter.value))
  }

  if (driverFilter.value) {
    q = query(q, where('isDriver', '==', true))
  }
  if (approvedDriverFilter.value) {
    q = query(q, where('isApprovedDriver', '==', true))
  }

  const pstates = await getDocs(q)
  volunteers.value = []
  pstates.forEach(prof => {
    volunteers.value.push(prof.data())
  })
}

const sortList = param => {
  sortAsc.value = sortBy.value === param ? !sortAsc.value : true
  sortBy.value = param

  refreshList()
}

onBeforeMount(async () => {
  await refreshList()
})
</script>

<template>
<div class="container">

  <h1>Volunteers</h1>
  <div class="p-2 m-3">
    <div><b>Filter</b></div>
    <div class="row ms-1" >
      <div class="col">
        <input id="driverFilter" class="form-check-input me-2" type="checkbox" v-model="driverFilter" @change="refreshList">
        <label class="form-check-label" for="driverFilter"><i class="bi bi-car-front" title="Driver"></i> Driver</label>

        <input id="approvedDriverFilter" class="form-check-input ms-3 me-2" type="checkbox" v-model="approvedDriverFilter" @change="refreshList">
        <label class="form-check-label" for="approvedDriverFilter"><i class="bi bi-check-circle text-success"></i> Approved Driver</label>

      </div>
    </div>

    <div class="row mb-3 ms-1">
      <div class="col">
        <label class="col-form-label" for="statusFilter">Status</label>
        <select class="form-select" id="statusFilter" v-model="statusFilter" @change="refreshList">
          <option value="all">All</option>
          <option value="in-review">in-review</option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
      </div>
    </div>
  </div>
  <volunteer-list :volunteers="volunteers" :sortBy="sortBy" :sortAsc="sortAsc" @refresh-list="refreshList" @sort-list="sortList"></volunteer-list>
</div>
</template>
