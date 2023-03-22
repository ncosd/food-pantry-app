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
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export default {
  name: 'TermsPage',
  data() {
    return {
      termHtml: ""
    }
  },
  async mounted() {
    const db = getFirestore()
    const docRef = doc(db, 'terms', 'latest')
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      this.termHtml = docSnap.data().html;
    } else {
       this.termHtml = 'Something is wrong, please try again.';
    }
  }
}
</script>

<style></style>
