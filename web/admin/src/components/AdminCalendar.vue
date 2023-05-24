<template>
<div class="mt-3">
  <div class="row border text-center">
    <h2>{{ formatMonth(date) }} {{date.getFullYear()}}</h2>
  </div>
  <week-header />

  <template v-for="week in weeks">
    <div class="row text-center cal-week">
      <template v-for="(day,index) in week">
      <div :class="[colClass, borderClass, {'d-none': (index % 6 == 0)}, {'d-md-block': (index % 6 == 0)}]" >{{day.number}}
        <div v-for="w in windows.getDay(day)">
          <router-link :to="{name:'VolWindow', params: {id:w.id}}">
            <div class="badge rounded-pill text-bg-warning text-wrap d-block m-1">
            <span class="d-none d-md-block">{{w.location}} </span>
            <span class="d-block d-md-none">{{w.tasktype.substring(0,3)}}</span><span class="d-none d-md-block">{{w.tasktype}}</span>
            <span class="d-none d-md-block">{{dayjs(w.starttime.toDate()).format('h:mm A')}} - {{dayjs(w.endtime.toDate()).format('h:mm A')}}</span>
            </div>
          </router-link>
        </div>
      </div>
      </template>
    </div>
  </template>

</div>
</template>


<script setup>
import { computed, ref, defineProps } from 'vue'
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

const weeks = computed({
  get() {
    const year = props.date.getFullYear()
    const month = props.date.getMonth()
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
      let day = createDay(dayNumber, new Date(lastyear, lastmonth, dayNumber))
      days.push(day)
    }
    for (let i = 1; i<= dlast; i++) {
      let day = createDay(i, new Date(year, month, i))
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
      let day = createDay(dayNumber, new Date(nextyear, nextmonth, dayNumber))
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

function createDay(number, date) {
  const result = { number: number, date:date}
  return result
}

function isoDate(date) {
  let result = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
  return result
}
</script>
