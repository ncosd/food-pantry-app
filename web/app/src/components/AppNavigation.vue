<script setup>
import { getAuth, signOut } from 'firebase/auth'
import { config } from '@/config'
import { useRouter } from 'vue-router'
import { useAuthUserStore } from '@/stores/authUser'

const user = useAuthUserStore()
const router = useRouter()
const auth = getAuth()

const signOutClick = () => {
  signOut(auth)
    .then( () => {
      router.push({ name: "Home" })
    }).catch(
      (err) => {
        console.log("Error logging out: " + err)
      }
    )
}
</script>

<template>
<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <router-link class="navbar-brand" :to="{name:'HomePage'}">
      <img v-if="config.appNavImg" :src="config.appNavImg" :alt="config.appNavName" :title="config.appNavName">
      <template v-if="!config.appNavImg">{{ config.appNavName }}</template>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mb-2 mb-lg-0">

      <!--
        <li class="nav-item">
          <a class="nav-link" :href="config.DeliveryFormURL">Delivery</a>
        </li>
        -->
        <li class="nav-item">
          <a class="nav-link" :href="config.VolunteerPortalURL">Volunteer Portal</a>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'AboutPage'}">About</router-link>
        </li>


      </ul>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

        <div class="d-flex" v-if="config.EnableGuestLogin === 'true'">
          <template v-if="user && user.isLoggedIn === true">
          <span class="nav-item py-2"><i class="bi bi-person-fill"></i> {{ user.data && user.data.displayName }}</span>
          <button class="btn btn-primary mx-2" @click.prevent="signOutClick">Sign Out</button>
          </template>
          <template v-else>
          <router-link class="btn btn-primary mx-2" :to="{name:'LoginPage'}" role="button">Login</router-link>
          </template>
        </div>

      </ul>
    </div>
  </div>
</nav>
</template>
