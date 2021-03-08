<template>
 <v-card text>
   <v-card-title>Delivery Application</v-card-title>
      <v-card-subtitle v-if="deliveryAreaNames">Service area is {{deliveryAreaNames}}.</v-card-subtitle>
         <v-card-text>
           <template v-if="user && user.loggedIn">
             <v-alert v-if="showSuccess" type="success">{{successMessage}}</v-alert>
             <v-alert v-if="error" type="error">{{error}}</v-alert>
             <v-form v-model="valid" @submit.prevent="submit" name="x">
               <div><label>Your Email:</label> {{user.data.email}}</div>
               <v-text-field v-model="profile.firstname"
                  label="First Name"
                  autocomplete="First Name"
                  :rules="[rules.required]"
               ></v-text-field>
               <v-text-field v-model="profile.lastname" label="Last Name" autocomplete="Last Name"
                  :rules="[rules.required]"
               ></v-text-field>
                <v-text-field v-model="profile.phone" label="Phone 610-555-1212" autocomplete="phone"
                  :rules="[rules.required, rules.phone]"
                ></v-text-field>
                <v-text-field v-model="profile.address1" label="Street Address" autocomplete="street1"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field v-model="profile.address2" label="Apt/Suite" autocomplete="street2"></v-text-field>
                <v-text-field v-model="profile.city" label="City" autocomplete="city"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field v-model="profile.state" label="State" autocomplete="state"
                  :rules="[rules.required, rules.state]"
                ></v-text-field>
                <v-text-field v-model="profile.zip" label="Zip" autocomplete="zip"
                  :rules="[rules.required,rules.deliveryArea]"
                ></v-text-field>
                <v-text-field v-model="profile.num_60" label="Number in houshold age 60+"
                  :rules="[rules.required, rules.number]"
                ></v-text-field>
                <v-text-field v-model="profile.num_1859" label="Number in houshold age 18-59"
                  :rules="[rules.required, rules.number]"
                ></v-text-field>
                <v-text-field v-model="profile.num_1017" label="Number in houshold age 10-17"
                  :rules="[rules.required, rules.number]"
                ></v-text-field>
                <v-text-field v-model="profile.num_10" label="Number in houshold under age 10"
                  :rules="[rules.required, rules.number]"
                ></v-text-field>
                <v-textarea v-model="profile.notes" label="Dietary restrictions or notes."></v-textarea>

                <v-alert v-if="showSuccess" type="success">{{successMessage}}</v-alert>
                <v-alert v-if="error" type="error">{{error}}</v-alert>

                <v-btn type="submit" color="success" class="mr-4" :disabled="!valid">Submit</v-btn>
                </v-form>
              </template>
              <template v-else>
                <div>You must be logged in.</div>
              </template>
           </v-card-text>
   </v-card>
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
      valid: false,
      rules: {
        required: value => !!value || 'Required.',
        phone: (v) => /^([0-9]){3}[.-]{0,1}([0-9]){3}[.-]{0,1}[0-9]{4}$/.test(v) || "Phone must be 111-222-3333",
        state: (v) => v && v.toUpperCase() == 'PA' || "Only PA supported at this time",
        number: (v) => parseInt(v) < 10 && parseInt(v) >= 0 || "Number between 0-10",
        deliveryArea: (v) => parseInt(v) && config.DeliveryZipcodes && config.DeliveryZipcodes.includes(parseInt(v)) || "Address is outside of our service area.  You can search for another delivery provider at " + config.DeliveryOutsideAreaUrl,
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

<style></style>
