<script setup>
import { ref, onBeforeMount } from 'vue'
import OrdersTabs from '@/components/OrdersTabs.vue'
import { collection, getFirestore, query, where, doc, getDocs, addDoc, updateDoc, orderBy } from 'firebase/firestore'
import SortableTableHeader from '@/components/SortableTableHeader.vue'

const db = getFirestore()
const items = ref()
const sortBy = ref("name")
const sortAsc = ref(true)


const refreshList = async () => {
  const q = query(collection(db, "item"), orderBy(sortBy.value, sortAsc.value ? "asc" : "desc"))
  const itemRef = await getDocs(q)
  const itemarray = []
  itemRef.forEach((item)=> {
    itemarray.push({id:item.id,...item.data()})
  })
  items.value = itemarray
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
  <OrdersTabs activeTab="Items" />

  <div class="mt-3">
    <router-link class="btn btn-primary" :to="{'name':'OrderItemPage'}">New Item</router-link>
  </div>

    <div class="table-responsive-md">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <SortableTableHeader heading="Name" sortKey="name" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <th scope="col">Inventory</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{item.name}}</td>
            <td>{{item.numInventory}}</td>
            <td>
              <router-link class="btn btn-sm btn-primary" :to="{name:'OrderItemPage', params:{id:item.id} }">Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

</div>
</template>
