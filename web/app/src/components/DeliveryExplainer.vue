<script setup>
import { config } from '@/config';
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Food Deliveries</h5>
      <div class="card-text">
        <p>Applications for food delivery are currently on hold.</p>
        <p>Our service area is {{config.DeliveryAreaNames}}</p>
        <!--
        <p>If you are in need of assistance and live within our service area, fill out the <a :href="config.DeliveryFormURL">delivery application</a> to apply.
        </p>
        -->
      </div>
    </div>
  </div>
</template>

<style></style>
