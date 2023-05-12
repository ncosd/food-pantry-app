<script setup>
import { getFirestore, collection, doc, getDoc, updateDoc, defineEmits } from 'firebase/firestore'

const emit = defineEmits(['refreshList'])

const props = defineProps({
  volunteers: Array,
})

const formatDate = (t) => {
  let d = t.toDate()
  let result = (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear()
  return result
}

const niy = ( () => {
  alert('Not implemented yet.')
})

const updateApprove = ( async (id) => {
  const db = getFirestore()
  const vProfileStateRef = await doc(db, 'volunteerprofilestate', id)
  await updateDoc(vProfileStateRef, {'status': 'active'})
  console.log('approved' + id)
  emit('refreshList')
})

const updateIgnore = ( async (id) => {
  const db = getFirestore()
  const vProfileStateRef = await doc(db, 'volunteerprofilestate', id)
  await updateDoc(vProfileStateRef, {'status': 'inactive'})
  console.log('inactive ' + id)
  emit('refreshList')
})

</script>

<template>
<div class="container">
  <div class="table-responsive-md">
  <table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
      <th scope="col">Updated</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="v in volunteers">
      <td>{{v.firstname}}</td>
      <td>{{v.lastname}}</td>
      <td><router-link :to="{ name: 'Profile', params:{ uid: v.userid}}">{{v.email}}</router-link></td>
      <td>{{v.status}}</td>
      <td>
        <button class="btn btn-sm btn-primary me-1" @click="updateApprove(v.userid)">Approve</button>
        <button class="btn btn-sm btn-secondary" @click="updateIgnore(v.userid)">Ignore</button>
      </td>
      <td>{{formatDate(v.updated)}}</td>
    </tr>
  </tbody>
  </table>
  </div>

</div>
</template>
