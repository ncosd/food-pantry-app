<script setup>
import { config } from '@/config';

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  profile: Object,
  showSuccess: String,
  successMessage: String,
  error: String
})

const emit = defineEmits(['clicked'])

const data = () => {
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
}

const submit = () => {
  // this.$emit('clicked', this.profile);
}

</script>

<template>
<div>
  <h4>Delivery Application</h4>
  <p>Service area is {{deliveryAreaNames}}.</p>
  <template v-if="user && user.loggedIn">
    <div v-html="deliveryMessage"></div>
    <template v-if="showSuccess" class="text-bg-success">{{successMessage}}</template>
    <template v-if="error" type="error">{{error}}</template>
    <form @submit.prevent="submit" name="x">
      <div><label>Your Email:</label> user.data.email</div>

      <div>
      <label>First Name</label>
      <input v-model="profile.firstname"
                  autocomplete="First Name"
                  :rules="[rules.required]"
               >
               </div>

      <div>
      <label>Last Name</label>
      <input v-model="profile.lastname" autocomplete="Last Name"
                  :rules="[rules.required]"
               >
      </div>
      <div>
      <label>Phone</label>
      <input v-model="profile.phone" autocomplete="phone"
                  :rules="[rules.required, rules.phone]"
                >
      </div>

      <div><label>Street Address</label>
      <input v-model="profile.address1" autocomplete="street1"
                  :rules="[rules.required]"
                >
      </div>
      <div>
      <label>Apt/Suite</label>
      <input v-model="profile.address2" autocomplete="street2">
      </div>

      <div>
        <label>City</label>
        <input v-model="profile.city" label="City" autocomplete="city"
                  :rules="[rules.required]"
                   >
      </div>

      <div>
      <label>State</label>
      <input v-model="profile.state" label="State" autocomplete="state"
                  :rules="[rules.required, rules.state]"
                >
      </div>

      <div>
      <label>Zip</label>
      <input v-model="profile.zip" label="Zip" autocomplete="zip"
                  :rules="[rules.required,rules.deliveryArea]"
                >
      </div>

      <div>
      <label>Number in household age 60+</label>
      <input v-model="profile.num_60" label="Number in household age 60+"
                  :rules="[rules.required, rules.number]"
                >
                </div>

                <div>
                <label>Number in household age 18-59</label>
      <input v-model="profile.num_1859" label="Number in household age 18-59"
                  :rules="[rules.required, rules.number]"
                >
                </div>

                <div>
                <label>Number in household age 10-17</label>
      <input v-model="profile.num_1017" label="Number in household age 10-17"
                  :rules="[rules.required, rules.number]"
                ></div>


      <div>
      <label>Number in household under age 10</label>
      <input v-model="profile.num_10" label="Number in household under age 10"
                  :rules="[rules.required, rules.number]"
                >
      </div>


      <div>
      <label>Dietary restrictions or notes.</label>
      <textarea v-model="profile.notes" label="Dietary restrictions or notes."></textarea>
      </div>

      <template v-if="showSuccess"><div class="text-bg-success">{{successMessage}}</div></template>
      <template v-if="error"><div class="text-bg-danger">{{error}}</div></template>

      <button type="submit" color="success" class="btn btn-primary" :disabled="!valid">Submit</button>
    </form>
   </template>
   <template v-else>
     <div>
       <p><a class="btn btn-primary" href="/login">Sign In</a> to create an application.</p>
       <p><a class="btn btn-primary" href="/register">Join</a> if you do not have an account.</p>
     </div>
   </template>
</div>
</template>


<style></style>
