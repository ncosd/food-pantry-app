<template>
  <v-footer color="blue darken-4" padless>
    <v-card flat tile class="blue darken-4 white--text text-left">
      <v-card-text x-small class="white--text">
      <v-btn x-small color="white" flat to="/terms" text>Terms</v-btn>
      <v-btn x-small color="white" flat to="/privacy-policy" text>Privacy Policy</v-btn>
      <v-btn x-small color="white" flat text href="https://github.com/ncosd/food-pantry-app">Made with Food-Pantry-App</v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
</style>
