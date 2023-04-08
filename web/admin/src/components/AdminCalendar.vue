<template>
<div class="mt-3">
  <div class="row border text-center">
    <h2>{{ formatMonth(date) }} {{date.getFullYear()}}</h2>
  </div>
</div>
</template>


<script>
export default {
  name: 'AdminCalendar',
  props: {
    date: {
      type: Object,
    },
  },
  methods: {
    formatMonth(date) {
      const months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
      return months[date.getMonth()];
    },
  }
}
</script>
