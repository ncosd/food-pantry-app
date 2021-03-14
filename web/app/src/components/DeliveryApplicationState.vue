<template>
  <v-card max-width="400">
    <v-card-title>Application Status</v-card-title>
    <v-card-text>
      Status: {{status}}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DeliveryApplicationState',
  props: [
    "deliveryAppState"
  ],
  computed: {
    status() {
      if (this.deliveryAppState != null) {
        return this.deliveryAppState.data().status;
      }
      return "new";
    }
  }
}

</script>

<style>
</style>
