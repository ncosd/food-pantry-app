<template>
  <div class="home">
    <v-card elevation="2" max-width="90%" class="mx-auto my-12">
      <v-card-title>Welcome!</v-card-title>
      <template v-if="user.loggedIn">
      <v-card-text>
      <p>You are logged in.  All registered users are considered Guests of the {{config.OrganizationName}}.</p>
      <p>If you would like to sign up for delivery, please fill out the <v-btn to="/delivery-form" class="no-uppercase">delivery application form</v-btn></p>
      <!-- volunteer form coming soon
      <p>If you would like to volunteer, please fill out the <v-btn active="false" to="/volunteer-form" class="no-uppercase">volunteer application form</v-btn></p>
      -->
      </v-card-text>
      </template>
      <template v-else>
      <v-card-text>
      Welcome to the {{config.ProjectLongName}}.  You can register with the application and choose to be a Guest or a Volunteer.  Once you have
      registered, use your profile to customize how you interact with the {{config.OrganizationName}}.
      </v-card-text>
      </template>
    </v-card>

    <DeliveryExplainer></DeliveryExplainer>

  </div>
</template>

<script>
import { config } from '@/config';
import DeliveryExplainer from '@/components/DeliveryExplainer.vue';

export default {
  name: 'Home',
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
