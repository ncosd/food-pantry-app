<script setup>
import { config } from '@/config';
import DeliveryExplainer from '@/components/DeliveryExplainer.vue';
import { useAuthUserStore } from '@/stores/authUser'

const user = useAuthUserStore()
const u = import.meta.env.VITE_MAIN_ORG_URL
</script>

<template>
  <div class="container">
    <h1>Welcome!</h1>
    <h1>u {{u}}</h1>
    <p>Welcome to the {{config.ProjectLongName}}.</p>
    <p v-if="!user.isLoggedIn">This is the Guest application.  Volunteers should use the Volunteer Portal link above.</p>
    <p v-if="config.EnableGuestLogin !== 'true'">Guest registration and login is not enabled at this time.  Please use our website
      <a :href="config.MainOrgURL">{{config.MainOrgURL}}</a> for guest services.
    </p>

    <template v-if="config.EnableGuestOrder === 'true'">
      <p>Orders are enabled.</p>
      <p><RouterLink :to="{name:'OrderPage'}">Click Here to place an Order</RouterLink></p>

    </template>


  </div>
</template>
