<template>
  <v-app>
  <v-main>
    <app-navigation></app-navigation>
    <router-view></router-view>
   </v-main>
  </v-app>
</template>

<script>
import AppNavigation from '@/components/AppNavigation'

export default {
  name: 'App',
  components: {
    AppNavigation
  }
}
</script>

<style>
</style>
