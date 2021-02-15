<template>
  <DeliveryForm v-bind:user="user"/>
</template>

<script>
import DeliveryForm from "@/components/DeliveryForm.vue";
import 'firebase/auth';
import { mapGetters } from 'vuex';

export default {
  name: 'DeliveryFormView',
  computed: {
    ...mapGetters({
     user: "user"
    })
  },
  components: {
    DeliveryForm
  }
}
</script>

<style></style>
