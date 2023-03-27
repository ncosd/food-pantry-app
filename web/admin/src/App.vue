<template>
  <div>
    <AppNavigation></AppNavigation>
    <RouterView />
  </div>
</template>

<script>
import AppNavigation from '@/components/AppNavigation.vue'
import { RouterView } from 'vue-router'

export default {
  name: 'App',
  components: {
    AppNavigation,
    RouterView
  }
}
</script>

<style></style>
