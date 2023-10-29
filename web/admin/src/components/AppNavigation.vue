<script setup>
import ThemeChooser from '@/components/ThemeChooser.vue'
import { getAuth, signOut } from 'firebase/auth'
import { config } from '@/config'
import { useAuthUserStore } from '@/stores/authUser'
import { useRouter } from 'vue-router'

const user = useAuthUserStore()
const router = useRouter()

const signOutClick = () => {
  const auth = getAuth()
  signOut(auth).then( ()=> {
    router.replace({name: 'Login'})
  })
}
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="/"><img v-if="config.adminAppNavImg" :src="config.adminAppNavImg" :alt="config.adminAppNavName" :title="config.adminAppNavName"><template v-if="!config.adminAppNavImg">{{config.adminAppNavName}}</template></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <template v-if="user && user.isAdmin === true">
            <li class="nav-item">
              <router-link to="/volunteers" class="nav-link">Volunteers</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/schedule">Schedule</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name:'LocationsList'}">Locations</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name:'TaskTypesList'}">TaskTypes</router-link>
            </li>
          </template>
          <template v-if="user && (user.isAdmin || user.isVolunteer)">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Calendar</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/profile">Profile</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/unavailable">Unavailability</a>
            </li>
          </template>
        </ul>

        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li><ThemeChooser></ThemeChooser></li>
          <template v-if="user && user.isLoggedIn === true">
            <li class="navbar-text pe-2">
              <i class="bi bi-person-fill"></i> {{ user.data && user.data.displayName }}
            </li>
            <li class="nav-item">
              <a class="btn btn-primary" @click.prevent="signOutClick">Sign Out</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <a class="btn btn-primary mx-2" href="/login" role="button">Login</a>
            </li>
          </template>
        </ul>
     </div>
   </div>
  </nav>
</template>
