<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { useRouter } from 'vue-router'
import ProfileTabs from '@/components/ProfileTabs.vue'

const props = defineProps({
  uid: String,
})

const user = useAuthUserStore()
const router = useRouter()
const userId = ref(props.uid)

onBeforeMount(async () => {
  if (props.uid === '' || props.uid === undefined) {
    userId.value = user.data.uid
  }
})
</script>

<template>
<div class="container">

  <ProfileTabs activeTab="Forms" :uid="userId"></ProfileTabs>

  <h2 class="my-3">Electronic Forms</h2>
  <div class="mt-3 row fw-bold">
    <div class="col">Form Name</div>
    <div class="col">Status</div>
    <div class="col">Date Signed</div>
  </div>


  <div class="row">
    <div class="col">
      <router-link :to="{name:'AgreementForm', params: { name: 'confidentiality'}}">Confidentiality Agreement</router-link>
    </div>
    <div class="col">
      <i class="bi bi-exclamation-diamond-fill text-danger"></i> Unsigned
    </div>
    <div class="col">

    </div>
  </div>


  <h2 class="my-3">Paper Forms</h2>

  <div class="mt-3 row fw-bold">
    <div class="col">Form Name</div>
    <div class="col">Status</div>
    <div class="col">Date Approved</div>
  </div>

  <div class="row">
    <div class="col">
      Background Check - Child Abuse History Certification
    </div>
    <div class="col">
      <i class="bi bi-exclamation-diamond-fill text-danger"></i> Unfiled
    </div>
    <div class="col">
      -
    </div>
  </div>

  <div class="row">
    <div class="col">
      Background Check - PA Criminal History Background Check
    </div>
    <div class="col">
      <i class="bi bi-exclamation-diamond-fill text-danger"></i> Unfiled
    </div>
    <div class="col">
      -
    </div>
  </div>

  <div class="row">
    <div class="col">
      Background Check - Federal Bureau of Investigation (FBI) Criminal Background Check
    </div>
    <div class="col">
      <i class="bi bi-exclamation-diamond-fill text-danger"></i> Unfiled
    </div>
    <div class="col">
      -
    </div>
  </div>


</div>
</template>
