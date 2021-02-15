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
                <v-text-field v-model="firstname" label="First Name" autocomplete="First Name"></v-text-field>
                <v-text-field v-model="lastname" label="Last Name" autocomplete="Last Name"></v-text-field>
                <v-text-field v-model="phone" label="Phone 610-555-1212" autocomplete="phone"></v-text-field>
                <v-text-field v-model="address1" label="Street Address" autocomplete="street1"></v-text-field>
                <v-text-field v-model="address2" label="Apt/Suite" autocomplete="street2"></v-text-field>
                <v-text-field v-model="city" label="City" autocomplete="city"></v-text-field>
                <v-text-field v-model="state" label="State" autocomplete="state" value="PA"></v-text-field>
                <v-text-field v-model="zip" label="Zip" autocomplete="zip"></v-text-field>
                <v-text-field v-model="num_60" label="Number in houshold age 60+"></v-text-field>
                <v-text-field v-model="num_1859" label="Number in houshold age 18-59"></v-text-field>
                <v-text-field v-model="num_1017" label="Number in houshold age 10-17"></v-text-field>
                <v-text-field v-model="num_10" label="Number in houshold under age 10"></v-text-field>
                <v-textarea v-model="notes" label="Dietary restrictions or notes."></v-textarea>
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
//import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'DeliveryForm',
  props: [
     "user"
  ],
  data() {
    return {
      error: "",
      showSuccess: false,
      successMessage: "",
      showPass: false,
      valid: false,
      password: '',
      email: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailRule: v => !v || /.+@.+/.test(v) || 'Invalid Email Address'
      },
    }
  }
}
</script>

<style>

</style>
