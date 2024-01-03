<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { VueSignaturePad } from 'vue-signature-pad'

const props = defineProps({
  agreementHTML: String,
  name: String,
  agreementId: String,
})

const signaturePad = ref(null)

const saveForm = ()=>{
  console.log('saveForm')
  console.log('signaturePad', signaturePad.value.isEmpty())
  const { isEmpty, data } = signaturePad.value.saveSignature()
  console.log('isEmpty', isEmpty, 'data', data)

}
</script>

<template>
  <div class="container">
    <div v-html="props.agreementHTML"></div>

    <form @submit.prevent="saveForm">
      <div class="my-3">
        <input type="checkbox" class="form-check-input me-3" id="agreementCheck">
        <label class="form-check-label" for="agreementCheck">By checking this, I have read and I agree with all of the above.</label>
      </div>

      <div class="my-3">
          <label class="form-label" for="agreementDate">Date</label>
          <input type="text" class="form-control" id="agreementDate" :value="dayjs().toDate()"/>
      </div>

      <div class="my-3">
        <label class="form-label" for="agreementSignature">
          Signature of Staff Member/Volunteer
        </label>


        <VueSignaturePad id="agreementSignature" class="border" ref="signaturePad"/>
        <div id="signatureHelp" class="form-text">Draw your signature in the box above with your mouse or finger</div>


      </div>

      <div class="my-3">
          <label class="form-label" for="printedName">Printed Name</label>
          <input type="text" class="form-control" id="printedName" />
      </div>
      <div class="my-3">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>
