<template>
<v-app>
  <v-app-bar app color="green darken-4 dark">
    <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
    <v-toolbar-title to="/"><v-btn to="/" text color="white">Admin</v-btn></v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>

  <v-main>
    <v-container>
      Admin
    </v-container>
  </v-main>
</v-app>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
  methods: {
    signOut() {
      firebase.auth().signOut().then( () => {
        // router replace
      });
    }
  }
};
</script>

<style>
.no-uppercase {
  text-transform: none !important;
}
</style>
