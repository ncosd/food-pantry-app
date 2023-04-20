<template>
  <div class="container">
    <div class="table-responsive-md">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th><button class="btn" @click="sort('firstname')">Firstname</button></th>
          <th><button class="btn" @click="sort('lastname')">Lastname</button></th>
          <th><button class="btn"  @click="sort('status')">Status</button></th>
          <th><button class="btn" @click="sort('updated')">Updated</button></th>
          <th><button class="btn" @click="sort('city')">Address</button></th>
          <th><button class="btn" @click="sort('num_10')">Num 0-10</button></th>
          <th><button class="btn" @click="sort('num_1017')">Num 11-17</button></th>
          <th><button class="btn" @click="sort('num_1859')">Num 18-59</button></th>
          <th><button class="btn" @click="sort('num_60')">Num 60+</button></th>
          <th><button class="btn" @click="sort('notes')">Notes</button></th>
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
