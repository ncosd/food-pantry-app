<script setup>
import { computed, ref } from 'vue'
import WeekHeader from '@/components/WeekHeader.vue'
import dayjs from 'dayjs'

const colClass = 'col'
const borderClass = 'border'
const dnoneClass = 'd-none'
const dmdBlockClass = 'd-md-block'

const props = defineProps({
  date: Object,
  windows: Object,
})

const emit = defineEmits(['changeDate'])

const viewDate = ref(props.date)

const nextMonth = () => {
  viewDate.value = dayjs(viewDate.value).add(1,'month')
  emit('changeDate', viewDate.value)
}

const prevMonth = () => {
  viewDate.value = dayjs(viewDate.value).subtract(1,'month')
  emit('changeDate', viewDate.value)
}

const statusClass = (win) => {
  const attending = props.windows.attending.get(win.id)
  if (attending && attending.winid === win.id) {
    return 'text-bg-success'
  } else if (win.numAttending >= win.numNeeded) {
    return 'text-bg-secondary'
  }
  return 'text-bg-available'
}

const weeks = computed({
  get() {
    const year = dayjs(viewDate.value).year()
    const month = dayjs(viewDate.value).month()
    const d1 = new Date(year, month, 1).getDay()
    const dlast = new Date(year, month+1, 0).getDate()
    const dend = new Date(year, month,dlast).getDay()
    const lastmonthlastdate = new Date(year, month, 0).getDate()
    let days = []
    // add all the days
    for (let i=d1;i>0;i--) {
      let lastyear = year
      let lastmonth = month-1
      if (lastmonth<0) {
        lastmonth = 12
        lastyear = year - 1
      }
      let dayNumber = lastmonthlastdate - i + 1
      let day = createDay(dayNumber, false, new Date(lastyear, lastmonth, dayNumber))
      days.push(day)
    }
    for (let i = 1; i<= dlast; i++) {
      let day = createDay(i, true, new Date(year, month, i))
      days.push(day)
    }
    // Loop to add the first dates of the next month
    for (let i = dend; i < 7; i++) {
      let nextyear = year
      let nextmonth = month + 1
      if (nextmonth > 11) {
        nextyear = nextyear + 1
        nextmonth = 0
      }
      let dayNumber = i - dend + 1
      let day = createDay(dayNumber, false, new Date(nextyear, nextmonth, dayNumber))
      days.push(day)
    }

    // turn into weeks
    const weeks = []
    var wd = []

    for (let i = 1; i<days.length;i++){
      wd.push(days[i-1])
      if (i%7 == 0) {
        weeks.push(wd)
        wd = []
      }
    }

    return weeks
  }
})

function formatMonth(date) {
  const months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
  return months[date.getMonth()];
}

function beginrow(index) {
  if (index == 0 || ((index + 1) % 7 == 1)) {
    return true
  }
  return false
}

function endrow(index) {
  if ((index + 1) % 7 == 0) {
    return true;
  }
  return false
}

function createDay(number, curMonth, date) {
  const result = { number: number, curMonth: curMonth, date:date}
  return result
}

function isoDate(date) {
  const d = dayjs(date)
  return d.format()
}
</script>


<template>
<div class="mt-3">
  <div class="row border text-center">
  <h2>
    <button class="btn btn-primary btn-small" @click="prevMonth"><i class="bi bi-chevron-left"></i></button>
  {{ dayjs(viewDate).format('MMMM') }} {{ dayjs(viewDate).format("YYYY") }}
    <button class="btn btn-primary btn-small" @click="nextMonth"><i class="bi bi-chevron-right"></i></button>
  </h2>
  </div>
  <week-header />

  <template v-for="week in weeks">
    <div class="row text-center cal-week">
      <template v-for="(day,index) in week">
      <div :class="[colClass, borderClass, {'d-none': (index % 6 == 0)}, {'d-md-block': (index % 6 == 0)}]" >
        <div class="text-center">
          <span :class="[{'text-opacity-75': day.curMonth == false}, {'text-secondary': day.curMonth == false}]">
            {{day.number}}
          </span>
        </div>
        <div class="text-center">
          <router-link
            class="btn btn-secondary btn-sm"
            :to="{name:'ScheduleWindow', params: {'date':isoDate(day.date)}}">+</router-link>
        </div>
        <div v-for="w in windows.getDay(day)">
          <router-link :to="{name:'ScheduleWindowById', params: {id:w.id}}">
            <div class="badge rounded-pill text-bg-warning text-wrap d-block m-1">
              {{w.location}} {{w.tasktype}}
              {{dayjs(w.starttime.toDate()).format('h:mm A')}} - {{dayjs(w.endtime.toDate()).format('h:mm A')}}
            </div>
          </router-link>
        </div>
        <!-- Unavailability -->
        <div v-for="u in windows.getUnavail(day)">
          <div :class="['badge','rounded-pill','text-bg-danger','text-wrap','d-block','m-1']">
            <span>{{u.name}}</span>
          </div>
        </div>
      </div>
      </template>
    </div>
  </template>
</div>
</template>
