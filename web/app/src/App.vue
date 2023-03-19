<script setup>
import AppNavigation from '@/components/AppNavigation.vue'
import { RouterView } from 'vue-router'
import PageFooter from '@/components/PageFooter.vue'
import firebase from 'firebase/compat/app'
</script>

<template>
  <div>
      <app-navigation></app-navigation>
      <RouterView />
      <PageFooter></PageFooter>
  </div>
</template>

<style>
.no-uppercase {
  text-transform: none !important;
}
</style>
