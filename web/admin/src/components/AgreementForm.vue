<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  agreementHTML: String,
  name: String,
  agreementId: String,
})
</script>

<template>
  <div class="container">
    <div v-html="props.agreementHTML"></div>

    <form>
      <div>
        <input type="checkbox" class="form-check-input me-3" id="agreementCheck">
        <label class="form-check-label" for="agreementCheck">By checking this, I have read and I agree with all of the above.</label>
      </div>

      <div>
          <label class="form-label" for="agreementDate">Date</label>
          <input type="text" class="form-control" id="agreementDate" :value="dayjs().toDate()"/>
      </div>

      <div>
        <label class="form-label" for="agreementSignature">
          Signature of Staff Member/Volunteer
        </label>
        <input type="text" class="form-control" id="agreementSignature" />
      </div>

      <div>
          <label class="form-label" for="printedName">Printed Name</label>
          <input type="text" class="form-control" id="printedName" />
      </div>
      <div class="mt-3">
        <button type="submit" class="btn btn-primary" disabled>Submit</button>
      </div>
    </form>
  </div>
</template>
