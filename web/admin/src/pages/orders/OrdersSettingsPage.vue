<script setup>
import { ref } from 'vue'
import { config } from '@/config.js'
import ConfigTabs from '@/components/ConfigTabs.vue'



</script>

<template>
<div class="container">
  <ConfigTabs activeTab="Orders" class="mb-3"/>
  <div class="mt-3">
    <strong>Show Item Weights:</strong> {{ config.orders.showWeights }}
  </div>
</div>
</template>
