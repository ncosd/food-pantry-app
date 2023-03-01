<template>
  <div>
    <template v-if="termHtml == ''">
       <v-card elevation="0" max-width="90%">
         <v-card-text>Terms missing, please set in firestore.</v-card-text>
       </v-card>
    </template>
    <template v-else>
      <v-card elevation="0" max-width="90%">
        <v-card-text v-html="termHtml"></v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default {
  name: 'TermsPage',
  data() {
    return {
      termHtml: ""
    }
  },
  created() {
    const db = firebase.firestore();
    db.collection('terms').doc('latest').get().then( (docRef) => {
       if (docRef && docRef.data()) {
         this.termHtml = docRef.data().html;
       }
    }).catch(err => {
       console.log(err);
       this.termHtml = 'Something is wrong, please try again.';
    });
  }
};
</script>

<style></style>
