<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

function toDate(timestamp) {
  const val = new Date(timestamp*1000)
  return val
}

var startDate = new Date()
var endDate = new Date()
const range = ref([startDate, endDate])

</script>

<template>
  <div class="container">
  <h1>Schedule your unavailability</h1>

    <form >


      <div class="row my-3">
        <div class="col">
          <label class="form-label" for="a">Time Window</label>
          <vue-date-picker v-model="range" range></vue-date-picker>
        </div>
      </div>

      <div class="row my-3">
        <div class="col">
          <button class="btn btn-primary btn-sm" @click.prevent="save">Save</button>
        </div>
      </div>

      </form>

  <h2>Upcoming unavailable dates</h2>
  <ul>
  <li>One - [ Delete button ]</li>
  <li>Two - [ Delete button ]</li>
  </ul>

  </div>
</template>
