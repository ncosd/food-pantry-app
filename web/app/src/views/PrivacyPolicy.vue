<template>
  <div>
    <template v-if="policyHtml == ''">
      <p>Policy is missing, please set it in firestore.</p>
    </template>
    <template v-else>
      <div v-html="policyHtml"></div>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

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
