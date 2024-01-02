<script setup>
import { defineEmits, defineProps } from "vue"

const emit = defineEmits(["sort-list"])
const props = defineProps({
  heading: String,
  sortKey: String,
  sortBy: String,
  sortAsc: Boolean,
})
</script>

<template>
  <th @click="emit('sort-list', sortKey)">
    <div class="d-flex gap-2" style="cursor: pointer" title="sort">
      <span>{{ heading }}</span>
      <i v-if="sortBy === sortKey" :class="['bi', { 'bi-sort-down-alt': sortAsc, 'bi-sort-up': !sortAsc }]" />
    </div>
  </th>
</template>
