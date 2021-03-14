<template>
  <div>
    <template v-if="policyHtml == ''">
       <v-card elevation="0" max-width="90%">
         <v-card-text>Policy is missing, please set it in firestore.</v-card-text>
       </v-card>
    </template>
    <template v-else>
      <v-card elevation="0" max-width="90%">
        <v-card-text v-html="policyHtml"></v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      policyHtml: ""
    }
  },
  created() {
    const db = firebase.firestore();
    db.collection('privacypolicy').doc('latest').get().then( (docRef) => {
       if (docRef && docRef.data()) {
         this.policyHtml = docRef.data().html;
       }
    }).catch(err => {
       console.log(err);
       this.policyHtml = 'Something is wrong, please try again.';
    });
  }
};
</script>

<style></style>
