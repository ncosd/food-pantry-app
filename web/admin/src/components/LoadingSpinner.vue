<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  visible: Boolean,
})

const displayClass = computed(() => {
  if (props.visible) {
    return 'd-block'
  }
  return 'd-none'
})

</script>

<template>
  <div class="spinner-border" :class="displayClass" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>
