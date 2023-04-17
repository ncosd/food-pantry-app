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
  <template v-if="user.isAdmin && uid != user.data.uid"><div class="text-bg-warning">Viewing as admin</div></template>
  <p>User id: {{ uid }}</p>

</div>
</template>
