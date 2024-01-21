<script setup>
import { ref, onMounted } from 'vue'
import { collection, getFirestore, query, where, doc, getDocs, addDoc, updateDoc, orderBy } from 'firebase/firestore'
import SortableTableHeader from '@/components/SortableTableHeader.vue'
import { useAuthUserStore } from '@/stores/authUser'
import DeliveryTabs from '@/components/delivery/DeliveryTabs.vue'

const user = useAuthUserStore()
const db = getFirestore()
const destinations = ref()
const sortBy = ref('guestName')
const sortAsc = ref(true)

const refreshList = async () => {
  const q = query(collection(db, 'deliverydestination'), orderBy(sortBy.value, sortAsc.value ? 'asc' : 'desc'))
  const destSnap = await getDocs(q)
  const destArray = []
  destSnap.forEach((d)=>{
    destArray.push({ id: d.id, ...d.data() })
  })
  destinations.value = destArray
}

const sortList = param => {
  sortAsc.value = sortBy.value === param ? !sortAsc.value : true
  sortBy.value = param
  refreshList()
}

onMounted( async () => {
  await refreshList()
})


</script>

<template>
<div class="container">
  <DeliveryTabs activeTab="Destinations" ></DeliveryTabs>

  <div class="m-3">
    <router-link class="btn btn-primary" :to="{name:'DestinationPage'}">Create New</router-link>
  </div>

  <div class="tabel-responsive-md">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <SortableTableHeader heading="Guest" sortKey="guestName" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList"/>
          <SortableTableHeader heading="Street" sortKey="street" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList"/>
          <SortableTableHeader heading="Apt/Suite" sortKey="street2" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList"/>
          <SortableTableHeader heading="City" sortKey="city" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList"/>
          <SortableTableHeader heading="State" sortKey="state" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList"/>
          <SortableTableHeader heading="Zip" sortKey="zip" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList"/>
          <SortableTableHeader heading="On Hold" sortKey="onHold" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList"/>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in destinations" :key="d.id">
          <td>{{d.guestName}}</td>
          <td>{{d.street}}</td>
          <td>{{d.street2}}</td>
          <td>{{d.city}}</td>
          <td>{{d.state}}</td>
          <td>{{d.zip}}</td>
          <td><i class="bi bi-check-circle-fill text-danger" v-if="d.onHold"></i></td>
          <td><router-link :to="{name:'DestinationPage', params: {id:d.id}}">Edit</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
