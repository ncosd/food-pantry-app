<script setup>
import { ref, onBeforeMount } from 'vue'

const props = defineProps({
  activeTab: String,
})
</script>

<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'Locations' }]" aria-current="page" :to="{ name: 'LocationsList'}">Locations</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'TaskTypes' }]" :to="{ name: 'TaskTypesList'}">TaskTypes</router-link>
    </li>
  </ul>
</template>
