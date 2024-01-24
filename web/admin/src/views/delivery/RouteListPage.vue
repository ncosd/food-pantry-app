<script setup>
import { ref } from 'vue'
import DeliveryTabs from '@/components/delivery/DeliveryTabs.vue'

</script>

<template>
  <div class="container">
    <DeliveryTabs activeTab="Routes" ></DeliveryTabs>

    <div class="row">
      <div class="col-8">
        Table here of routes

        <div>
          Start: NCFB 201 Sabine Ave, Narberth, PA 19072
        </div>
        <div>
          Destination: The Shack 122 Ardmore Avenue, Ardmore, PA 19003</div>


      </div>
      <div class="col-4">
        <img width="400" src="/img/delivery/route-example.png">
      </div>
    </div>
  </div>
</template>
