<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { collection, getFirestore, query, where, doc, getDocs, addDoc, updateDoc, orderBy } from 'firebase/firestore'
import SortableTableHeader from '@/components/SortableTableHeader.vue'
import ConfigTabs from '@/components/ConfigTabs.vue'

const user = useAuthUserStore()
const tasktypes = ref()
const sortBy = ref("name")
const sortAsc = ref(true)
const db = getFirestore()

const refreshList = async () => {
  const q = query(collection(db, "tasktype"), orderBy(sortBy.value, sortAsc.value ? "asc" : "desc"))
  const ttRef = await getDocs(q)
  const ttarray = []
  ttRef.forEach((tt)=> {
    ttarray.push({id:tt.id,...tt.data()})
  })
  tasktypes.value = ttarray
}

const sortList = param => {
  sortAsc.value = sortBy.value === param ? !sortAsc.value : true
  sortBy.value = param

  refreshList()
}

onBeforeMount( async () => {
  await refreshList()
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
            <SortableTableHeader heading="Name" sortKey="name" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <SortableTableHeader heading="Display Name" sortKey="displayname" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <SortableTableHeader heading="Description" sortKey="description" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tt in tasktypes" :key="tt.name">
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
