<template>
<v-card elevation="2" max-width="90%" class="mx-auto my-12">
  <v-card-title>Food Deliveries</v-card-title>
  <v-card-text>
  Applications for food delivery are currently being reviewed.  If you are in need of assistance and live within our service area, {{config.DeliveryAreaNames}}, you can fill out a <v-btn to="/delivery-form" class="no-uppercase">delivery application</v-btn>.
  </v-card-text>
</v-card>
</template>

<script>
import { config } from '@/config';

export default {
  name: 'DeliveryExplainer',
  data() {
    return {
      config:config,
    }
  }
}
</script>

<style></style>
