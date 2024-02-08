<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { collection, getFirestore, query, where, doc, getDocs, addDoc, updateDoc, orderBy } from 'firebase/firestore'
import ConfigTabs from '@/components/ConfigTabs.vue'

const user = useAuthUserStore()
const tasktypes = ref()

onBeforeMount( async () => {
  const db = getFirestore()
  const q = query(collection(db, "tasktype"), orderBy('name'))
  const ttRef = await getDocs(q)
  const ttarray = []
  ttRef.forEach((tt)=> {
    ttarray.push({id:tt.id,...tt.data()})
  })
  tasktypes.value = ttarray

})
</script>

<template>
  <div class="container">
    <ConfigTabs activeTab="TaskTypes" class="mb-3"/>

    <router-link class="btn btn-sm btn-primary" :to="{name:'TaskType'}">New TaskType</router-link>
    <div class="table-responsive-md">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Display Name</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tt in tasktypes">
            <td>{{tt.name}}</td>
            <td>{{tt.displayname}}</td>
            <td>{{tt.description}}</td>
            <td>
              <router-link class="btn btn-sm btn-primary" :to="{name:'TaskType', params:{id:tt.id} }">Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
