<script setup>
import { config } from '@/config';
import DeliveryExplainer from '@/components/DeliveryExplainer.vue';
</script>

<template>
  <div class="container">
    <h1>Welcome!</h1>
    <p>Welcome to the {{config.ProjectLongName}}.  Once you have
      registered, use your profile to customize how you interact with the {{config.OrganizationName}}.
    </p>

    <DeliveryExplainer></DeliveryExplainer>

  </div>
</template>
