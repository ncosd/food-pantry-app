<template>
<v-card elevation="2" max-width="90%" class="mx-auto my-12">
  <v-card-title>Items we need</v-card-title>
  <v-card-text v-html="neededList">
  {{neededList}}
  </v-card-text>
</v-card>
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
