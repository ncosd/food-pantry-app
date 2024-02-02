<script setup>
const guest_phone = import.meta.env.VITE_GUEST_PHONE
const office_phone = import.meta.env.VITE_OFFICE_PHONE
</script>

<template>
  <div class="container">
    <h1>Contact Us</h1>
    <h2>Guest Services</h2>
    <p>The Guest Services phone number is {{guest_phone}}</p>
    <h2>Office Phone</h2>
    <p>If you have general questions can be directed to the office phone at {{office_phone}}</p>
  </div>
</template>
