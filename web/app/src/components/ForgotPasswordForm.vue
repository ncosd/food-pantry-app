<script setup>
import { ref } from 'vue'

const props = defineProps({
  showSuccess: Boolean,
  successMessage: String,
  showError: Boolean,
  errorMessage: String,
})

const emit = defineEmits(['clicked'])

const valid = ref(false)
const email = ref("")

const submit = () => {
  emit('clicked', email.value)
}
</script>

<template>
<div class="row justify-content-center">
 <div class="col-md-8">
  <div class="card">
    <div class="card-header">Forgot Password</div>
    <h6 class="card-subtitle m-3 text-muted">Enter your email address and a link to reset your password will be emailed to you.</h6>
    <div class="card-text">
      <template v-if="showSuccess"><div class="text-bg-success p-3">{{successMessage}}</div></template>
      <template v-if="showError"><div class="text-bg-danger p-3">{{errorMessage}}</div></template>
      <div class="card-body">
        <form @submit.prevent="submit">
          <div class="row my-3">
            <label class="form-label">Email</label>
            <div class="col-sm-10">
              <input type="email" class="form-control" v-model="email" autocomplete="email" placeholder="name@example.com">
            </div>
          </div>
          <div class="row my-3">
            <div class="col-sm-offset-2 col-sm-10">
              <button class="btn btn-primary" type="submit" >Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
 </div>
</div>
</template>
