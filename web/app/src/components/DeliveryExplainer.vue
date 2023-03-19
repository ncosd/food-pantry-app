<script setup>
import { config } from '@/config';
</script>

<template>
 <div class="card">
   <div class="card-body">
     <h5 class="card-title">Food Deliveries</h5>
     <p class="card-text">Applications for food delivery are currently being reviewed.  If you are in need of assistance and live within our service area, {{config.DeliveryAreaNames}}, you can fill out a <a href="/delivery-form">delivery application</a>.
     </p>
   </div>
 </div>
</template>

<style></style>
