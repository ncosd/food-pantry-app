<script setup>
import { ref, onBeforeMount } from 'vue'
import { collection, getFirestore, doc, addDoc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import DeliveryTabs from '@/components/delivery/DeliveryTabs.vue'

const props = defineProps({
  id: String,
})

const newEntry = ref(true)
const guestName = ref('')
const code = ref()
const street = ref('')
const street2 = ref('')
const city = ref('')
const state = ref('')
const zip = ref('')
const phone = ref('')
const canText = ref(false)
const onHold = ref(false)
const onHoldBeginDate = ref(null)
const onHoldEndDate = ref(null)

const router = useRouter()
const db = getFirestore()

onBeforeMount( async () => {
  if (props.id) {
    console.log('id', props.id)
    newEntry.value = false

    code.value = props.id

    const docSnap = await getDoc(doc(db, 'deliverydestination', props.id))
    if (docSnap.exists()) {
      const data = docSnap.data()
      guestName.value = data.guestName
      street.value = data.street
      street2.value = data.street2
      city.value = data.city
      state.value = data.state
      zip.value = data.zip
      phone.value = data.phone
      onHold.value = data.onHold
    }

  } else {
    newEntry.value = true
  }
})

const save = async () => {

  const data = {
      guestName: guestName.value,
      street: street.value,
      street2: street2.value,
      city: city.value,
      state: state.value,
      zip: zip.value,
      phone: phone.value,
      canText: canText.value,
      onHold: onHold.value,
  }

  try {
    if (newEntry.value) {
      const destRef = await addDoc(collection(db, 'deliverydestination'), data)

    } else {
      await updateDoc(doc(db, 'deliverydestination', props.id), data)
    }
    router.push({ name: 'DestinationsList' })


  } catch (err) {
    console.log('err', err)
  }
}

</script>

<template>
  <div class="container">
    <DeliveryTabs activeTab="Destinations" ></DeliveryTabs>

    <h1 v-if="newEntry">Add new destination</h1>
    <h1 v-else>Edit Destination</h1>

    <form @submit.prevent="save" class="mt-3">
      <div v-if="!newEntry">
        <label class="form-label">Destination Code</label>
        <input type="text" class="form-control" v-model="code" disabled>
      </div>

      <div>
        <label class="form-label">Guest Name</label>
        <input type="text" class="form-control" v-model="guestName" v-focused>
      </div>

      <div>
        <label class="form-label">Street Address</label>
        <input type="text" class="form-control" v-model="street">
      </div>
      <div>
        <label class="form-label">Apt/Suite</label>
        <input type="text" class="form-control" v-model="street2">
      </div>
      <div class="row">
        <div class="col">
          <label class="form-label">City</label>
          <input type="text" class="form-control" v-model="city">
        </div>
        <div class="col">
          <label class="form-label">State</label>
          <input type="text" class="form-control" v-model="state">
        </div>
      </div>
      <div>
        <label class="form-label">Zip</label>
        <input type="text" class="form-control" v-model="zip">
      </div>
      <div>
        <label class="form-label">Phone</label>
        <input type="text" class="form-control" v-model="phone">
      </div>

      <div class="form-check">
        <label class="form-check-label">Can text Phone</label>
        <input type="checkbox" class="form-check-input" v-model="canText">
      </div>

      <div class="form-check" v-if="!newEntry">
        <label class="form-check-label">On Hold</label>
        <input type="checkbox" class="form-check-input" v-model="onHold">
      </div>

      <div>
        <button class="btn btn-primary">Save</button>
      </div>

    </form>


  </div>
</template>
