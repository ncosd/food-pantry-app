<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      clipped>

      <v-list nav dense>
          <v-list-item>
            <v-badge color="pink" dot>
              <v-list-item-title>Delivery Applicants</v-list-item-title>
            </v-badge>

          </v-list-item>
          <v-list-item>
            <v-list-item-title>Delivery Schedule</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-badge color="blue" dot>
            <v-list-item-title>Volunteer Applicants</v-list-item-title>
            </v-badge>

          </v-list-item>
          <v-list-item>
            <v-list-item-title>Volunteer Schedule</v-list-item-title>
          </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="green darken-4 dark">
      <v-badge color="pink" dot offset-y="20" offset-x="15">
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-badge>
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
    drawer: false,
    group: null,
  }),
  methods: {
    signOut() {
      firebase.auth().signOut().then( () => {
        // router replace
      });
    }
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
};
</script>

<style>
.no-uppercase {
  text-transform: none !important;
}
</style>
