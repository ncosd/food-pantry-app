<script setup>
import { ref } from 'vue'
import { config } from '@/config'
import AdminCalendar from '@/components/AdminCalendar.vue'
import { useAuthUserStore } from '@/stores/authUser'

const now = new Date()
</script>

<template>
  <div class="container">
    <h1>Volunteer Calendar</h1>
    <admin-calendar :date="now"></admin-calendar>
  </div>

</template>

<style></style>
