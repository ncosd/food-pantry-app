<template>
  <v-container background-color="blue">
    <Deliveries :deliveries="deliveries"></Deliveries>
  </v-container>

</template>

<script>
import Deliveries from '@/components/Deliveries'
import firebase from 'firebase/app';

export default {
  name: 'DeliveryApplications',
  components: {
    Deliveries
  },

  data() {
    return {
      deliveries: []
    }
  },
  created() {
    const db = firebase.firestore()
    db.collection('deliveryprofile').get().then( (deliveryQuery) => {
      let deliveries = []
      deliveryQuery.forEach(doc => {
        let d = doc.data()
        d.id = doc.id
        deliveries.push(d)
      })

      this.deliveries = deliveries
    }).catch((error) => {
      console.log('Error getting deliveries ', error)
    })

  }
}

</script>

<style></style>
