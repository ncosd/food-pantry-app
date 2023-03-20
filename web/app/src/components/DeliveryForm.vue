<template>
<div class="m-3">
  <h4>Delivery Application</h4>
  <p>Service area is {{deliveryAreaNames}}.</p>
  <template v-if="user && user.isLoggedIn">
    <div v-html="deliveryMessage"></div>
    <template v-if="showSuccess" class="text-bg-success">{{successMessage}}</template>
    <template v-if="error"><div class="text-bg-danger">{{error}}</div></template>
    <div class="text-center">
    <form @submit.prevent="submit" name="x">
      <div class="mb-3">
        <div class="d-inline-flex text-right">
          <label class="form-label d-flex justify-content-end align-items-end pe-3">Your Email</label>
          {{ user.data.email}}
        </div>
      </div>

      <div class="mb-3">
      <div class="d-inline-flex text-right">
        <label class="form-label d-flex justify-content-end align-items-end pe-3">First Name</label>
        <input v-model="profile.firstname" autocomplete="First Name" required>
      </div>
      </div>

      <div class="mb-3">
        <div class="d-inline-flex text-right">
          <label class="form-label d-flex justify-content-end align-items-end pe-3">Last Name</label>
          <input v-model="profile.lastname" autocomplete="Last Name" required>
        </div>
      </div>


      <div class="mb-3">
        <div class="d-inline-flex text-right">
          <label class="form-label d-flex justify-content-end align-items-end pe-3">Phone</label>
          <input v-model="profile.phone" autocomplete="phone" required>
        </div>
      </div>

      <div class="mb-3">
        <div class="d-inline-flex text-right">
          <label class="form-label d-flex justify-content-end align-items-end pe-3">Street Address</label>
          <input v-model="profile.address1" autocomplete="street1" required>
        </div>
      </div>


      <div class="mb-3">
        <div class="d-inline-flex text-right">
          <label class="form-label d-flex justify-content-end align-items-end pe-3">Apt/Suite</label>
          <input v-model="profile.address2" autocomplete="street2">
        </div>
      </div>

      <div class="mb-3">
        <div class="d-inline-flex text-right">
          <label class="form-label d-flex justify-content-end align-items-end pe-3">City</label>
          <input v-model="profile.city" label="City" autocomplete="city" required>
        </div>
      </div>

      <div class="mb-3">
        <div class="d-inline-flex text-right">
          <label class="form-label d-flex justify-content-end align-items-end pe-3">State</label>
          <input v-model="profile.state" label="State" autocomplete="state" required>
        </div>
      </div>


      <div class="mb-3">
        <div class="d-inline-flex text-right">
      <label class="form-label d-flex justify-content-end align-items-end pe-3">Zip</label>
      <input v-model="profile.zip" label="Zip" autocomplete="zip"
                  :rules="[rules.required,rules.deliveryArea]"
                >
      </div>
      </div>

      <div class="mb-3">
        <div class="d-inline-flex text-right">
      <label class="form-label d-flex justify-content-end align-items-end pe-3">Number in household age 60+</label>
      <input v-model="profile.num_60" label="Number in household age 60+"
                  :rules="[rules.required, rules.number]"
                >
        </div>
      </div>

      <div class="mb-3">
        <div class="d-inline-flex text-right">
                <label class="form-label d-flex justify-content-end align-items-end pe-3">Number in household age 18-59</label>
      <input v-model="profile.num_1859" label="Number in household age 18-59"
                  :rules="[rules.required, rules.number]"
                >
         </div>
       </div>


      <div class="mb-3">
        <div class="d-inline-flex text-right">
           <label class="form-label d-flex justify-content-end align-items-end pe-3">Number in household age 10-17</label>
           <input v-model="profile.num_1017" label="Number in household age 10-17" required>
        </div>
      </div>


      <div class="mb-3">
        <div class="d-inline-flex text-right">
      <label class="form-label d-flex justify-content-end align-items-end pe-3">Number in household under age 10</label>
      <input v-model="profile.num_10" label="Number in household under age 10"
                  :rules="[rules.required, rules.number]"
                >
      </div>
      </div>


      <div class="mb-3">
        <div class="d-inline-flex text-right">
      <label class="form-label d-flex justify-content-end align-items-end pe-3">Dietary restrictions or notes.</label>
      <textarea v-model="profile.notes" label="Dietary restrictions or notes."></textarea>
      </div>
      </div>

      <template v-if="showSuccess"><div class="text-bg-success">{{successMessage}}</div></template>
      <template v-if="error"><div class="text-bg-danger">{{error}}</div></template>

      <button type="submit" color="success" class="btn btn-primary" :disabled="!valid">Submit</button>
    </form>
    </div>
   </template>
   <template v-else>
     <div>
       <p><a class="btn btn-primary" href="/login">Sign In</a> to create an application.</p>
       <p><a class="btn btn-primary" href="/register">Join</a> if you do not have an account.</p>
     </div>
   </template>
</div>
</template>

<script>
import { config } from '@/config';

export default {
  name: 'DeliveryForm',
  props: [
     "user",
     "profile",
     "showSuccess",
     "successMessage",
     "error"
  ],
  data() {
    return {
      deliveryAreaNames: config.DeliveryAreaNames || "",
      deliveryMessage: config.DeliveryMessage || "",
      valid: false,
      rules: {
        required: value => !!value || 'Required.',
        phone: (v) => /^([0-9]){3}[.-]{0,1}([0-9]){3}[.-]{0,1}[0-9]{4}$/.test(v) || "Phone must be 111-222-3333",
        state: (v) => v && v.toUpperCase() == 'PA' || "Only PA supported at this time",
        number: (v) => parseInt(v) < 10 && parseInt(v) >= 0 || "Number between 0-10",
        deliveryArea: (v) => parseInt(v) && config.DeliveryZipcodes.includes(parseInt(v)) || "Address is outside of our service area.  You can search for another delivery provider at " + config.DeliveryOutsideAreaUrl,
      }
    }
  },
  methods: {
    submit() {
       this.$emit('clicked', this.profile);
    }
  }
}
</script>

<style scoped>
form label {
min-width:100px !important;
max-width:100px;
}
</style>
