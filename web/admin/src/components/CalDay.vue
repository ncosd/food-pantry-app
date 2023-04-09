<template>
  <div class="col border text-secondary cal-day">
    {{date.getDate()}}
    <div><a href="/volunteer/admin/cal-new/?d={{date.toISOString()}}" class="btn btn-secondary btn-sm">+</a></div>
    <template v-for="w in windows">
    <div class="badge rounded-pill text-wrap d-block m-1 text-bg-secondary"
    :class="{ 'text-bg-secondary': isCovered(w.status), 'text-bg-warning': isOpen(w.status), 'text-bg-danger': isCancelled(w.status) }">
    {{ formatHour(w.start) }} - {{ formatHour(w.end) }} {{ w.status }}
    </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'CalDay',
  props: {
    date: {
      type: Object,
    },
    windows: {
      type: Array,
    },
  },
  methods: {
    formatHour(date) {
      let hour = date.getHours()
      let meridian = 'am'
      if (hour > 12) {
        meridian = 'pm'
        hour -= 12
      }
      return hour + ' ' + meridian
    },
    badgeText(status) {
       let statusClass = 'text-bg-secondary'
       if (status === 'open') {
         statusClass='text-bg-warning'
       }
       return statusClass
    },
    isOpen(status) {
      return status === 'open'
    },
    isCovered(status) {
      return status === 'covered'
    },
    isCancelled(status) {
      return status === 'cancelled'
    },
  }
}
</script>
