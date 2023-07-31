<script setup>
import { ref, defineProps, onBeforeMount } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { useRouter } from 'vue-router'
import ProfileTabs from '@/components/ProfileTabs.vue'

const props = defineProps({
  uid: String,
})

const user = useAuthUserStore()
const router = useRouter()

onBeforeMount(async () => {
if (props.uid === '' || props.uid === undefined) {
props.uid = user.data.uid
}

})
</script>

<template>
<div class="container">

  <ProfileTabs activeTab="Certifications" :uid="props.uid"></ProfileTabs>

  <div class="mt-3 row fw-bold">
    <div class="col">Certification Name</div>
    <div class="col">Status</div>
    <div class="col">Date Acquired</div>
    <div class="col">Expiration Date</div>
  </div>


  <div class="row">
    <div class="col">
    ServSafe Certification
    </div>
    <div class="col">
      <i class="bi bi-exclamation-diamond-fill text-danger"></i>
    </div>
    <div class="col">
    N/A
    </div>
    <div class="col">
    N/A
    </div>
  </div>


</div>
</template>
