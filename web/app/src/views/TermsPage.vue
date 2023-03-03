<template>
  <div>
    <template v-if="termHtml == ''">
      <p>Terms missing, please set in firestore.</p>
    </template>
    <template v-else>
      <div v-html="termHtml"></div>
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
