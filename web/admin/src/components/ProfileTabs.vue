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
      <router-link :class="['nav-link', { active: props.activeTab === 'Registration' }]" aria-current="page" :to="{ name: 'Profile', params: { uid: props.uid } }">Registration</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'Forms' }]" :to="{ name: 'Profile-Forms', params: { uid: props.uid } }">Forms</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="['nav-link', { active: props.activeTab === 'Certifications' }]" :to="{ name: 'Profile-Certs', params: { uid: props.uid } }">Certifications</router-link>
    </li>
  </ul>
</template>
