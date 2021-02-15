<template>
<v-card elevation="2" max-width="90%" class="mx-auto my-12">
  <v-card-title>Items we need</v-card-title>
  <v-card-text v-html="neededList">
  {{neededList}}
  </v-card-text>
</v-card>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  name: "NeededListCard",
  data() {
    return {
      neededList: "loading..."
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

<style>

</style>
