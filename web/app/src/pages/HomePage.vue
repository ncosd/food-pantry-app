<template>
  <div class="container">
    <h1>Welcome!</h1>
    <p>Welcome to the {{config.ProjectLongName}}.  Once you have
      registered, use your profile to customize how you interact with the {{config.OrganizationName}}.
    </p>

    <DeliveryExplainer></DeliveryExplainer>

  </div>
</template>

<script>
import { config } from '@/config';
import DeliveryExplainer from '@/components/DeliveryExplainer.vue';

export default {
  name: 'HomePage',
  components: {
    DeliveryExplainer
  },
  computed: {

  },
  data() {
    return {
      config: config,
      neededList: ""
    }
  },
  created() {
  }
}
</script>
