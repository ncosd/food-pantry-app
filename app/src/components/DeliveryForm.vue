<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
           <div class="card-header">Delivery Application</div>
           <div class="card-body">
              <template v-if="user && user.loggedIn">
                <v-alert v-if="showSuccess" type="success">{{successMessage}}</v-alert>
                <v-alert v-if="error" type="error">{{error}}</v-alert>
                <v-form v-model="valid" @submit.prevent="submit">
                <div><label>Your Email:</label> {{user.data.email}}</div>
                <v-text-field v-model="profile.firstname"
                label="First Name"
                autocomplete="First Name"
                :rules="[rules.required]"
                ></v-text-field>
                <v-text-field v-model="profile.lastname" label="Last Name" autocomplete="Last Name"></v-text-field>
                <v-text-field v-model="profile.phone" label="Phone 610-555-1212" autocomplete="phone"></v-text-field>
                <v-text-field v-model="profile.address1" label="Street Address" autocomplete="street1"></v-text-field>
                <v-text-field v-model="profile.address2" label="Apt/Suite" autocomplete="street2"></v-text-field>
                <v-text-field v-model="profile.city" label="City" autocomplete="city"></v-text-field>
                <v-text-field v-model="profile.state" label="State" autocomplete="state" value="PA"></v-text-field>
                <v-text-field v-model="profile.zip" label="Zip" autocomplete="zip"></v-text-field>
                <v-text-field v-model="profile.num_60" label="Number in houshold age 60+"></v-text-field>
                <v-text-field v-model="profile.num_1859" label="Number in houshold age 18-59"></v-text-field>
                <v-text-field v-model="profile.num_1017" label="Number in houshold age 10-17"></v-text-field>
                <v-text-field v-model="profile.num_10" label="Number in houshold under age 10"></v-text-field>
                <v-textarea v-model="profile.notes" label="Dietary restrictions or notes."></v-textarea>
                <v-btn type="submit" color="success" class="mr-4" :disabled="!valid">Submit</v-btn>
                </v-form>
              </template>
              <template v-else>
                <div>You must be logged in.</div>
              </template>
           </div>
        </div>
      </div>
   </div>
 </div>
</template>

<script>
export default {
  name: 'DeliveryForm',
  props: [
     "user",
     "profile"
  ],
  data() {
    return {
      error: "",
      showSuccess: false,
      successMessage: "",
      showPass: false,
      valid: false,
      rules: {
        required: value => !!value || 'Required.'
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
