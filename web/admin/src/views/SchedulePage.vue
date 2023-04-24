<script setup>
import AdminCalendarScheduler from '@/components/AdminCalendarScheduler.vue'


const now = new Date()

</script>

<template>
<div class="container">
 <admin-calendar-scheduler :date="now"></admin-calendar-scheduler>
</div>
</template>
