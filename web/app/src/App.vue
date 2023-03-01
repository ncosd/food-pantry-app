<template>
  <div>
      <app-navigation></app-navigation>
      <router-view></router-view>
      <PageFooter></PageFooter>
  </div>
</template>

<script>
import AppNavigation from '@/components/AppNavigation.vue'
import PageFooter from '@/components/PageFooter.vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export default {
  name: 'App',
  components: {
    AppNavigation,
    PageFooter
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
