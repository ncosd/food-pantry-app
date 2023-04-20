<template>
  <div>
    <AppNavigation></AppNavigation>
    <RouterView />
    <PageFooter></PageFooter>
  </div>
</template>

<script>
import AppNavigation from '@/components/AppNavigation.vue'
import { RouterView } from 'vue-router'
import PageFooter from '@/components/PageFooter.vue'

export default {
  name: 'App',
  components: {
    AppNavigation,
    RouterView,
    PageFooter
  }
}
</script>

<style></style>
