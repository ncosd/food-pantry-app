<template>
  <v-app>
    <v-main>
      <app-navigation></app-navigation>
      <router-view></router-view>
      <Footer></Footer>
     </v-main>
  </v-app>
</template>

<script>
import AppNavigation from '@/components/AppNavigation'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    AppNavigation,
    Footer
  }
}
</script>

<style>
.no-uppercase {
  text-transform: none !important;
}
</style>
