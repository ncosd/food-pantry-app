<template>
<div class="card">
  <div class="card-body">
    <h5>Items we need</h5>
    <div class="card-text">
      {{ neededList }}
    </div>
  </div>
</template>

<script>
export default {
  name: "NeededListCard",
  props: {
    neededList: String
  }
}
</script>

<style></style>
