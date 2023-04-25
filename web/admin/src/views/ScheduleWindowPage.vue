<script setup>
import { ref, defineProps, onBeforeMount } from 'vue'

const props = defineProps({
  date: String,
})

var scheduleDate = new Date()
if (props.date !== '') {
  scheduleDate = new Date(props.date)
}

</script>

<template>
<div class="container">
  <p>Schedule window for {{scheduleDate}}</p>
</div>
</template>
