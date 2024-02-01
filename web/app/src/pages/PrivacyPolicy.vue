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
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      policyHtml: ""
    }
  },
  async mounted() {
    const db = getFirestore()
    const docRef = doc(db, 'privacypolicy', 'latest')
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      this.policyHtml = docSnap.data().html;
    } else {
      this.policyHtml = 'Something is wrong, please try again.';
    }
  }
}
</script>

<style></style>
