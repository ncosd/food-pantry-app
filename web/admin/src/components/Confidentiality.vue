<script setup>
import { ref } from 'vue'

const props = defineProps({
  agreementHtml: String,
})
</script>

<template>
  <div class="container" v-html="agreementHtml"></div>

  <form>
    <input type="text" class="sig" name="Signature of Staff Member/Volunteer" />
    <label for="Signature of Staff Member/Volunteer">
      Signature of Staff Member/Volunteer
    </label>

    <input type="text" class="date" name="Date" />
    <label for="Date">
      Date
    </label>

    <input type="text" class="printName" name="Printed Name" />
    <label for="Printed Name">
      Printed Name
    </label>
  </form>
</template>

<style></style>
