<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">{{config.adminAppNavName}}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <template v-if="user && user.isAdmin === true">
            <li class="nav-item">
              <a class="nav-link" href="/delivery-applications">Delivery Applications</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/delivery-schedule">Delivery Schedule</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/volunteer-applicants">Volunteer Applicants</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/volunteer-schedule">Volunteer Schedule</a>
            </li>
          </template>
          <template v-if="user && (user.isAdmin || user.isVolunteer)">
            <li class="nav-item">
              <a class="nav-link" href="/profile">Profile</a>
            </li>
          </template>
        </ul>

        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <div class="">
            <div class="d-flex">
              <template v-if="user && user.isLoggedIn === true">
                <span class="nav-item py-2"><i class="bi bi-person-fill"></i> {{ user.data && user.data.displayName }}</span>
                <a class="btn btn-primary mx-2" @click.prevent="signOutClick">Sign Out</a>
              </template>
              <template v-else>
                <a class="btn btn-primary mx-2" href="/login" role="button">Login</a>
              </template>
           </div>
         </div>
       </ul>
     </div>
   </div>
  </nav>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth'
import { config } from '@/config'
import { useAuthUserStore } from '@/stores/authUser'


export default {
  name: 'AppNavigation',
  data() {
    return {
      user: null,
      config: config
    }
  },
  mounted() {
    this.user = useAuthUserStore()
  },
  methods: {
   signOutClick() {
     const auth = getAuth()
     signOut(auth)
     .then( () => {
       this.$router.replace({ name: "Login" })
     }).catch((err) => {
       console.log("Error logging out: " + err)
   })
  }
 }
}
</script>

<style></style>
