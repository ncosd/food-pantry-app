<template>
  <v-app-bar color="blue darken-4" dark>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title to="/"><v-btn to="/" text>{{config.appNavName}}</v-btn></v-toolbar-title>
    <v-spacer></v-spacer>
    <template v-if="user.loggedIn">
      <div>{{user.data.email}}</div>
      <v-btn text to="/logout" @click.prevent="signOut">SIGN OUT</v-btn>
    </template>
    <template v-else>
      <v-btn text to="/login">SIGN IN</v-btn>
      <v-btn color="blue lighten-0" to="/register">JOIN</v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { mapGetters } from 'vuex';
import { config } from '@/config';

export default {
  name: 'AppNavigation',
  computed: {
    ...mapGetters({
    user: "user"
    })
  },
  data: ()=> ({
    config: config
  }),
  methods: {
    signOut() {
      firebase.auth().signOut()
      .then( () => {
        this.$router.replace({ name: "Home" });
      });
   }
  }
};
</script>

<style scoped>

</style>
