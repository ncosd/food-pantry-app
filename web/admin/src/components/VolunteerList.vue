<script setup>
import { getFirestore, collection, doc, getDoc, updateDoc, defineEmits } from 'firebase/firestore'
import { getFunctions, httpsCallable } from 'firebase/functions'

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

const functions = getFunctions()
const setVolunteer = httpsCallable(functions, 'setVolunteer')

const updateApprove = ( async (id) => {
  try {
    const resp = await setVolunteer({"id": id})
    console.log(JSON.stringify(resp))

    const db = getFirestore()
    const vProfileStateRef = await doc(db, 'volunteerprofilestate', id)
    await updateDoc(vProfileStateRef, {'status': 'active'})
    console.log('approved' + id)
    emit('refreshList')
    } catch (err) {
      console.log('error ' + err)
    }
})

const inactivateVolunteer = httpsCallable(functions, 'inactivateVolunteer')

const updateInactive = ( async (id) => {
  try {
    const resp = await inactivateVolunteer({"id": id})
    console.log('inactivateVolunteer=' + JSON.stringify(resp))

    const db = getFirestore()
    const vProfileStateRef = await doc(db, 'volunteerprofilestate', id)
    await updateDoc(vProfileStateRef, {'status': 'inactive'})
    console.log('inactive ' + id)
    emit('refreshList')
  } catch (err) {
    console.log('error ' + err)
  }
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
        <button class="btn btn-sm btn-secondary" @click="updateInactive(v.userid)">Deactivate</button>
      </td>
      <td>{{formatDate(v.updated)}}</td>
    </tr>
  </tbody>
  </table>
  </div>

</div>
</template>
