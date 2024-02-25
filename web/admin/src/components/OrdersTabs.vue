<script setup>
import { ref, onBeforeMount } from 'vue'

const props = defineProps({
  activeTab: String,
})
</script>

<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'Dashboard' }]" aria-current="page" :to="{ name: 'OrdersDashboardPage'}">Dashboard</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'Forms' }]" :to="{ name: 'OrderFormListPage'}">Forms</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'Orders' }]" :to="{ name: 'OrdersListPage'}">Orders</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'Items' }]" :to="{ name: 'OrderItemListPage'}">Items</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'History' }]" :to="{ name: 'OrdersHistoryPage'}">History</router-link>
    </li>
  </ul>
</template>
