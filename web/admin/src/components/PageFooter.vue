<script setup>
import { config } from '@/config'
</script>

<template>
  <footer class="footer my-3">
    <ul class="list-group list-group-horizontal-md border border-0">
      <li class="list-group-item border border-0"><router-link to="/terms">Terms</router-link></li>
      <li class="list-group-item border border-0"><router-link to="/privacy-policy">Privacy Policy</router-link></li>
      <li class="list-group-item border border-0"><router-link to="/contact"><i class="bi bi-telephone-fill"></i> Contact</router-link></li>
      <li class="list-group-item border border-0"><router-link to="/user-guide"><i class="bi bi-question-circle-fill"></i> User Guide</router-link></li>
      <li class="list-group-item border border-0 mb-4"><a href="https://github.com/ncosd/food-pantry-app"><i class="bi bi-github"></i> Made with Food-Pantry-App</a></li>
      <li class="list-group-item border border-0"><router-link :to='{name:"ReleaseNotes"}'><i class="bi bi-journal-check"></i> {{config.version}}</router-link></li>
    </ul>
  </footer>
</template>
