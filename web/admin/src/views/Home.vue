<template>
  <div class="container">
    <h1>{{config.AdminProjectLongName}}</h1>
    <h2>Placeholder- example date picker</h2>
    <VueDatePicker v-model="date" range></VueDatePicker>

    <h1>Volunteer Calendar</h1>
    <admin-calendar :date="now"></admin-calendar>

    <h1>Placeholder - Pending volunteers</h1>
    <p>TODO: add pending</p>

  </div>

</template>

<script>
import { ref } from 'vue'
import { config } from '@/config'
import AdminCalendar from '@/components/AdminCalendar.vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref()
const now = new Date()
date.value = [now, new Date().setTime(now.getTime()+(3*60*60*1000))]
export default {
  name: 'Home',
  components: { VueDatePicker, AdminCalendar },
  data() {
    return {
      config: config,
      date: date,
      now: now,
    }
  }
}
</script>

<style></style>
