<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { collection, getFirestore, query, where, doc, getDocs, addDoc, updateDoc, orderBy } from 'firebase/firestore'
import SortableTableHeader from '@/components/SortableTableHeader.vue'
import ConfigTabs from '@/components/ConfigTabs.vue'

const user = useAuthUserStore()
const locations = ref()
const sortBy = ref("name")
const sortAsc = ref(true)

const refreshList = async () => {
  const db = getFirestore()
  const q = query(collection(db, "location"), orderBy(sortBy.value, sortAsc.value ? "asc" : "desc"))
  const locRef = await getDocs(q)
  const locarray = []
  locRef.forEach((loc)=> {
    locarray.push({id:loc.id,...loc.data()})
  })
  locations.value = locarray
}

const sortList = param => {
  sortAsc.value = sortBy.value === param ? !sortAsc.value : true
  sortBy.value = param

  refreshList()
}

onBeforeMount( async () => {
  await refreshList()
})

const mapsquery = (loc)=>{
  const mapurl = 'https://www.google.com/maps/search/?api=1&query='
  const q = loc.street + ',' + loc.city + ',' + loc.state + ',' + loc.zip
  return mapurl + encodeURIComponent(q)
}
</script>

<template>
  <div class="container">
    <ConfigTabs activeTab="Locations" class="mb-3"/>

    <router-link class="btn btn-sm btn-primary" :to="{name:'Location'}">New Location</router-link>
    <div class="table-responsive-md">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <SortableTableHeader heading="Name" sortKey="name" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <SortableTableHeader heading="Display Name" sortKey="displayname" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <SortableTableHeader heading="Street Address" sortKey="street" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <SortableTableHeader heading="City" sortKey="city" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <SortableTableHeader heading="State" sortKey="state" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <SortableTableHeader heading="Zip" sortKey="zip" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <th scope="col">Map</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loc in locations">
            <td>{{loc.name}}</td>
            <td>{{loc.displayname}}</td>
            <td>{{loc.street}}</td>
            <td>{{loc.city}}</td>
            <td>{{loc.state}}</td>
            <td>{{loc.zip}}</td>
            <td><a :href="mapsquery(loc)" target="_"><i class="bi bi-geo-alt-fill"></i></a></td>
            <td>
              <router-link class="btn btn-sm btn-primary" :to="{name:'Location', params:{id:loc.id} }">Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
