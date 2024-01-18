<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { useRouter } from 'vue-router'
import ProfileTabs from '@/components/ProfileTabs.vue'
import { getFirestore, getCountFromServer, doc, getDoc, getDocs, addDoc, collection, query, limit, orderBy } from 'firebase/firestore'
import dayjs from 'dayjs'

const props = defineProps({
  uid: String,
})

const db = getFirestore()
const user = useAuthUserStore()
const router = useRouter()
const userId = ref(props.uid)
const confAgreement = ref(null)

const driverStatus = ref(false)
const driverDate = ref(null)

onBeforeMount(async () => {
  if (props.uid === '' || props.uid === undefined) {
    userId.value = user.data.uid
  }

  // check agreement form
  const confQuery = query(collection(db, 'signedagreements', userId.value, 'confidentiality'), orderBy('agreementDate', 'desc'), limit(1))
  const confSnap = await getDocs(confQuery)
  if (confSnap.size > 0) {
    confAgreement.value = confSnap.docs[0].data()
  }

  const driverRef = doc(db, 'processedForms', userId.value, 'forms', 'driver')
  const driverSnap = await getDoc(driverRef)
  if (driverSnap.exists()) {
    driverStatus.value = driverSnap.data().completed
    driverDate.value = dayjs(driverSnap.data().date.toDate())
  }


})
</script>

<template>
<div class="container">

  <ProfileTabs activeTab="Forms" :uid="userId"></ProfileTabs>

  <h2 class="my-3">Electronic Forms</h2>
  <div class="mt-3 row fw-bold">
    <div class="col-md">Form Name</div>
    <div class="col-md">Status</div>
    <div class="col-md">Date Signed</div>
  </div>


  <div class="row">
    <div class="col-md">
      <router-link :to="{name:'AgreementForm', params: { name: 'confidentiality'}}">Confidentiality Agreement</router-link>
    </div>
    <div class="col-md">
      <div v-if="confAgreement && confAgreement && confAgreement.agreeCheckBox"><i class="bi bi-check-circle text-success"/> Signed</div>
      <div v-else><i class="bi bi-exclamation-diamond-fill text-danger"></i> Unsigned</div>
    </div>
    <div class="col-md">
      <div v-if="confAgreement && confAgreement.agreementDate">{{confAgreement.agreementDate.toDate()}}</div>
      <div v-else>-</div>
    </div>
  </div>


  <h2 class="my-3">Paper Forms</h2>

  <div class="mt-3 row fw-bold border-bottom">
    <div class="col-md">Form Name</div>
    <div class="col-md">Status</div>
    <div class="col-md">Date Modified</div>
  </div>

  <div class="row py-3 border-bottom">
    <div class="col-md"><router-link :to='{"name": "ProfileAdminForms", "params": { "volunteerId": userId, "formName": "driver"}}'>Driver Acceptance Form</router-link></div>
    <div class="col-md">
      <template v-if="driverStatus">
        <i class="bi bi-check"></i> Completed
      </template>
      <template v-else>
        <i class="bi bi-exclamation-diamond-fill text-danger"></i> Unfiled
      </template>
    </div>
    <div class="col-md">
      <template v-if="driverDate">{{ driverDate }}</template>
      <template v-else>-</template>
    </div>
  </div>


  <div class="row py-3 border-bottom">
    <div class="col-md">
      Background Check - Child Abuse History Certification
    </div>
    <div class="col-md">
      <i class="bi bi-exclamation-diamond-fill text-danger"></i> Unfiled
    </div>
    <div class="col-md">
      -
    </div>
  </div>

  <div class="row py-3 border-bottom">
    <div class="col-md">
      Background Check - PA Criminal History Background Check
    </div>
    <div class="col-md">
      <i class="bi bi-exclamation-diamond-fill text-danger"></i> Unfiled
    </div>
    <div class="col-md">
      -
    </div>
  </div>

  <div class="row py-3 border-bottom">
    <div class="col-md">
      Background Check - Federal Bureau of Investigation (FBI) Criminal Background Check
    </div>
    <div class="col-md">
      <i class="bi bi-exclamation-diamond-fill text-danger"></i> Unfiled
    </div>
    <div class="col-md">
      -
    </div>
  </div>


</div>
</template>
