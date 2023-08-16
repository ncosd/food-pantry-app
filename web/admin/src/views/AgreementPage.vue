<script setup>
import AgreementForm from '@/components/AgreementForm.vue'
import { ref, onBeforeMount } from 'vue'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const props = defineProps({
  name: String,
})

const agreementHTML = ref()

onBeforeMount(async()=>{
  const db = getFirestore()
  const docRef = doc(db, 'agreements', props.name)
  console.log('docRef', docRef)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    agreementHTML.value = docSnap.data().html
  } else {
    agreementHTML.value = '<div><strong>Agreement not found.</strong></div>'
  }
})


</script>

<template>
  <AgreementForm :agreementHTML="agreementHTML" :name="props.name"/>
</template>
