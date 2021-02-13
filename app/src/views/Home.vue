<template>
  <div class="home">
    <v-card elevation="2" max-width="90%" class="mx-auto my-12">
      <v-card-title>Welcome!</v-card-title>
      <template v-if="user.loggedIn">
      <v-card-text>
      <p>You are logged in.  All registered users are considered Guests of the {{config.OrganizationName}}.</p>
      <p>If you would like to sign up for delivery, please fill out this form ...</p>
      <p>If you would like to volunteer, please fill out this form...</p>
      </v-card-text>
      </template>
      <template v-else>
      <v-card-text>
      Welcome to the {{config.ProjectLongName}}.  You can register with the application and choose to be a Guest or a Volunteer.  Once you have
      registered, use your profile to customize how you interact with the {{config.OrganizationName}}.
      </v-card-text>
      </template>
    </v-card>

    <v-card elevation="2" max-width="90%" class="mx-auto my-12">
      <v-card-title>Items we need</v-card-title>
      <v-card-text v-html="neededList">
      {{neededList}}
      </v-card-text>
    </v-card>


  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import { mapGetters } from 'vuex';
import { config } from '@/config';

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
    user: "user"
    })
  },
  data() {
    return {
      neededList: "loading...",
      config: config

    }
  },
  mounted() {
    const db = firebase.firestore();
    db.collection('needed').doc('latest').get().then( (docRef) => {
      this.neededList = docRef.data().text;
    }).catch(err => {
      console.log(err);
      this.neededList = 'Something is wrong, please try again.';
    });
  }
}
</script>
