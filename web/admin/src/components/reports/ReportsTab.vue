<script setup>
import { ref, onBeforeMount } from 'vue'

const props = defineProps({
  activeTab: String,
})
</script>

<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'Dashboard' }]" aria-current="page" :to="{ name: 'AdminReportPage' }">Dashboard</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'Volunteers' }]" :to="{ name: 'VolunteerReportPage' }">Volunteers</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'Guests' }]" :to="{ name: 'GuestReportPage' }">Guests</router-link>
    </li>

  </ul>
</template>
