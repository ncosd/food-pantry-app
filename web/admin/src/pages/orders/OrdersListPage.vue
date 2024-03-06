<script setup>
import { ref, onBeforeMount } from 'vue'
import OrdersTabs from '@/components/OrdersTabs.vue'
import { collection, getFirestore, query, where, doc, getDocs, addDoc, updateDoc, orderBy } from 'firebase/firestore'
import SortableTableHeader from '@/components/SortableTableHeader.vue'
import dayjs from 'dayjs'

const db = getFirestore()
const items = ref()
const sortBy = ref("guestname")
const sortAsc = ref(true)


const refreshList = async () => {
  const q = query(collection(db, "order"), orderBy(sortBy.value, sortAsc.value ? "asc" : "desc"))
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
  <OrdersTabs activeTab="Orders" />

  <div class="mt-3">
    <router-link class="btn btn-primary" :to="{'name':'AdminOrderPage'}">New Order</router-link>
  </div>

    <div class="table-responsive-md">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <SortableTableHeader heading="Guest Name" sortKey="guestname" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <SortableTableHeader heading="Order Date" sortKey="orderdate" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <SortableTableHeader heading="End Date" sortKey="enddate" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <SortableTableHeader heading="Distribution Date" sortKey="pickupdate" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <SortableTableHeader heading="Delivery" sortKey="delivery" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <SortableTableHeader heading="Status" sortKey="status" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sortList" />
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{item.guestname}}</td>
            <td>{{dayjs(item.orderdate.toDate()).format('MM-DD-YYYY')}}</td>
            <td>{{item.enddate && dayjs(item.enddate.toDate()).format('MM-DD-YYYY')}}</td>
            <td>{{item.pickupdate && dayjs(item.pickupdate.toDate()).format('MM-DD-YYYY')}}</td>
            <td>{{item.delivery ? 'delivery' : 'pick-up'}}</td>
            <td>{{item.status || 'pending'}}</td>
            <td>
              <router-link class="btn btn-sm btn-primary" :to="{name:'AdminOrderPage', params:{id:item.id} }">Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

</div>
</template>
