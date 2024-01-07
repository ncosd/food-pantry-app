<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { VueSignaturePad } from 'vue-signature-pad'

const props = defineProps({
  agreementHTML: String,
  name: String,
  agreementId: String,
})

const emit = defineEmits(['saveSignature'])

const signaturePad = ref(null)
const showSigErr = ref(false)
const showNameErr =ref(false)
const showAgreeErr = ref(false)
const agreeCheckBox = ref(false)
const userName = ref('')
const agreementDate = ref(dayjs().toDate())

const saveForm = ()=>{
  showSigErr.value = false
  showNameErr.value = false
  showAgreeErr.value = false
  let hasErr = false

  const { isEmpty, data } = signaturePad.value.saveSignature()
  //console.log('isEmpty', isEmpty, 'data', data)
  if (isEmpty) {
    showSigErr.value = true
    hasErr = true
  }
  if (!agreeCheckBox.value) {
    showAgreeErr.value = true
    hasErr = true
  }

  console.log('username.value', userName.value)
  if (!userName.value || userName.value === '') {
    showNameErr.value = true
    hasErr = true
  }

  if (hasErr) {
    return
  }

  console.log('Saving signature')
  emit('saveSignature', {
    agreementDate: agreementDate.value,
    agreementId: props.agreementId,
    agreementName: props.name,
    agreeCheckBox: agreeCheckBox.value,
    printedName: userName.value,
    signatureData: data
  })


}
</script>

<template>
  <div class="container">
    <div v-html="props.agreementHTML"></div>

    <form @submit.prevent="saveForm">
      <div class="my-3">
        <input type="checkbox" class="form-check-input me-3" id="agreementCheck" v-model="agreeCheckBox">
        <label class="form-check-label" for="agreementCheck">By checking this, I have read and I agree with all of the above.</label>
      </div>
      <div v-if="showAgreeErr" class="text-danger">You must agree to save this form.</div>

      <div class="my-3">
          <label class="form-label" for="agreementDate">Date</label>
          <input type="text" class="form-control" id="agreementDate" v-model="agreementDate"/>
      </div>

      <div class="my-3">
        <label class="form-label" for="agreementSignature">
          Signature of Staff Member/Volunteer
        </label>


        <VueSignaturePad id="agreementSignature" class="border" ref="signaturePad"/>
        <div id="signatureHelp" class="form-text">Draw your signature in the box above with your mouse or finger</div>
        <div v-if="showSigErr" class="text-danger">You must provide a signature.</div>

      </div>

      <div class="my-3">
          <label class="form-label" for="printedName">Printed Name</label>
          <input type="text" class="form-control" id="printedName" v-model="userName"/>
          <div v-if="showNameErr" class="text-danger">You must provide your name.</div>
      </div>
      <div class="my-3">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>
