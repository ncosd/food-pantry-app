<template>
  <div>
    <h1>Delivery Applications</h1>
    <table class="text-center">
      <thead>
        <tr>
          <th @click="sort('firstname')">Firstname</th>
          <th @click="sort('lastname')">Lastname</th>
          <th @click="sort('status')">Status</th>
          <th @click="sort('updated')">Updated</th>
          <th @click="sort('city')">Address</th>
          <th @click="sort('num_10')">Num 0-10</th>
          <th @click="sort('num_1017')">Num 11-17</th>
          <th @click="sort('num_1859')">Num 18-59</th>
          <th @click="sort('num_60')">Num 60+</th>
          <th @click="sort('notes')">Notes</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="item in sortedDeliveries" :key="item.id" >
        <td>{{item.firstname}}</td>
        <td>{{item.lastname}}</td>
        <td>{{item.status}}</td>
        <td>{{item.updated}}</td>
        <td>{{item.address1}}, {{item.address2}}, {{item.city}}, {{item.state}} {{item.zip}}</td>
        <td>{{item.num_10}}</td>
        <td>{{item.num_1017}}</td>
        <td>{{item.num_1859}}</td>
        <td>{{item.num_60}}</td>
        <td>{{item.notes}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Deliveries',
  props: {
    deliveries: Array,
  },
  data() {
    return {
      name: 'Deliveries',
      currentSort: 'firstname',
      currentSortDir: 'asc',

    }
  },
  methods: {
    sort:function(name) {
      if (name == this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = name
    }
  },
  computed: {
    sortedDeliveries:function() {
      return this.deliveries.slice(0).sort((a,b) => {
        let order = 1
        if (this.currentSortDir === 'desc') order = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * order
        if (a[this.currentSort] > b[this.currentSort]) return order
        return 0
      })
    }
  }
}
</script>

<style></style>
