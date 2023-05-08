<script setup>
import AppNavigation from '@/components/AppNavigation.vue'
import { RouterView } from 'vue-router'
import PageFooter from '@/components/PageFooter.vue'
</script>

<template>
  <div>
    <AppNavigation></AppNavigation>
    <RouterView />
    <PageFooter></PageFooter>
  </div>
</template>



<style></style>
