<template>
  <div class="container">
    <h1>{{config.AdminProjectLongName}}</h1>
    <p>Welcome</p>
  </div>

</template>

<script>
import { config } from '@/config'


export default {
  name: 'Home',
  data() {
    return {
      config: config,
    }
  }
}
</script>

<style></style>
