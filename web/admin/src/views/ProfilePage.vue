<script setup>
import { defineProps } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'

const props = defineProps({
  uid: String,
})
const user = useAuthUserStore()

if (props.uid === '') {
 props.uid = user.data.uid
}

</script>

<template>
<div class="container">
   <p>uid {{ uid }}</p>
</div>
</template>
