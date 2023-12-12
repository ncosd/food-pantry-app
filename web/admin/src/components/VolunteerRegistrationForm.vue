<template>
  <form @submit.prevent="submit">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Volunteer Sign Up</div>
          <div class="card-body">
            <template v-if="showSuccess">
              <div class="text-bg-success">{{ successMessage }}</div>
            </template>
            <template v-if="error">
              <div class="text-bg-danger">{{ error }}</div>
            </template>

            <div class="row my-3">
              <div v-if="emailError" class="text-bg-danger">Email is required.  Please check email is correct.</div>
              <label class="form-label">Email</label>
              <div class="col-sm-10">
                <input type="text" v-model="email" autocomplete="username" class="form-control" placeholder="name@example.com" required>
              </div>
            </div>

            <div class="row my-3">
              <div v-if="passwordError" class="text-bg-danger">Password is required, must be at least 8 characters.</div>
              <label class="form-label">Password</label>
              <div class="col-sm-10">
                <input type="password" v-model="password" autocomplete="new-password" class="form-control" required>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <div v-if="firstnameError" class="text-bg-danger">First name is required.</div>
                  <label class="form-label">First Name</label>
                  <input class="form-control" v-model="profile.firstname" autocomplete="First Name" required>
                </div>
              </div>

              <div class="col-md-6">
                <div class="mb-3">
                  <div v-if="lastnameError" class="text-bg-danger">Last Name is required.</div>
                  <label class="form-label">Last Name</label>
                  <input class="form-control" v-model="profile.lastname" autocomplete="Last Name" required>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <div v-if="phoneError" class="text-bg-danger">Phone required to volunteer format: 111-222-4444.</div>
                <label class="form-label">Phone</label>
                <input class="form-control" v-model="profile.phone" autocomplete="phone" placeholder="111-222-4444" required>
              </div>
            </div>

            <div class="row mb-3 border-top border-bottom">
              <div class="mt-3">Best days for you:</div>
              <div class="form-check ms-3"><input id="avail_monday" class="form-check-input" type="checkbox" v-model="profile.avail_monday"><label class="form-check-label" for="avail_monday">Monday</label></div>
              <div class="form-check ms-3"><input id="avail_tuesday" class="form-check-input" type="checkbox" v-model="profile.avail_tuesday"><label class="form-check-label" for="avail_tuesday">Tuesday</label></div>
              <div class="form-check ms-3"><input id="avail_thursday" class="form-check-input" type="checkbox" v-model="profile.avail_thursday"><label class="form-check-label" for="avail_thursday">Thursday</label></div>
              <div class="form-check ms-3 mb-3"><input id="avail_saturday" class="form-check-input" type="checkbox" v-model="profile.avail_saturday"><label class="form-check-label" for="avail_saturday">Saturday</label></div>
            </div>

            <div class="row">
              <div class="form-check ms-3 mb-3">
                <div v-if="acceptLiftError" class="text-bg-danger">This is required to volunteer.</div>
                <input id="acceptliftclean" class="form-check-input" type="checkbox" v-model="profile.acceptLiftClean">
                <label for="acceptliftclean" class="form-label">Are you able to safely lift 35 lbs on a regular basis? All of our volunteer
                  positions require physical work including lifting and cleaning.</label>

              </div>
            </div>

            <div class="row">
              <div class="form-check ms-3 mb-3">
                <div v-if="acceptParentError" class="text-bg-danger">This is required to volunteer.</div>
                <input id="acceptParent" class="form-check-input" type="checkbox" v-model="profile.acceptParent">
                <label for="acceptParent" class="form-label">I understand that volunteers under 16 years of age need to be accompanied by a
                  parent.</label>

              </div>
            </div>

            <div class="row">
              <div class="form-check ms-3 mb-3">
                <div v-if="acceptFrontLineError" class="text-bg-danger">This is required to volunteer.</div>
                <input id="acceptfrontline" class="form-check-input" type="checkbox" v-model="profile.acceptFrontLine">
                <label for="acceptfrontline" class="form-label">{{config.AdminFrontline}}</label>
              </div>
            </div>

            <div class="row">
              <div class="form-check mb-3 ms-3">
              <div v-if="acceptTermsError" class="text-bg-danger">You must accept the Terms and Privacy Policy to register and use the site.</div>
                <input id="acceptTerms" class="form-check-input" type="checkbox" v-model="profile.acceptTerms">
                <label for="acceptTerms" class="form-label">I have read and accept the Terms of use and Privacy Policy.</label>
              </div>
            </div>

            <div class="row mb-3 border-top">
              <label class="form-label mt-3" for="extranote">Is there anything else we should know related to your interest in volunteering at
                the food bank?</label>
              <textarea id="extranote" class="form-control" v-model="profile.extraNote"></textarea>
            </div>

            <div class="row ms-2 mt-3 mb-3" v-if="spin">
              <LoadingSpinner :visible="spin"/>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
            <a href="/forgot-password" class="m-3">Forgot Password?</a>
            <a href="/login" class="m-3">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { config } from '@/config.js'
import LoadingSpinner from '@/components/LoadingSpinner.vue'


export default {
  name: 'VolunteerRegistrationForm',
  props: [
  ],
  data() {
    return {
      email: '',
      password: '',
      profile: {
        firstname: '',
        lastname: '',
        phone: '',
        acceptLiftClean: false,
        acceptParent: false,
        acceptFrontLine: false,
        acceptTerms: false,
        preferredtimes: '',
        extraNote: '',
      },
      error: '',
      showSuccess: false,
      successMessage: '',
      valid: false,
      acceptTermsError: false,
      acceptLiftError: false,
      acceptParentError: false,
      acceptFrontLineError: false,
      phoneError: false,
      emailError: false,
      passwordError: false,
      firstnameError: false,
      lastnameError: false,
config: config,
spin: false,
    }
},
components: {
LoadingSpinner,
},
  methods: {
    resetErrors() {
      this.acceptTermsError = false
      this.acceptLiftError = false
      this.acceptParentError = false
      this.acceptFrontLineError = false
      this.phoneError = false
      this.emailError = false
      this.passwordError = false
      this.firstnameError = false
this.lastnameError = false
this.spin = false
    },
    validate() {
      this.error = ""
      this.resetErrors()

      if (!this.email) {
        this.emailError = true
        this.error = "Email is required"
      } else {
        if (!(/.+@.+\..+/.test(this.email))) {
          this.emailError = true
          this.error += " Invalid email address."
        }
      }

      if (!this.password) {
        this.passwordError = true
        this.error += " Password is required."
      }
      if (this.password && (this.password.length < 8)) {
        this.passwordError = true
        this.error += " Password must be at least 8 characters."
      }

      if (!this.profile.phone) {
        this.phoneError = true
        this.error += " Phone is required"
      } else {
        if (!(/^([0-9]){3}[.-]{0,1}([0-9]){3}[.-]{0,1}[0-9]{4}$/.test(this.profile.phone))) {
          this.phoneError = true
          this.error += " Phone must be 111-222-3333."
        }
      }

      if (!this.profile.firstname) {
        this.firstnameError = true
      }
      if (!this.profile.lastname) {
        this.lastnameError = true
      }

      if (!this.profile.acceptTerms) {
        this.acceptTermsError = true
        this.error += "You must accept Terms and Privacy Policy."
      }

      if (!this.profile.acceptLiftClean) {
        this.acceptLiftError = true
        this.error += " Acknowledge physical requirements."
      }

      if (!this.profile.acceptParent) {
        this.acceptParentError = true
        this.error += " Acknowledge under 16 must be accompanied by parent."
      }

      if (!this.profile.acceptFrontLine) {
        this.acceptFrontLineError = true
        this.error += " Accept Front Line worker statement."
      }

      if (this.error) {
        return false
      }
      return true
    },
    submit() {
      if (!this.validate()) {
        return
      }
      const data = { 'email': this.email, 'password': this.password, 'profile': this.profile }

      this.spin = true
      this.$emit('submitted', data)
    },
  }
}
</script>
