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
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Your Email</label>
                <div class="">{{ user.data.email}}</div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Phone</label>
                <input class="form-control" v-model="profile.phone" autocomplete="phone" required>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">First Name</label>
                <input class="form-control" v-model="profile.firstname" autocomplete="First Name" required>
              </div>
            </div>

            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Last Name</label>
                <input class="form-control" v-model="profile.lastname" autocomplete="Last Name" required>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Street Address</label>
                <input class="form-control" v-model="profile.address1" autocomplete="street1" required>
              </div>
            </div>

            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Apt/Suite</label>
                <input class="form-control" v-model="profile.address2" autocomplete="street2">
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label class="form-label">City</label>
                <input class="form-control" v-model="profile.city" label="City" autocomplete="city" required>
              </div>
            </div>

            <div class="col-md-4">
              <div class="mb-3">
                <label class="form-label">State</label>
                <input class="form-control" v-model="profile.state" label="State" autocomplete="state" required>
              </div>
            </div>

            <div class="col-md-4">
              <div class="mb-3">
                <label class="form-label">Zip</label>
                <input class="form-control" v-model="profile.zip" label="Zip" autocomplete="zip" required
                       :rules="[rules.required,rules.deliveryArea]"
                       >
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3">
              <div class="mb-3">
                <label class="form-label">Number in household age 60+</label>
                <select class="form-select" v-model="profile.num_60" required>
                  <option value="0" selected>0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
              </div>
            </div>

            <div class="col-md-3">
              <div class="mb-3">
                <label class="form-label">Number in household age 18-59</label>
                <select class="form-select" v-model="profile.num_1859" required>
                  <option value="0" selected>0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
              </div>
            </div>

            <div class="col-md-3">
              <div class="mb-3">
                <label class="form-label">Number in household age 10-17</label>
                <select class="form-select" v-model="profile.num_1017" required>
                  <option value="0" selected>0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
              </div>
            </div>

            <div class="col-md-3">
              <div class="mb-3">
                <label class="form-label">Number in household under age 10</label>
                <select class="form-select" v-model="profile.num_10" required>
                  <option value="0" selected>0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
              </div>
            </div>
          </div>

          <div class="border border-1 mb-3">
            <div class="row">
              <div class="col">
                <h5>Pickup or Delivery</h5>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input class="form-check-input" type="radio" name="togo-pickup" value="pickup" id="togo-pickup">
                <label class="ml-3 form-check-label" for="togo-pickup">Pick up at NCFB</label>
              </div>
              <div class="col">
                <input class="form-check-input" type="radio" name="togo-pickup" value="delivery" id="togo-delivery">
                <label class="ml-3 form-check-label" for="togo-delivery">Delivered to your door</label>
              </div>
            </div>
          </div>

          <div class="border border-1 mb-3">
            <h5>Categories</h5>
            <p>Choose the item categories you will receive.</p>
          <div class="row">
            <div class="col-md-2">
              <div class="mb-3">
                <label class="form-label">Produce</label><br>
                <input class="form-check-input" type="checkbox" v-model="profile.cat_produce">
              </div>
            </div>

            <div class="col-md-2">
              <div class="mb-3">
                <label class="form-label">Shelf Stable</label><br>
                <input class="form-check-input" type="checkbox" v-model="profile.cat_stable">
              </div>
            </div>

            <div class="col-md-1">
              <div class="mb-3">
                <label class="form-label">Cold</label><br>
                <input class="form-check-input" type="checkbox" v-model="profile.cat_cold">
              </div>
            </div>

            <div class="col-md-2">
              <div class="mb-3">
                <label class="form-label">Feminine Hygiene</label><br>
                <input class="form-check-input" type="checkbox" v-model="profile.cat_fem">
              </div>
            </div>

            <div class="col-md-1">
              <div class="mb-3">
                <label class="form-label">Kids</label><br>
                <input class="form-check-input" type="checkbox" v-model="profile.cat_kids">
              </div>
            </div>

            <div class="col-md-2">
              <div class="mb-3">
                <label class="form-label">Personal Care</label><br>
                <input class="form-check-input" type="checkbox" v-model="profile.cat_personal">
              </div>
            </div>

            <div class="col-md-1">
              <div class="mb-3">
                <label class="form-label">Diapers</label><br>
                <input class="form-check-input" type="checkbox" v-model="profile.cat_diapers">
              </div>
            </div>
          </div>
          </div>

          <div class="border border-1 mb-3">
          <div class="row">
            <div class="col">
              <h5>Food Restrictions</h5>
              <p>Only choose one of these checkboxes if you wish to have one of these restrictions.  Type in the notes field
                if you have other restrictions not listed here.</p>
            </div>
          </div>

          <div class="row">
            <div class="col-md-2">
              <div class="mb-3">
                <label class="form-label">Vegetarian (no beef, chicken, pork, fish)</label><br>
                <input class="form-check-input" type="checkbox" v-model="profile.isvegetarian">
              </div>
            </div>

            <div class="col-md-2">
              <div class="mb-3">
                <label class="form-label">Pescatarian (only fish, no other meat)</label><br>
                <input class="form-check-input" type="checkbox" v-model="profile.ispescatarian">
              </div>
            </div>

            <div class="col-md-2">
              <div class="mb-3">
                <label class="form-label">No Beef</label><br>
                <input class="form-check-input" type="checkbox" v-model="isnobeef">
              </div>
            </div>

            <div class="col-md-2">
              <div class="mb-3">
                <label class="form-label">No Pork</label><br>
                <input class="form-check-input" type="checkbox" v-model="isnopork">
              </div>
            </div>

            <div class="col-md-2">
              <div class="mb-3">
                <label class="form-label">Other - type in notes</label><br>
                <input class="form-check-input" type="checkbox" v-model="restrictionnotes">
              </div>
            </div>

          </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Allergies and other notes.</label>
            <textarea class="form-control" v-model="profile.notes" ></textarea>
          </div>

          <template v-if="showSuccess"><div class="text-bg-success">{{successMessage}}</div></template>
          <template v-if="error"><div class="text-bg-danger">{{error}}</div></template>

          <button type="submit" color="success" class="btn btn-primary">Submit</button>
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
    validate() {
      console.log('Running validate')
    },

    submit() {
       this.validate()
       console.log('after validate')


       this.$emit('clicked', this.profile);
    }
  }
}
</script>

<style scoped>
</style>
