<script setup>
import { ref, defineProps, onBeforeMount } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { useRouter } from 'vue-router'

const props = defineProps({
  uid: String,
})

const user = useAuthUserStore()
const router = useRouter()

onBeforeMount(async () => {
if (props.uid === '' || props.uid === undefined) {
props.uid = user.data.uid
}

console.log('ProfileFormsPage uid=', props.uid)
})
</script>

<template>
<div class="container">

  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link class="nav-link" aria-current="page" :to="{name:'Profile', params: {uid: props.uid}}">Registration</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link active" :to="{name:'Profile-Forms', params: {uid: props.uid}}">Forms</router-link>
    </li>
  </ul>

  <div class="row fw-bold">
    <div class="col">Form Name</div>
    <div class="col">Status</div>
    <div class="col">Date Signed</div>
  </div>


  <div class="row">
    <div class="col">
      Confidentiality Agreement
    </div>
    <div class="col">
      <i class="bi bi-exclamation-diamond-fill text-danger"></i> Unsigned
    </div>
    <div class="col">

    </div>



  </div>


</div>
</template>
