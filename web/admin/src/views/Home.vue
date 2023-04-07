<template>
  <div class="container">
    <h1>{{config.AdminProjectLongName}}</h1>
    <p>Welcome</p>
    <VueDatePicker v-model="date" range></VueDatePicker>
  </div>

</template>

<script>
import { ref } from 'vue'
import { config } from '@/config'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref()
const now = new Date()
date.value = [now, new Date().setTime(now.getTime()+(3*60*60*1000))]
export default {
  name: 'Home',
  components: { VueDatePicker },
  data() {
    return {
      config: config,
      date: date,
    }
  }
}
</script>

<style></style>
