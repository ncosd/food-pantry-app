<template>
  <div background-color="blue">
    <DeliveryApplications :deliveries="deliveries"></DeliveryApplications>
  </div>
</template>

<script>
import DeliveryApplications from '@/components/DeliveryApplications.vue'

export default {
  name: 'DeliveryApplicationsPage',
  components: {
    DeliveryApplications,
  },

  data() {
    return {
      deliveries: []
    }
  },
  created() {
/*
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
*/
  }
}

</script>

<style></style>
