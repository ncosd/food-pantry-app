<script setup>
import { ref, defineProps, onMounted } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


const props = defineProps({
  date: String,
})

var scheduleDate = new Date()
if (props.date !== '') {
scheduleDate = new Date(props.date)
scheduleDate.setHours(11)
scheduleDate.setMinutes(0)
}

const windowDate = ref()

//onMounted( () => {
  const endDate = new Date(scheduleDate)
  endDate.setTime(scheduleDate.getTime()+(3*60*60*1000))
  windowDate.value = [scheduleDate, endDate]
//})
</script>

<template>
  <div class="container">
    <p>Schedule window for {{scheduleDate}}</p>

    <form >
      <div v-if="showSaveMessage" class="text-bg-success">{{saveMessage}}</div>
      <div v-if="showDeleteMessage" class="text-bg-danger">{{deleteMessage}}</div>

      <div class="row my-3">
        <div class="col">
          <label class="form-label" for="tasktype">Task Type</label>
          <select id="tasktype" class="form-select" >
            <option value="SummerMeal">Summer Meal Distribution</option>
            <option value="Holiday">Holiday - Closed</option>
          </select>
        </div>
      </div>


      <div class="row my-3">
        <div class="col">
          <label class="form-label" for="numVolunteers">Number of Volunteers</label>
          <select id="numVolunteers" class="form-select" >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
            <option value="0">0</option>
          </select>
        </div>
      </div>


      <div class="row my-3">
        <div class="col">
          <label class="form-label" for="a">Time Window</label>
          <vue-date-picker v-model="windowDate" range></vue-date-picker>

        </div>
      </div>


    </form>
    </div>
</template>
