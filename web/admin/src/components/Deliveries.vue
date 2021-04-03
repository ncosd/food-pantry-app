<template>
  <v-content>
    <h1>Delivery Applications</h1>
    <ul>
      <li v-for="item in deliveries" :key="item.id">
        {{item.firstname}} {{item.lastname}}
      </li>
    </ul>
  </v-content>
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

    }
  }
}
</script>

<style></style>
