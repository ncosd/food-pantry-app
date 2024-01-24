<script setup>
import { ref, onBeforeMount } from 'vue'

const props = defineProps({
  activeTab: String,
  uid: String
})
</script>

<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'Dashboard' }]" aria-current="page" :to="{ name: 'DeliveryDashboard' }">Dashboard</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'Deliveries' }]" :to="{ name: 'DeliveryList' }">Deliveries</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'Routes' }]" :to="{ name: 'DeliveryRoutesList' }">Routes</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'Destinations' }]" :to="{ name: 'DestinationsList' }">Destinations</router-link>
    </li>

  </ul>
</template>
