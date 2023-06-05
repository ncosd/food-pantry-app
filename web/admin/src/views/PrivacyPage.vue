<script setup>
import { ref, onBeforeMount } from 'vue'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const termHtml = ref()

onBeforeMount( async() => {
  const db = getFirestore()
  const docRef = doc(db, 'privacypolicy', 'latest')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    termHtml.value = docSnap.data().html;
  } else {
    termHtml.value = 'Something is wrong, please try again.';
  }
})

</script>

<template>
  <div class="container">
    <template v-if="termHtml == ''">
      <p>Privacy Policy missing, please set in firestore.</p>
    </template>
    <template v-else>
      <div v-html="termHtml"></div>
    </template>
  </div>
</template>
