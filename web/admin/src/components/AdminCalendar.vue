<template>
<div class="mt-3">
  <div class="row border text-center">
    <h2>{{ formatMonth(date) }} {{date.getFullYear()}}</h2>
  </div>
  <week-header />

  <template v-for="(week, index) in days">
    <div class="row text-center cal-week">
      <div class="col border" v-for="day in week">{{day}}</div>
    </div>
  </template>

</div>
</template>


<script>
import WeekHeader from '@/components/WeekHeader.vue'

export default {
  name: 'AdminCalendar',
  props: {
    date: {
      type: Object,
    },
  },
  components: {
    WeekHeader,
  },
  computed: {
    days() {
      const year = this.date.getFullYear()
      const month = this.date.getMonth()
      const d1 = new Date(year, month, 1).getDay()
      const dlast = new Date(year, month+1, 0).getDate()
      const dend = new Date(year, month,dlast).getDay()
      const lastmonthlastdate = new Date(year, month, 0).getDate()
      let days = []
      // add all the days
      for (let i=d1;i>0;i--) {
        days.push(lastmonthlastdate - i + 1)
      }
      for (let i = 1; i<= dlast; i++) {
        days.push(i)
      }
      // Loop to add the first dates of the next month
      for (let i = dend; i < 7; i++) {
        days.push(i - dend + 1)
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
  },
  methods: {
    formatMonth(date) {
      const months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
      return months[date.getMonth()];
    },
    beginrow(index) {
        if (index == 0 || ((index + 1) % 7 == 1)) {
        return true
        }
        return false
    },
    endrow(index) {
      if ((index + 1) % 7 == 0) {
        return true;
      }
      return false
    },
  }
}
</script>
