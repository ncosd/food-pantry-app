<template>
  <v-app-bar color="blue darken-4" dark>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title to="/"><v-btn to="/" text>{{config.appNavName}}</v-btn></v-toolbar-title>
    <v-spacer></v-spacer>
    <template v-if="user.loggedIn">
        <v-tooltip bottom>
          <template v-slot:activator="{ on,attrs}">
            <v-icon aria-label="My Account" role="img" aria-hidden="false" v-bind="attrs" v-on="on">mdi-account-circle</v-icon>
          </template>
          <span>My Account</span>
        </v-tooltip>
      <v-btn text to="/logout" @click.prevent="signOut">SIGN OUT</v-btn>
    </template>
    <template v-else>
      <v-btn text to="/login">SIGN IN</v-btn>
      <v-btn color="blue lighten-0" to="/register">JOIN</v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
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
