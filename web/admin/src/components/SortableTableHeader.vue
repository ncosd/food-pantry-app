<script setup>
import { computed } from "vue"

const emit = defineEmits(["sort-list"])
const props = defineProps({
  heading: String,
  sortKey: String,
  sortBy: String,
  sortAsc: Boolean,
})

const isActive = computed(() => props.sortBy === props.sortKey)
</script>

<template>
  <th @click="emit('sort-list', sortKey)">
    <div class="d-flex gap-2" style="cursor: pointer" title="sort">
      <span>{{ heading }}</span>
      <i :class="['bi', { 'bi-sort-down-alt': sortAsc, 'bi-sort-up': !sortAsc, visible: isActive, invisible: !isActive }]" />
    </div>
  </th>
</template>
