<template>
  <v-container background-color="blue">
    <Deliveries :deliveries="deliveries"></Deliveries>
  </v-container>

</template>

<script>
import Deliveries from '@/components/Deliveries'

export default {
  name: 'DeliveryApplications',
  components: {
    Deliveries
  },

  data() {
    return {
      deliveries: [
        {
          firstname: 'One',
          lastname: 'last',
          userid: '1',
          address1: '201 Sabine Ave',
          address2: 'address2',
          city: 'narberth',
          state: 'pa',
          zip: '19072',
          phone: '610-555-1111',
          num_10: '1',
          num_1017: '1',
          num_1859: '1',
          num_60: '0',
        },
        {
          firstname: 'Two',
          lastname: 'last',
          userid: '1',
          address1: '101 Sabine Ave',
          address2: 'address2',
          city: 'narberth',
          state: 'pa',
          zip: '19072',
          phone: '610-555-1112',
          num_10: '1',
          num_1017: '1',
          num_1859: '1',
          num_60: '0',
        },
        {
          firstname: 'three',
          lastname: 'last',
          userid: '1',
          address1: '201 Sabine Ave',
          address2: 'address2',
          city: 'narberth',
          state: 'pa',
          zip: '19072',
          phone: '610-555-1113',
          num_10: '1',
          num_1017: '1',
          num_1859: '1',
          num_60: '0',
        },
        {
          firstname: 'four',
          lastname: 'last',
          userid: '1',
          address1: '201 Sabine Ave',
          address2: 'address2',
          city: 'narberth',
          state: 'pa',
          zip: '19072',
          phone: '610-555-1114',
          num_10: '1',
          num_1017: '1',
          num_1859: '1',
          num_60: '0',
        },
        {
          firstname: 'five',
          lastname: 'last',
          userid: '1',
          address1: '105 Sabine Ave',
          address2: 'address2',
          city: 'narberth',
          state: 'pa',
          zip: '19072',
          phone: '610-555-1115',
          num_10: '1',
          num_1017: '1',
          num_1859: '1',
          num_60: '0',
        }




      ]
    }
  }
}

</script>

<style></style>
