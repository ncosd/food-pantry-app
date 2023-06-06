<script setup>
import { ref } from 'vue'

const props = defineProps({
  agreementHtml: String,
})
</script>

<template>
<div class="container" v-html="agreementHtml"></div>
</template>

<style></style>
