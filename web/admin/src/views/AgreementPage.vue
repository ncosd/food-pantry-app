<script setup>
import AgreementForm from '@/components/AgreementForm.vue'
import { ref, onBeforeMount } from 'vue'
import { getFirestore, doc, getDoc, addDoc, collection } from 'firebase/firestore'
import { useAuthUserStore } from '@/stores/authUser'
import { useRouter } from 'vue-router'

const props = defineProps({
  name: String,
})

const router = useRouter()
const user = useAuthUserStore()
const db = getFirestore()
const agreementHTML = ref()
const showErr = ref(false)
const showSuccess = ref(false)

onBeforeMount(async()=>{
  const docRef = doc(db, 'agreements', props.name)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    agreementHTML.value = docSnap.data().html
  } else {
    agreementHTML.value = '<div><strong>Agreement (' + props.name + ') not found in database.</strong></div>'
  }
})

const saveSignatureHandler = async (formData) => {
  showSuccess.value = false
  showErr.value = false
  try {
    const savedSigRef = await addDoc(collection(db, 'signedagreements', user.data.uid, props.name),
                                   { ...FormData })
    console.log('savedSigRef', savedSigRef.id)
    showSuccess.value = true
    router.push({name:'Profile-Forms'})
  } catch (err) {
    console.log('err', err)
    showErr.value = true
  }
}
</script>

<template>
  <AgreementForm :agreementHTML="agreementHTML" :name="props.name" @saveSignature="saveSignatureHandler"/>
  <div v-if="showErr" class="text-danger">An error occurred, try again later.</div>
  <div v-if="showSuccess" class="text-success">Agreement saved</div>
</template>
