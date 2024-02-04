<script setup>
import { ref } from 'vue'
import { config } from '@/config.js'

const volunteerUrl = config.VolunteerPortalURL
</script>

<template>
  <div class="container">
    <h1>Volunteer</h1>
    <p>If you are a registered volunteer, please use <a href="{{volunteerUrl}}">{{volunteerUrl}}</a></p>
  </div>
</template>
