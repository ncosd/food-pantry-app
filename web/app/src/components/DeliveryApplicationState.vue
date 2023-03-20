<template>
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Application Status</h5>
    <p class="card-text">Status: {{status}}</p>
  </div>
</div>
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
