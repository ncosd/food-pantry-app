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
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'App',
  components: {
    AppNavigation,
    Footer
  },
  methods: {
    signOut() {
      firebase.auth().signOut().then( () => {
        // router replace
      })
    }
  }
}
</script>

<style>
.no-uppercase {
  text-transform: none !important;
}
</style>
