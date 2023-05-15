<script setup>
import { ref, defineProps, onBeforeMount } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { collection, getFirestore, query, where, doc, getDocs, addDoc, updateDoc } from 'firebase/firestore'

const user = useAuthUserStore()
const locations = ref()

onBeforeMount( async () => {
  const db = getFirestore()
  const q = query(collection(db, "location"))
  const locRef = await getDocs(q)
  const locarray = []
  locRef.forEach((loc)=> {
    locarray.push({id:loc.id,...loc.data()})
  })
  locations.value = locarray

})

const mapsquery = ( (loc)=>{
const mapurl = 'https://www.google.com/maps/search/?api=1&query='
const q = loc.street + ',' + loc.city + ',' + loc.state + ',' + loc.zip
  return mapurl + encodeURIComponent(q)
})

</script>

<template>
  <div class="container">
    <router-link class="btn btn-sm btn-primary" :to="{name:'Location'}">New Location</router-link>
    <div class="table-responsive-md">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Display Name</th>
            <th scope="col">Street Address</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">zip</th>
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
